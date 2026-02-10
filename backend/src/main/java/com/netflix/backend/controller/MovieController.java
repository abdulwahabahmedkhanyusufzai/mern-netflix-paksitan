package com.netflix.backend.controller;

import com.netflix.backend.service.TmdbService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api/v1/movie")
@RequiredArgsConstructor
public class MovieController {

    private final TmdbService tmdbService;

    @GetMapping("/trending")
    public ResponseEntity<Map<String, Object>> getTrendingMovie() {
        try {
            Map<String, Object> data = tmdbService
                    .fetchFromTmdb("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
            Map<String, Object> response = new HashMap<>();

            if (data == null || !data.containsKey("results")) {
                response.put("success", false);
                response.put("message", "Internal Server Error");
                return ResponseEntity.internalServerError().body(response);
            }

            List<Map<String, Object>> results = (List<Map<String, Object>>) data.get("results");
            Map<String, Object> randomMovie = results.get(new Random().nextInt(results.size()));

            response.put("success", true);
            response.put("content", randomMovie);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("success", false, "message", "Internal Server Error"));
        }
    }

    @GetMapping("/{id}/trailers")
    public ResponseEntity<Map<String, Object>> getMovieTrailers(@PathVariable String id) {
        try {
            Map<String, Object> data = tmdbService
                    .fetchFromTmdb("https://api.themoviedb.org/3/movie/" + id + "/videos?language=en-US");
            if (data == null) {
                return ResponseEntity.status(404).body(null);
            }
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("trailers", data.get("results"));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("success", false, "message", "Internal Server Error"));
        }
    }

    @GetMapping("/{id}/details")
    public ResponseEntity<Map<String, Object>> getMovieDetails(@PathVariable String id) {
        try {
            Map<String, Object> data = tmdbService
                    .fetchFromTmdb("https://api.themoviedb.org/3/movie/" + id + "?language=en-US");
            if (data == null) {
                return ResponseEntity.status(404).body(null);
            }
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("content", data);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("success", false, "message", "Internal Server Error"));
        }
    }

    @GetMapping("/{id}/similar")
    public ResponseEntity<Map<String, Object>> getSimilarMovies(@PathVariable String id) {
        try {
            Map<String, Object> data = tmdbService
                    .fetchFromTmdb("https://api.themoviedb.org/3/movie/" + id + "/similar?language=en-US&page=1");
            if (data == null) {
                return ResponseEntity.status(404).body(null);
            }
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("similar", data.get("results"));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("success", false, "message", "Internal Server Error"));
        }
    }

    @GetMapping("/{category}")
    public ResponseEntity<Map<String, Object>> getMoviesByCategory(@PathVariable String category) {
        try {
            Map<String, Object> data = tmdbService
                    .fetchFromTmdb("https://api.themoviedb.org/3/movie/" + category + "?language=en-US&page=1");
            if (data == null) {
                return ResponseEntity.status(404).body(null);
            }
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("content", data.get("results"));
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("success", false, "message", "Internal Server Error"));
        }
    }
}
