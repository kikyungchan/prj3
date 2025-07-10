package com.example.backend.member.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@Table(name = "member")
public class Member {
    @Id
    private String email;

    private String password;
    private String nickName;
    private String info;

    @Column(updatable = false, insertable = false)
    private LocalDateTime insertedAt;
}
