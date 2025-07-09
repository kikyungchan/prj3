import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";

export function BoardEdit() {
  const [isProcessing, setIsProcessing] = useState(false);

  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [board, setBoard] = useState(null);
  useEffect(() => {
    axios
      .get(`/api/board/${searchParams.get("id")}`)
      .then((res) => {
        console.log("ㅇㅋ");
        setBoard(res.data);
      })
      .catch((err) => {
        console.log("ㄴㄴ");
        toast("해당 게시물이 존재하지 않습니다.", { type: "warning" });
      })
      .finally(() => {
        console.log("항상");
      });
  }, []);

  function handleSaveButtonClick() {
    setIsProcessing(true);
    axios
      .put(`/api/board/${searchParams.get("id")}`, board)
      .then((res) => {
        console.log("ㅇㅋ");
        const message = res.data.message;
        toast(message.text, { type: message.type });
        navigate(`/board/${board.id}`);
      })
      .catch((err) => {
        console.log("ㄴㄴ");
        const message = err.response.data.message;
        if (message) {
          toast("게시물 수정시 오류가 발생하였습니다.", { type: "warning" });
        } else {
        }
      })
      .finally(() => {
        console.log("항상");
        setModalShow(false);
        setIsProcessing(false);
      });
  }

  if (!board) {
    return <Spinner />;
  }

  let validate = true;
  if (board.title.trim() === "") {
    validate = false;
  }
  if (board.content.trim() === "") {
    validate = false;
  }
  if (board.author.trim() === "") {
    validate = false;
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <h2 className="mb-4">{board.id}게시물 수정</h2>
        <div>
          <FormGroup className="mb-3" controlId="title1">
            <FormLabel>제목</FormLabel>
            <FormControl
              value={board.title}
              onChange={(e) => setBoard({ ...board, title: e.target.value })}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="content1">
            <FormLabel>본문</FormLabel>
            <FormControl
              as="textarea"
              rows={6}
              value={board.content}
              onChange={(e) => setBoard({ ...board, content: e.target.value })}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="author1">
            <FormLabel>작성자</FormLabel>
            <FormControl
              value={board.author}
              onChange={(e) => setBoard({ ...board, author: e.target.value })}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <Button
            className="me-2"
            onClick={() => navigate(-1)}
            variant="outline-secondary"
          >
            취소
          </Button>
          <Button
            disabled={!validate || isProcessing}
            onClick={() => setModalShow(true)}
            variant="outline-primary"
          >
            {isProcessing && <Spinner size="sm" />}
            {isProcessing || "저장"}
          </Button>
        </div>
      </Col>

      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>게시물 수정 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>{board.id}번 게시물을 수정하시겠습니까?</Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={() => setModalShow(false)}>
            취소
          </Button>
          <Button
            disabled={isProcessing}
            variant="outline-primary"
            onClick={handleSaveButtonClick}
          >
            {isProcessing && <Spinner size="sm" />}
            {isProcessing || "저장"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
}
