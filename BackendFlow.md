# Frontend
- User Logs in.
- Upon receiving newuser join event, create a new conversation with the user.
- upon receiving the current users' info, create conversations for each of them.
- send text message to any conversation.
- upon receiving the message, render it in the appropriate conversation


# Backend
- Upon successful login, send token and broadcast everyone about the new user joined & send all the current users to the new user.
- upon sending message, send it to the target and sender websockets.