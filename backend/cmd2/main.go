package main

import (
	"backend/internals"
	"log"
	"net/http"
)

func main() {
	connectionManager := internals.NewConnectionManager(nil)
	eventDispatcher := internals.EventDispatcherImpl{
		CM: connectionManager,
	}
	connectionManager.EventDispatcher = &eventDispatcher

	router := internals.NewRouter(connectionManager)
	log.Println("Starting server on :8080")
	if err := http.ListenAndServe(":8080", router); err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
