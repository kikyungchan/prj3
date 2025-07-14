package com.example.backend.commen.service;

import com.example.backend.board.entity.Board;
import com.example.backend.board.repository.BoardRepository;
import com.example.backend.commen.dto.CommentForm;
import com.example.backend.commen.entity.Comment;
import com.example.backend.commen.repository.CommentRepository;
import com.example.backend.member.entity.Member;
import com.example.backend.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;
    private final MemberRepository memberRepository;

    public void add(CommentForm comment, Authentication authentication) {
        if (authentication == null) {
            throw new RuntimeException("권한이 없습니다.");
        }

        Board board = boardRepository.findById(comment.getBoardId()).get();
        Member member = memberRepository.findById(authentication.getName()).get();

        Comment db = new Comment();
        db.setBoard(board);
        db.setComment(comment.getComment());
        db.setAuthor(member);

        commentRepository.save(db);
    }
}
