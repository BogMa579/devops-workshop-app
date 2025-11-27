package main

import (
	"encoding/json"
	"log"
	"math/rand"
	"net/http"
	"os"
	"time"
)

type Telemetry struct {
	FuelLevel     int     `json:"fuelLevel"`
	CabinPressure float64 `json:"cabinPressure"`
	Trajectory    int     `json:"trajectory"`
	Status        string  `json:"status"`
	Version       string  `json:"version"`
	NodeName      string  `json:"nodeName"`
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func getTelemetry(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	
	// Simulate varying data
	rand.Seed(time.Now().UnixNano())
	
	fuel := 100 - rand.Intn(30)
	pressure := 14.7 + (rand.Float64() * 0.5) - 0.25
	trajectory := rand.Intn(360)
	
	status := "NOMINAL"
	if pressure < 14.5 {
		status = "WARNING"
	}

	// Get K8s Node Name to show which pod answered
	nodeName := os.Getenv("NODE_NAME")
	if nodeName == "" {
		nodeName = "local-dev"
	}

	data := Telemetry{
		FuelLevel:     fuel,
		CabinPressure: pressure,
		Trajectory:    trajectory,
		Status:        status,
		Version:       os.Getenv("APP_VERSION"),
		NodeName:      nodeName,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

func main() {
	http.HandleFunc("/api/telemetry", getTelemetry)

	port := "8080"
	log.Printf("📡 Backend Telemetry Service v1.0.0 active on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
