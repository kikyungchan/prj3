import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export function MemberAdd() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickName, setNickName] = useState("");
  const [info, setInfo] = useState("");

  function handleSaveClick() {
    setIsProcessing(true);
    // post 로
    axios
      .post("/api/member/add", {
        email: email,
        password: password,
        nickName: nickName,
        info: info,
      })
      .then((res) => {
        console.log("ㅇㅋ");
        const message = res.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
      })
      .catch((err) => {
        console.log("ㄴㄴ");
        const message = err.response.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
      })
      .finally(() => {
        console.log("항상");
        setIsProcessing(false);
      });
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <h2 className="mb-4">회원 가입</h2>
        <div>
          <FormGroup className="mb-3" controlId="email1">
            <FormLabel>이메일</FormLabel>
            <FormControl
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="password1">
            <FormLabel>암호</FormLabel>
            {/*type 은 password 인데 보이도록 text로 잠시 둠.*/}
            <FormControl
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="password2">
            {/*TODO: 암호확인 나중에적용.*/}
            <FormLabel>암호 확인</FormLabel>
            {/*type 은 password 인데 보이도록 text로 잠시 둠.*/}
            <FormControl type="text" />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="nickName1">
            <FormLabel>별명</FormLabel>
            <FormControl
              value={nickName}
              onChange={(e) => setNickName(e.target.value.trim())}
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="info1">
            <FormLabel>자기소개</FormLabel>
            <FormControl
              as="textarea"
              row={6}
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <Button onClick={handleSaveClick} disabled={isProcessing}>
            {isProcessing && <Spinner size="sm" />}
            가입
          </Button>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </Col>
    </Row>
  );
}
