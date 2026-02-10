package com.netflix.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "search_history")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SearchHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id; // Use Long for ID in history table

    private String contentId; // ID from TMDB
    private String image;
    private String title;
    private String searchType;
    private LocalDateTime createdAt;
}
