package com.example.backend.board.service;

import com.example.backend.board.dto.BoardListInfo;
import com.example.backend.board.entity.Board;
import com.example.backend.board.dto.BoardDto;
import com.example.backend.board.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class BoardService {

    private final BoardRepository boardRepository;

    public void add(BoardDto dto) {
        // entity에 dto의 값 들 옮겨 담고
        // entity는 테이블이다~ 생각하고 만들면됨
        Board board = new Board();
        board.setTitle(dto.getTitle());
        board.setContent(dto.getContent());
        board.setAuthor(dto.getAuthor());

        //repository에 save 실행
        boardRepository.save(board);
    }

    public boolean validata(BoardDto dto) {
        if (dto.getTitle() == null || dto.getTitle().trim().isBlank()) {
            return false;
        }

        if (dto.getContent() == null || dto.getContent().trim().isBlank()) {
            return false;
        }

        if (dto.getAuthor() == null || dto.getAuthor().trim().isBlank()) {
            return false;
        }
        return true;
    }

    public List<BoardListInfo> list() {
        return boardRepository.findAllByOrderByIdDesc();
    }

    public BoardDto getBoardById(Integer id) {
        Board board = boardRepository.findById(id).get();
        BoardDto dto = new BoardDto();
        dto.setTitle(board.getTitle());
        dto.setContent(board.getContent());
        dto.setAuthor(board.getAuthor());
        dto.setId(board.getId());
        dto.setInsertedAt(board.getInsertedAt());
        return dto;
    }
}
