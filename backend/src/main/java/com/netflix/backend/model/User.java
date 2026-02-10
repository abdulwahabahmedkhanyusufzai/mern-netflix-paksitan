package com.netflix.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String username;
    private String email;
    private String password;
    private String image;
    private List<SearchHistoryItem> searchHistory = new ArrayList<>();

    @Data
    public static class SearchHistoryItem {
        private String id;
        private String image;
        private String title;
        private String searchType;
        private String createdAt;
    }
}
