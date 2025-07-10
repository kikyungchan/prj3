package com.example.backend.member.controller;

import com.example.backend.member.dto.MemberDto;
import com.example.backend.member.dto.MemberForm;
import com.example.backend.member.dto.MemberListInfo;
import com.example.backend.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/member")
public class MemberController {

    private final MemberService memberService;

    @DeleteMapping
    public ResponseEntity<?> deleteMember(@RequestBody MemberForm memberForm) {
        System.out.println("memberForm = " + memberForm);
        try {
            memberService.delete(memberForm);

        } catch (Exception e) {
            e.printStackTrace();
            String message = e.getMessage();
            return ResponseEntity.status(403).body( // 405 = 권한 없음 // 401 = 인증안됨/ 로그인안됨
                    Map.of("message",
                            Map.of("type", "error",
                                    "text", message)));
        }
        return ResponseEntity.ok().body(
                Map.of("message",
                        Map.of("type", "success",
                                "text", "회원 정보가 삭제되었습니다.")));
    }


    @GetMapping(params = "email")
    public MemberDto getMember(String email) {
        return memberService.get(email);
    }

    @PostMapping("add")
    public ResponseEntity<?> add(@RequestBody MemberForm memberForm) {
//        System.out.println("memberForm = " + memberForm);
        try {
            memberService.add(memberForm);
        } catch (Exception e) {
            e.printStackTrace();
            String message = e.getMessage();
            return ResponseEntity.badRequest().body(
                    Map.of("message",
                            Map.of("type", "error",
                                    "text", message)));
        }
        return ResponseEntity.ok().body(
                Map.of("message",
                        Map.of("type", "success",
                                "text", "회원가입 되었습니다.")));
    }

    @GetMapping("list")
    public List<MemberListInfo> list() {
        return memberService.list();
    }
}
