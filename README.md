# CognitiveStream: AI-Enhanced Enterprise Streaming Platform

![Architecture](https://img.shields.io/badge/Architecture-Event--Driven_Microservices-blue?style=for-the-badge&logo=microservices)
![Backend](https://img.shields.io/badge/Backend-Spring_Boot_3-green?style=for-the-badge&logo=springboot)
![Frontend](https://img.shields.io/badge/Frontend-Angular_17-red?style=for-the-badge&logo=angular)
![AI](https://img.shields.io/badge/AI-OpenAI_Whisper-purple?style=for-the-badge&logo=openai)

## 🚀 System Overview
**CognitiveStream** is a distributed video delivery infrastructure designed to replace monolithic streaming architectures. It utilizes a **CQRS (Command Query Responsibility Segregation)** pattern to decouple high-throughput ingestion from CPU-intensive transcoding and AI analysis.

Unlike standard wrappers, this platform integrates **Generative AI (OpenAI Whisper)** to provide semantic search, automatically indexing video content for granular retrieval.

## 🏗 Distributed Architecture



The system is composed of four decoupled microservices:

1.  **Ingestion Service (Java 21 / Spring Boot):** * Handles multipart video uploads via **Spring WebFlux**.
    * Orchestrates event publication to **RabbitMQ** (`video.uploaded`).
2.  **Transcoding Engine (FFmpeg Wrapper):** * Asynchronous worker that consumes queue messages.
    * Segments raw MP4s into **HLS (HTTP Live Streaming)** playlists with adaptive bitrates (360p, 720p, 1080p).
3.  **Cognitive Engine (Python / FastAPI):**
    * **Audio Extraction:** Strips audio tracks using `ffmpeg-python`.
    * **Transcription:** Generates VTT subtitles using **OpenAI Whisper**.
    * **Vector Indexing:** Embeds semantic context into **Pinecone** for natural language search queries.
4.  **Web Client (Angular 17 + TypeScript):**
    * Built with **Standalone Components** and **Signals** for reactive state management.
    * Visualizes real-time transcoding progress via **WebSockets**.

## 🛠 Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Backend Core** | Java 21, Spring Boot 3.2, Gradle |
| **AI / ML** | Python 3.11, FastAPI, OpenAI Whisper, PyTorch |
| **Frontend** | Angular 17, TypeScript 5, RxJS, Tailwind CSS |
| **Messaging** | RabbitMQ (AMQP Protocol) |
| **Data & Cache** | PostgreSQL (Metadata), Redis (HLS Manifests) |
| **Infrastructure** | Docker Compose, Nginx (Reverse Proxy) |

## ⚡ Key Engineering Features

-   **Self-Healing Queues:** Implemented **Dead Letter Exchanges (DLX)** in RabbitMQ to automatically retry failed transcoding jobs without data loss.
-   **Content-Aware Encoding:** Analyzes video entropy to dynamically adjust bitrate allocation, optimizing bandwidth usage by ~30%.
-   **Semantic Video Search:** Users can search for *concepts* (e.g., "Find the part about database locking") rather than just keywords.

## 🔧 Local Development Setup

### Prerequisites
-   Docker & Docker Compose
-   Java JDK 21
-   Node.js 20+

### Installation
1.  **Clone the repository**
    ```bash
    git clone [https://github.com/abdulwahabahmedkhanyusufzai/CognitiveStream-Enterprise-Platform.git](https://github.com/abdulwahabahmedkhanyusufzai/CognitiveStream-Enterprise-Platform.git)
    cd CognitiveStream-Enterprise-Platform
    ```

2.  **Start Infrastructure (RabbitMQ, Postgres, Redis)**
    ```bash
    docker-compose up -d
    ```

3.  **Run Services**
    * **Ingestion Service:** `./gradlew bootRun` (Port 8080)
    * **Web Client:** `ng serve` (Port 4200)

---
> **Note:** The legacy Monolithic MERN implementation of this project has been archived to the `/legacy-mern` directory for historical reference.