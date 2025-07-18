import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthenticationContext } from "../../common/AuthenticationContextProvider.jsx";

export function MemberLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // step2. use context
  const { login } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  function handleLogInButtonClick(e) {
    e.preventDefault();
    axios
      .post("/api/member/login", { email: email, password: password })
      .then((res) => {
        const token = res.data.token;
        login(token);

        const message = res.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }

        navigate("/");
      })
      .catch((err) => {
        const message = err.response.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        } else {
          toast("로그인 중 오류가 발생했습니다.", { type: "error" });
          console.error("로그인 에러:", err);
        }
      })
      .finally(() => {});
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <h2 className="mb-4">로그인</h2>
        <Form onSubmit={handleLogInButtonClick}>
          <FormGroup controlId="email1" className="mb-3">
            <FormLabel>이메일</FormLabel>
            <FormControl
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup controlId="password1" className="mb-3">
            <FormLabel>암호</FormLabel>
            <FormControl
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <Button type="submit">로그인</Button>
        </Form>
      </Col>
    </Row>
  );
}
