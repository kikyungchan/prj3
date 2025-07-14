# 게시물 테이블
CREATE TABLE board
(
    id          INT AUTO_INCREMENT NOT NULL,
    title       VARCHAR(99)        NOT NULL,
    content     VARCHAR(10000)     NOT NULL,
    author      VARCHAR(255)       NOT NULL,
    inserted_at datetime           NOT NULL DEFAULT NOW(),
    CONSTRAINT pk_board PRIMARY KEY (id),
    FOREIGN KEY (author) REFERENCES member (email)
);


DROP TABLE board;


# 회원 테이블
CREATE TABLE member
(
    email       VARCHAR(255)  NOT NULL,
    password    VARCHAR(255)  NOT NULL,
    nick_name   VARCHAR(255)  NOT NULL UNIQUE,
    info        VARCHAR(3000) NULL,
    inserted_at datetime      NOT NULL DEFAULT NOW(),
    CONSTRAINT pk_member PRIMARY KEY (email)
);

# 테스트용 정보 복사
INSERT INTO board
    (title, content, author, inserted_at)
SELECT title, content, author, inserted_at
FROM board;

# 정보 갯수 세기
SELECT COUNT(*)
FROM board;





