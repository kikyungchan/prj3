import {
  Button,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
  Row,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export function MemberAdd() {
  const navigate = useNavigate();
  const [password2, setPassword2] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [info, setInfo] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

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
        navigate("/");
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

  // 이메일, 암호, 별명 입력하지 않으면 가입버튼 비활성화

  let disabled = false;
  if (email === "") {
    disabled = true;
  }
  if (password === "") {
    disabled = true;
  }
  if (nickName === "") {
    disabled = true;
  }
  // password와 password2가 일치하지 않으면 비활성화
  let passwordConfirm = true;
  if (password !== password2) {
    disabled = true;
    passwordConfirm = false;
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
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
            ></FormControl>
          </FormGroup>
        </div>
        <div>
          <FormGroup className="mb-3" controlId="password2">
            <FormLabel>암호 확인</FormLabel>
            {/*type 은 password 인데 보이도록 text로 잠시 둠.*/}
            <FormControl
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            {passwordConfirm || (
              <FormText className="text-danger">
                패스워드가 일치하지 않습니다.
              </FormText>
            )}
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
          <Button onClick={handleSaveClick} disabled={isProcessing || disabled}>
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
