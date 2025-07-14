package com.example.backend.board.repository;

import com.example.backend.board.dto.BoardDto;
import com.example.backend.board.dto.BoardListInfo;
import com.example.backend.board.entity.Board;
import com.example.backend.member.dto.BoardListDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board, Integer> {
    List<BoardListInfo> findAllByOrderByIdDesc();

    @Query(value = """
            SELECT new com.example.backend.member.dto.BoardListDto(
                        b.id,
                        b.title,
                        m.nickName,
                        b.insertedAt)
            FROM Board b JOIN Member m
                        ON b.author.email = m.email
            ORDER BY b.id DESC
            """)
    List<BoardListDto> findAllBy();

    @Query(value = """
            SELECT b.id id
            b.title title,
            b.content content,
                b.inserted_at inseted_at,
                m.email author_email,
                m.nick_name author_nick_name
            FROM board b JOIN member m
            ON b.author = m.email
            WHERE b.id
            """, nativeQuery = true)
    BoardDto findBoardById(Integer id);
}