# Netflix Clone Backend (Java Spring Boot)

This is the Java Spring Boot version of the Netflix Clone backend.

## Prerequisites

-   Java 17 or higher
-   Java 17 or higher
-   Maven
-   PostgreSQL
-   TMDB API Key

## Configuration

Update `src/main/resources/application.properties` with your credentials or set environment variables:

```properties
# PostgreSQL Connection
spring.datasource.url=${DB_URL:jdbc:postgresql://localhost:5432/netflix_db}
spring.datasource.username=${DB_USERNAME:postgres}
spring.datasource.password=${DB_PASSWORD:postgres}

# TMDB API Key (v4 Auth Token or v3 API Key, depending on usage)
tmdb.api.key=YOUR_TMDB_API_KEY

# JWT Secret Key (must be at least 32 characters long)
jwt.secret=YOUR_SECURE_JWT_SECRET_KEY

# Port
server.port=${PORT:5000}
```

## Running the Application

1.  Build the project:
    ```bash
    mvn clean package
    ```

2.  Run the application:
    ```bash
    java -jar target/backend-0.0.1-SNAPSHOT.jar
    ```

or

```bash
mvn spring-boot:run
```

## API Endpoints

The endpoints mirror the original MERN stack backend:

-   **Auth**: `/api/v1/auth/signup`, `/api/v1/auth/login`, `/api/v1/auth/logout`, `/api/v1/auth/authCheck`
-   **Movie**: `/api/v1/movie/trending`, `/api/v1/movie/{id}/trailers`, etc.
-   **TV**: `/api/v1/tv/trending`, `/api/v1/tv/{id}/trailers`, etc.
-   **Search**: `/api/v1/search/person/{query}`, `/api/v1/search/history`, etc.
