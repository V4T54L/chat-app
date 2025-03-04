package internals

import (
	"log"
	"time"

	gosocketify "github.com/V4T54L/go-socketify"
)

type Message struct {
	Event string      `json:"event"`
	Data  interface{} `json:"data"`
}

type EventDispatcher interface {
	Dispatch(connId string, message Message)
}

type EventDispatcherImpl struct {
	CM *ConnectionManager
}

func (ed *EventDispatcherImpl) Dispatch(connId string, message Message) {
	log.Println("[+] Dispatching...")

	if ed.CM == nil {
		log.Fatal("\n\n [-] Connection Manager not found in EventDispatcherImpl")
	}

	switch message.Event {
	case NEW_CONN_JOINED:
		log.Println("[+] Dispatching : NEW_CONN_JOINED")
		user, ok := ed.CM.Store.loggedInUsers[connId]
		if !ok {
			log.Println("[!] Unexpected case: User not a logged in user")
			return
		}

		var conn *Connection
		for key := range ed.CM.connections {
			if key.ID == connId {
				conn = key
				break
			}
		}
		if conn == nil {
			log.Println("[!] Unexpected case: Invalid connection")
			return
		}

		// Broadcast user details
		log.Println("[+] Broadcasting user info to others")
		ed.CM.Broadcast(conn, gosocketify.Message{
			Event: NEW_CONN_BROADCAST,
			Data:  user,
		})

		// Send user detail and active users to newly joined user
		log.Println("[+] Broadcasting to user info to the user")
		ed.CM.Emit(conn, gosocketify.Message{
			Event: USER_INFO,
			Data:  user,
		})

		log.Println("[+] Broadcasting to active users to the user")

		activeUsers := make([]UserInfo, 0, len(ed.CM.Store.loggedInUsers))

		for _, user := range ed.CM.Store.loggedInUsers {
			activeUsers = append(activeUsers, user)
		}
		ed.CM.Emit(conn, gosocketify.Message{
			Event: ACTIVE_USERS,
			Data:  activeUsers,
		})

	case SEND_MESSAGE_REQUEST:
		log.Println("[+] Dispatching : SEND_MESSAGE_REQUEST")
		// retrive sender name and receiver name
		data := message.Data.(map[string]interface{})

		receiverName, ok := data["chatId"].(string) // Name of the user the message to send
		if !ok {
			log.Println("[!] Invalid message data: chatId not provided or invalid format")
			return
		}

		msgObj, ok := data["message"].(map[string]interface{})
		if !ok {
			log.Println("[!] Invalid message data: message not provided or invalid format")
			return
		}

		log.Println("Message : ", msgObj)
		senderName, ok := msgObj["senderId"].(string) // Name of the sender user
		if !ok {
			log.Println("[!] Invalid message data: senderId not provided or invalid format")
			return
		}

		content, ok := msgObj["content"].(string) // content of the message
		if !ok {
			log.Println("[!] Invalid message data: content not provided or invalid format")
			return
		}

		// verify chat id and senderId
		var receiverID, senderID string
		for _, user := range ed.CM.Store.loggedInUsers {
			if user.Username == senderName {
				senderID = user.ID
			}
			if user.Username == receiverName {
				receiverID = user.ID
			}

			if senderID != "" && receiverID != "" {
				break
			}
		}

		if senderID != connId {
			log.Printf("[!] User %s being sneaky and trying to sending message on %s behalf. \n", connId, senderID)
			return
		}

		var senderConn, receiverConn *Connection
		for conn := range ed.CM.connections {
			if conn.ID == senderID {
				senderConn = conn
			}
			if conn.ID == receiverID {
				receiverConn = conn
			}
			if senderConn != nil && receiverConn != nil {
				break
			}
		}

		msg := MessageData{
			ID:        "msg-id-" + generateUUID(),
			Content:   content,
			SenderID:  senderName,
			Timestamp: time.Now().Format("15:04 02-01-2006"),
			Status:    "delivered",
		}

		log.Println("[+] Sending message to the receiver")
		ed.CM.Emit(receiverConn, gosocketify.Message{
			Event: SEND_MESSAGE_RESPONSE,
			Data: map[string]interface{}{
				"chatId":  senderName,
				"message": msg,
			},
		})

		log.Println("[+] Sending message to the sender")
		ed.CM.Emit(senderConn, gosocketify.Message{
			Event: SEND_MESSAGE_RESPONSE,
			Data: map[string]interface{}{
				"chatId":  receiverName,
				"message": msg,
			},
		})

	default:
		log.Printf("Event not handled: %s", message.Event)
	}
}
