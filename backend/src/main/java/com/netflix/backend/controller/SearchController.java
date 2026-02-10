package com.netflix.backend.controller;

import com.netflix.backend.model.User;
import com.netflix.backend.model.SearchHistory;
import com.netflix.backend.repository.UserRepository;
import com.netflix.backend.service.TmdbService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.*;

@RestController
@RequestMapping("/api/v1/search")
@RequiredArgsConstructor
public class SearchController {

    private final TmdbService tmdbService;
    private final UserRepository userRepository;

    @GetMapping("/person/{query}")
    public ResponseEntity<Map<String, Object>> searchPerson(@PathVariable String query,
            @AuthenticationPrincipal UserDetails userDetails) {
        return searchAndSave(userDetails.getUsername(), query, "person",
                "https://api.themoviedb.org/3/search/person?query=" + query
                        + "&include_adult=false&language=en-US&page=1");
    }

    @GetMapping("/movie/{query}")
    public ResponseEntity<Map<String, Object>> searchMovie(@PathVariable String query,
            @AuthenticationPrincipal UserDetails userDetails) {
        return searchAndSave(userDetails.getUsername(), query, "movie",
                "https://api.themoviedb.org/3/search/movie?query=" + query
                        + "&include_adult=false&language=en-US&page=1");
    }

    @GetMapping("/tv/{query}")
    public ResponseEntity<Map<String, Object>> searchTv(@PathVariable String query,
            @AuthenticationPrincipal UserDetails userDetails) {
        return searchAndSave(userDetails.getUsername(), query, "tv",
                "https://api.themoviedb.org/3/search/tv?query=" + query + "&include_adult=false&language=en-US&page=1");
    }

    @GetMapping("/history")
    public ResponseEntity<Map<String, Object>> getSearchHistory(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            User user = userRepository.findByUsername(userDetails.getUsername()).orElse(null);
            if (user == null) {
                return ResponseEntity.status(404).body(Map.of("success", false, "message", "User not found"));
            }
            return ResponseEntity.ok(Map.of("success", true, "content", user.getSearchHistory()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("success", false, "message", "Internal Server Error"));
        }
    }

    @DeleteMapping("/history/{id}")
    public ResponseEntity<Map<String, Object>> removeFromHistory(@PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {
        try {
            User user = userRepository.findByUsername(userDetails.getUsername()).orElse(null);
            if (user == null) {
                return ResponseEntity.status(404).body(Map.of("success", false, "message", "User not found"));
            }

            List<SearchHistory> history = user.getSearchHistory();
            boolean removed = history.removeIf(item -> item.getId().equals(id));

            if (removed) {
                userRepository.save(user);
                return ResponseEntity.ok(Map.of("success", true, "message", "Item removed from search history"));
            } else {
                return ResponseEntity.status(404).body(Map.of("success", false, "message", "Item not found"));
            }

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("success", false, "message", "Internal Server Error"));
        }
    }

    private ResponseEntity<Map<String, Object>> searchAndSave(String username, String query, String type, String url) {
        try {
            Map<String, Object> data = tmdbService.fetchFromTmdb(url);
            if (data == null) {
                return ResponseEntity.status(404).body(null);
            }

            List<Map<String, Object>> results = (List<Map<String, Object>>) data.get("results");

            if (results != null && !results.isEmpty()) {
                Map<String, Object> firstResult = results.get(0);

                User user = userRepository.findByUsername(username).orElse(null);
                if (user != null) {
                    SearchHistory item = new SearchHistory();
                    item.setContentId(String.valueOf(firstResult.get("id")));
                    item.setSearchType(type);
                    item.setCreatedAt(java.time.LocalDateTime.now());

                    if (type.equals("person")) {
                        item.setTitle((String) firstResult.get("name"));
                        item.setImage((String) firstResult.get("profile_path"));
                    } else if (type.equals("movie")) {
                        item.setTitle((String) firstResult.get("title"));
                        item.setImage((String) firstResult.get("poster_path"));
                    } else { // tv
                        item.setTitle((String) firstResult.get("name"));
                        item.setImage((String) firstResult.get("poster_path"));
                    }

                    List<SearchHistory> history = user.getSearchHistory();
                    // Check for duplicates if needed, but for now just add
                    history.add(0, item);
                    userRepository.save(user);
                }
            }

            return ResponseEntity.ok(Map.of("success", true, "content", results));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body(Map.of("success", false, "message", "Internal Server Error"));
        }
    }
}
