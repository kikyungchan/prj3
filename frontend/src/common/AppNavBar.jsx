import { Link, NavLink, useNavigate, useSearchParams } from "react-router";
import {
  Button,
  Container,
  Form,
  FormControl,
  InputGroup,
  Nav,
  Navbar,
} from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "./AuthenticationContextProvider.jsx";

export function AppNavBar() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const { user, isAdmin } = useContext(AuthenticationContext);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      setKeyword(q);
    } else {
      setKeyword("");
    }
  }, [searchParams]);

  function handleSearchFormSubmit(e) {
    e.preventDefault();
    // console.log("조회 폼 서브밋");
    navigate("/?q=" + keyword);
  }

  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand to="/" as={Link}>
            PRJ3
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link as={NavLink} to="/">
                HOME
              </Nav.Link>
              {user !== null && (
                <Nav.Link as={NavLink} to="/board/add">
                  새글
                </Nav.Link>
              )}
            </Nav>
            <Nav className="order-lg-3">
              {user === null && (
                <Nav.Link as={NavLink} to="/signup">
                  가입
                </Nav.Link>
              )}
              {isAdmin() && (
                <Nav.Link as={NavLink} to="/member/list">
                  회원목록
                </Nav.Link>
              )}
              {user === null && (
                <Nav.Link as={NavLink} to="/login">
                  로그인
                </Nav.Link>
              )}
              {user !== null && (
                <Nav.Link as={NavLink} to="/logout">
                  로그아웃
                </Nav.Link>
              )}
              {user !== null && (
                <Nav.Link as={NavLink} to={`/member?email=${user.email}`}>
                  {user.nickName}
                </Nav.Link>
              )}
            </Nav>

            <Form
              className="order-lg-2 mx-lg-auto"
              inline="true"
              onSubmit={handleSearchFormSubmit}
            >
              <InputGroup>
                <FormControl
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                ></FormControl>
                <Button type="submit">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg>
                </Button>
              </InputGroup>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
