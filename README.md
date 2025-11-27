# 🚀 DevOps Workshop - Mission Control App

A microservices demo application for learning Kubernetes, CI/CD, and GitOps practices.

## 📖 About This Project

This is a hands-on learning project where you'll deploy a real application to Kubernetes using modern DevOps practices. The app features a live Mission Control dashboard with a rocket that responds to real-time telemetry data from a backend API.

Your Mission: Build a complete CI/CD pipeline that automatically builds, tests, and deploys this application to a Kubernetes cluster using GitHub Actions and ArgoCD.

## 🏗️ Architecture

This project uses a microservices architecture:
- Backend Service (Go): REST API that generates telemetry data
- Frontend Service (React): Interactive dashboard that visualizes the data

Both services run as separate containers in Kubernetes and communicate over the network.

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Backend | Go 1.21, REST API |
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion |
| Containerization | Docker (multi-stage builds) |
| Orchestration | Kubernetes |
| CI/CD | GitHub Actions (you'll build this!) |
| GitOps | ArgoCD (you'll configure this!) |

## 🎯 Learning Objectives

By completing this workshop, you will:
- Containerize microservices with Docker
- Build automated CI/CD pipelines with GitHub Actions
- Push images to DockerHub
- Deploy applications to Kubernetes
- Implement GitOps with ArgoCD
- Understand service-to-service communication
- Manage environment variables and configuration

## 🚦 Getting Started

### Prerequisites
- Node.js (v18+)
- Go (1.21+) - Optional if using Docker
- Docker (for containerization)
- Git

### Local Development - Option 1: Docker

Terminal 1 - Backend:
    cd backend
    docker build -t mission-control-backend .
    docker run -p 8080:8080 mission-control-backend

Terminal 2 - Frontend:
    cd frontend
    docker build -t mission-control-frontend .
    docker run -p 3000:80 mission-control-frontend

Open http://localhost:3000 in your browser.

### Local Development - Option 2: Native

Terminal 1 - Backend:
    cd backend
    go run main.go

Terminal 2 - Frontend:
    cd frontend
    npm install
    npm run dev

Frontend runs on http://localhost:5173

### Testing the API

    curl http://localhost:8080/api/telemetry

Expected response:
    {
      "fuelLevel": 85,
      "cabinPressure": 14.65,
      "trajectory": 120,
      "status": "NOMINAL",
      "version": "v1.0.0",
      "nodeName": "local-dev"
    }

## 📂 Repository Structure

    devops-workshop-app/
    ├── backend/
    │   ├── main.go
    │   ├── go.mod
    │   └── Dockerfile
    ├── frontend/
    │   ├── src/
    │   ├── package.json
    │   └── Dockerfile
    └── README.md

## 🎓 Workshop Tasks

Phase 1: Containerization
- Build Docker images for both services
- Test containers locally
- Push images to DockerHub

Phase 2: CI/CD Pipeline
- Create GitHub Actions workflow
- Automate Docker builds on push
- Implement versioning strategy

Phase 3: Kubernetes Deployment
- Write Kubernetes manifests
- Deploy to your cluster
- Verify service communication

Phase 4: GitOps with ArgoCD
- Connect ArgoCD to your repo
- Configure automated sync
- Deploy a new version

## 🔧 Environment Variables

Backend:
- APP_VERSION - Application version (default: v1.0.0)
- NODE_NAME - Kubernetes node name

Frontend:
- BACKEND_URL - Backend API URL (injected at runtime)

## 🐛 Troubleshooting

Frontend can't reach backend:
- Verify backend is running on port 8080
- Check BACKEND_URL environment variable
- Ensure CORS is enabled (already configured)

Docker build fails:
- Ensure you're in the correct directory
- Check Docker daemon is running
- Verify internet connection

## 🤝 Contributing

This is a learning project! Experiment and learn from mistakes.

## 📝 License

MIT License - Free to use for educational purposes.

Questions? Ask your instructor or check the workshop documentation.
