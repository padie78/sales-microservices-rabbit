# # Sales Microservices with RabbitMQ

This project is a **sales system built on microservices architecture**, using **NestJS** and **RabbitMQ** to enable asynchronous communication between independent services. It demonstrates clean architecture, scalability, and modular service design for backend applications.

## 🔗 Live Demo

👉 *Coming soon*  

## 🧩 Architecture Overview

The system is composed of multiple decoupled services:

- **Orders Service** – Handles the creation and publishing of sales orders.
- **Billing Service** – Listens for order events, generates invoices and simulates payment flow.
- **(noy yet) Notifications Service** – Sends real-time events or notifications.
- **API Gateway** – Acts as a unified HTTP entry point for the system.
- **RabbitMQ** – Serves as the message broker for service-to-service communication.

Each service follows **Clean Architecture**, separated into:

- `presentation/` – Controllers & HTTP interfaces
- `application/` – Use cases & business logic
- `infrastructure/` – External communication (DB, RabbitMQ, etc.)
- `domain/` – Core models and interfaces

---

## 🖥️ Run Locally

### ✅ Prerequisites

- Node.js v18 or higher
- Docker & Docker Compose installed

### 🚀 Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-username/sales-microservices-rabbit.git
cd sales-microservices-rabbit

# 2. Build and start the microservices
docker-compose up --build
