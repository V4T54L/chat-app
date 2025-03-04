package internals

import (
	"errors"
	"math/rand"

	"github.com/google/uuid"
)

type UserStore struct {
	loggedInUsers map[string]UserInfo
}

func NewUserStore() *UserStore {
	return &UserStore{make(map[string]UserInfo)}
}

func (u *UserStore) VerifyCreds(username, password string) (*UserInfo, error) {
	// check if user with username already connected
	for _, v := range u.loggedInUsers {
		if v.Username == username {
			return nil, errors.New("user already logged in from another device")
		}
	}
	// password validation (skipping for now)
	// create user info
	user := UserInfo{
		ID:       uuid.NewString(),
		Username: username,
		Avatar:   mockAvatarURI[rand.Intn(len(mockAvatarURI))],
		Status:   "online",
	}
	// add user to logged in user
	u.loggedInUsers[user.ID] = user

	// return the user
	return &user, nil
}

func (u *UserStore) Logout(token string) {
	delete(u.loggedInUsers, token)
}
