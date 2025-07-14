package com.example.backend.commen.entity;

import com.example.backend.board.entity.Board;
import com.example.backend.member.entity.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "comment")
@Getter
@Setter
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;

    @ManyToOne
    @JoinColumn(name = "author")
    private Member author;

    private String comment;

    @Column(insertable = false, updatable = false)
    private LocalDateTime insertedAt;

}
