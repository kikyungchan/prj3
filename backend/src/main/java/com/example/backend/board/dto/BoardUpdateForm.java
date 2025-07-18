package com.example.backend.board.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardUpdateForm {
    private Integer id;
    private String title;
    private String content;
    private List<MultipartFile> files;
    private String[] deleteFiles;
}
