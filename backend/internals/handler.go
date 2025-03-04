package internals

import (
	"encoding/json"
	"net/http"
)

type Handler struct {
	store *UserStore
}

func NewHandler() *Handler {
	return &Handler{NewUserStore()}
}

func (h *Handler) HandleLogin(w http.ResponseWriter, r *http.Request) {
	var payload LoginPayload
	err := json.NewDecoder(r.Body).Decode(&payload)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	user, err := h.store.VerifyCreds(payload.Username, payload.Password)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

func (h *Handler) HandleHealthCheck(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("healthy\n"))
}
