package internals

type LoginPayload struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type UserInfo struct {
	ID       string `json:"-"`
	Username string `json:"name"`
	Avatar   string `json:"avatar"`
	Status   string `json:"status"`
}

type MessageData struct {
	ID        string `json:"id,omitempty"`
	Content   string `json:"content,omitempty"`
	SenderID  string `json:"senderId,omitempty"`
	Timestamp string `json:"timestamp,omitempty"`
	Status    string `json:"status,omitempty"`
}
