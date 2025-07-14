package com.example.backend.commen.dto;

import lombok.Data;

@Data
public class CommentForm {
    private Integer boardId;
    private String comment;
}
