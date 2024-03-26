import React, { useContext, useEffect, useState, useMemo } from "react";
import { Container, Navbar, Nav, Offcanvas, Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
// import { fetchAboutUser, logout } from "~/lib/apis/user";
// import { getCookie, removeCookie } from "~/lib/apis/cookie";
// import { IsLoginContext, useIsLoginState } from "~/lib/hooks/isLoginContext";
// import useAuth from "~/lib/hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import ChatBot from "../routes/chatBot/chatBot";
import LogoIcon from '../../public/icon/logo.svg'
import { postLogout, setUser } from "../store/reducers/User/user";


const EXPAND_BREAKPOINT = "md";

const MyNavbar = ({ offCanvasTitle }) => {
  const [showChatBot, setShowChatBot] = useState(false); // ChatBot 표시 상태
  const toggleChatBot = () => setShowChatBot(prev => !prev);
  const User = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log('User', User)

  const logout = async () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      dispatch(postLogout(User.token))
        .then((res) => {
          if (res.payload.status === 200) {
            dispatch(setUser({}))
          }
        })
      navigate('/')
    } else {
      return;
    }
  };
  
  return (
    <Navbar
      expand={EXPAND_BREAKPOINT}
      sticky="top"
      style={{ borderBottom: "1px solid black" }}
    >
      <Container fluid>
        <Navbar.Brand href="#" style={{ display: 'flex', gap: '10px', alignItems: 'center', fontWeight: '100' }}>
          <img src={LogoIcon} width={37} />
          StockMate
        </Navbar.Brand>
        <Navbar.Toggle aria-controls={`Navbar-expand-${EXPAND_BREAKPOINT}`} />
        <Navbar.Offcanvas
          id={`Navbar-expand-${EXPAND_BREAKPOINT}`}
          aria-labelledby={`NavbarLabel-expand-${EXPAND_BREAKPOINT}`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`NavbarLabel-expand-${EXPAND_BREAKPOINT}`}>
              {offCanvasTitle || "invest-SNS"}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="flex-row-reverse">
            <Nav
              className={`gap-2 justify-content-around flex-row pb-4 pb-${EXPAND_BREAKPOINT}-0`}
            >
              {!User?.token ? (
                <div style={{ display: "flex", gap: "15px" }}>
                
                  {/* 챗봇 토글 버튼 */}
                  <Button variant="outline-primary" onClick={toggleChatBot} >
                    ChatBot
                  </Button>
                  <Nav.Link
                    as={Link}
                    className="flex-grow-1 text-center"
                    to="/signin"
                  >
                    로그인
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    className="flex-grow-1 text-center"
                    to="/signup"
                  >
                    회원가입
                  </Nav.Link>
                </div>
              ) : ( 
                <>
                  {/* 챗봇 토글 버튼 */}
                  <Button variant="outline-primary" onClick={toggleChatBot} >
                    ChatBot
                  </Button>
                  <Nav.Link
                    as="div"
                    className="flex-grow-1 text-center"
                  >
                    {User.nickname}
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    className="flex-grow-1 text-center"
                    // to="/"
                    onClick={logout}
                  >
                    로그아웃
                  </Nav.Link>
                </>
              )}
              {/* ChatBot 모달 */}
              <Modal show={showChatBot} onHide={toggleChatBot} size="lg" centered>
                <Modal.Header closeButton>
                  <Modal.Title>ChatBot</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <ChatBot />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={toggleChatBot}>
                    닫기
                  </Button>
                </Modal.Footer>
              </Modal>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
