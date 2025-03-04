package internals

import (
	"log"

	gosocketify "github.com/V4T54L/go-socketify"
	"github.com/gorilla/websocket"
)

type Connection struct {
	ID      string
	Socket  *websocket.Conn
	Manager *ConnectionManager
}

type ConnectionManager struct {
	connections     map[*Connection]bool
	EventDispatcher EventDispatcher
	Store           *UserStore
}

func NewConnectionManager(eventDispatcher EventDispatcher) *ConnectionManager {
	connManager := &ConnectionManager{
		connections:     make(map[*Connection]bool),
		EventDispatcher: eventDispatcher,
		Store:           NewUserStore(),
	}

	return connManager
}

func (cm *ConnectionManager) AddConnection(conn *websocket.Conn, id string) *Connection {
	connection := &Connection{
		ID:      id,
		Socket:  conn,
		Manager: cm,
	}

	cm.connections[connection] = true

	go cm.handleMessages(connection)

	return connection
}

// if connection, it'll skip that connection
// else, it'll send to all the connections.
// no valid connection check so you can pass nil or any newly initialized connection
func (cm *ConnectionManager) Broadcast(connection *Connection, message gosocketify.Message) {
	for conn := range cm.connections {
		if conn == connection {
			continue
		}
		err := conn.Socket.WriteJSON(message)
		if err != nil {
			log.Printf("Error broadcasting message to %s: %v", conn.ID, err)
			continue
		}
	}
}

func (cm *ConnectionManager) Emit(conn *Connection, message gosocketify.Message) {
	err := conn.Socket.WriteJSON(message)
	if err != nil {
		log.Printf("Error sending message to %s: %v", conn.ID, err)
	}
}

func (cm *ConnectionManager) ToConnection(id string, message gosocketify.Message) {
	var conn Connection
	for c := range cm.connections {
		if c.ID == id {
			conn = *c
			break
		}
	}
	cm.Emit(&conn, message)
}

func (cm *ConnectionManager) handleMessages(conn *Connection) {
	defer func() {
		cm.RemoveConnection(conn)
	}()

	log.Println("[+] Handling new ws connection")

	for {
		var message Message
		err := conn.Socket.ReadJSON(&message)
		if err != nil {
			log.Println("Error reading message:", err)
			break
		}

		// Handle the message and dispatch events
		cm.EventDispatcher.Dispatch(conn.ID, message)
	}
}

func (cm *ConnectionManager) RemoveConnection(conn *Connection) {
	delete(cm.connections, conn)
	conn.Socket.Close()
}
