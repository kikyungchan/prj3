import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  FormText,
  Modal,
  Row,
  Spinner,
} from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export function MemberEdit() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword1, setNewPassword1] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [passwordModalShow, setPasswordModalShow] = useState(false);
  const [password, setPassword] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [params] = useSearchParams();

  useEffect(() => {
    axios
      .get(`/api/member?email=${params.get("email")}`)
      .then((res) => {
        console.log("good");
        setMember(res.data);
      })
      .catch((err) => {
        console.log("bad");
      })
      .finally(() => {
        console.log("always");
      });
  }, []);

  function handleSaveButtonClick() {
    axios
      .put(`/api/member`, { ...member, password: password })
      .then((res) => {
        const message = res.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
        navigate(`/member?email=${member.email}`);
      })
      .catch((err) => {
        const message = err.response.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
      })
      .finally(() => {
        setModalShow(false);
        setPassword("");
      });
  }

  // 암호 변경 버튼 활성화 여부

  let changePasswordButtonDisabled = false;
  let passwordConfirm = true;
  if (oldPassword === "") {
    changePasswordButtonDisabled = true;
  }
  if (newPassword1 === "") {
    changePasswordButtonDisabled = true;
  }
  if (newPassword2 === "") {
    changePasswordButtonDisabled = true;
  }
  if (newPassword1 !== newPassword2) {
    changePasswordButtonDisabled = true;
    passwordConfirm = false;
  }

  function handleChangePasswordButtonClick() {
    axios
      .put("/api/member/changePassword", {
        email: member.email,
        oldPassword: oldPassword,
        newPassword: newPassword1,
      })
      .then((res) => {
        console.log("good");
        const message = res.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
      })
      .catch((err) => {
        console.log("bad");
        const message = err.response.data.message;
        if (message) {
          toast(message.text, { type: message.type });
        }
      })
      .finally(() => {
        console.log("always");
        setOldPassword("");
        setNewPassword1("");
        setNewPassword2("");
        setPasswordModalShow(false);
      });
  }

  function handleCancleButton() {
    setOldPassword("");
    setNewPassword1("");
    setNewPassword2("");
    setPasswordModalShow(false);
  }

  if (!member) {
    return <Spinner />;
  }

  return (
    <Row className="justify-content-center">
      <Col xs={12} md={8} lg={6}>
        <h2 className="mb-4">회원정보 수정</h2>
        <div>
          <FormGroup controlId="email1" className="mb-3">
            <FormLabel>이메일</FormLabel>
            <FormControl disabled value={member.email} />
          </FormGroup>
        </div>
        <div className="mb-4">
          <Button
            variant="outline-info"
            onClick={() => setPasswordModalShow(true)}
          >
            암호 변경
          </Button>
        </div>
        <div>
          <FormGroup controlId="nickName1" className="mb-3">
            <FormLabel>닉네임</FormLabel>
            <FormControl
              value={member.nickName}
              onChange={(e) =>
                setMember({ ...member, nickName: e.target.value })
              }
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup controlId="info1" className="mb-3">
            <FormLabel>자기소개</FormLabel>
            <FormControl
              as="textarea"
              value={member.info}
              onChange={(e) => setMember({ ...member, info: e.target.value })}
            />
          </FormGroup>
        </div>
        <div>
          <FormGroup controlId="inserted1" className="mb-3">
            <FormLabel>가입일시</FormLabel>
            <FormControl
              type="datetime-local"
              disabled
              value={member.insertedAt}
            />
          </FormGroup>
          <div>
            <Button onClick={() => navigate(-1)} variant="outline-secondary">
              취소
            </Button>
            <Button
              onClick={() => setModalShow(true)}
              variant="outline-primary"
            >
              저장
            </Button>
          </div>
        </div>
      </Col>
      {/* 수정 확인 모달*/}
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>회원 정보 수정 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup controlId="password1">
            <FormLabel>암호</FormLabel>
            <FormControl
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark" onClick={() => setModalShow(false)}>
            취소
          </Button>
          <Button variant="outline-primary" onClick={handleSaveButtonClick}>
            저장
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 암호 변경 모달*/}
      <Form
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleChangePasswordButtonClick();
          }
        }}
      >
        <Modal show={passwordModalShow} onHide={handleCancleButton}>
          <Modal.Header closeButton>
            <Modal.Title>암호변경 확인</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup className="mb-3" controlId="password2">
              <FormLabel>현재 암호</FormLabel>
              <FormControl
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mb-3" controlId="password3">
              <FormLabel>변경할 암호</FormLabel>
              <FormControl
                type="password"
                value={newPassword1}
                onChange={(e) => setNewPassword1(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mb-3" controlId="password4">
              <FormLabel>변경할 암호 확인</FormLabel>
              <FormControl
                type="password"
                value={newPassword2}
                onChange={(e) => setNewPassword2(e.target.value)}
              />
              {passwordConfirm || (
                <FormText className="text-danger">
                  패스워드가 일치하지 않습니다.
                </FormText>
              )}
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-dark" onClick={handleCancleButton}>
              취소
            </Button>
            <Button
              type="submit"
              onClick={handleChangePasswordButtonClick}
              variant="outline-primary"
              disabled={changePasswordButtonDisabled}
            >
              변경
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </Row>
  );
}
