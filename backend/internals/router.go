package internals

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
	"github.com/rs/cors"
)

type Router struct {
	connectionManager *ConnectionManager
	store             *UserStore
}

func NewRouter(connectionManager *ConnectionManager) http.Handler {
	rm := &Router{
		connectionManager: connectionManager,
		store:             connectionManager.Store,
	}

	r := mux.NewRouter()

	// Define routes for WebSocket
	r.HandleFunc("/ws", rm.handleWebSocket)

	// Define HTTP routes
	r.HandleFunc("/health", rm.handleHealthCheck).Methods("GET")

	r.HandleFunc("/login", rm.handleLogin).Methods("POST")

	// Create a new CORS handler
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"}, // Allow all origins, adjust this to your allowed origins
		AllowedMethods:   []string{"GET", "POST", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: false, // Change to true if needed
	})

	return c.Handler(r)
}

func (rm *Router) handleWebSocket(w http.ResponseWriter, r *http.Request) {
	// check for auth token in header
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		http.Error(w, "Authorization header required", http.StatusUnauthorized)
		return
	}

	tokenParts := strings.Split(authHeader, "Bearer ")
	if len(tokenParts) != 2 {
		http.Error(w, "Invalid authorization header format", http.StatusUnauthorized)
		return
	}

	token := tokenParts[1]
	log.Println("[+] Token : ", token)

	// validte token
	user, ok := rm.store.loggedInUsers[token]
	if !ok {
		http.Error(w, "Invalid token", http.StatusUnauthorized)
		return
	}

	log.Println("[+] User : ", user)

	upgrader := websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true // Allow all origins
		},
	}
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("\n\n [-] Error upgrading ws connection : ", err)
		http.Error(w, "Could not upgrade connection", http.StatusBadRequest)
		return
	}

	_ = rm.connectionManager.AddConnection(conn, token)
}

func (rm *Router) handleHealthCheck(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("healthy\n"))
}

func (rm *Router) handleLogin(w http.ResponseWriter, r *http.Request) {
	var payload LoginPayload
	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	user, err := rm.store.VerifyCreds(payload.Username, payload.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"token": user.ID,
	})
}
