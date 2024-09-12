import React, { useContext, useEffect, useState, useMemo } from "react";
import { Container, Navbar, Nav, Offcanvas, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { fetchAboutUser, logout } from "~/lib/apis/user";
// import { getCookie, removeCookie } from "~/lib/apis/cookie";
// import { IsLoginContext, useIsLoginState } from "~/lib/hooks/isLoginContext";
// import useAuth from "~/lib/hooks/useAuth";
import { useSelector } from "react-redux";
import ChatBot from "../routes/chatBot/chatBot";
import LogoIcon from '../../public/icon/logo.svg'


const EXPAND_BREAKPOINT = "md";

const MyNavbar = ({ offCanvasTitle }) => {
  const [showChatBot, setShowChatBot] = useState(false); // ChatBot 표시 상태
  const toggleChatBot = () => setShowChatBot(prev => !prev);

  // const [user, setUser] = useState("");
  //   const [userId, setUserId] = useState("");
  // const [isLogin, setIsLogin] = useState(false);
  //   const token = getCookie("token");
  //   const { setIsLogin } = useContext(IsLoginContext);
  //   const isLogin = useIsLoginState();

  //   const { user, clientLogout } = useAuth();

  // const postLogout = async () => {
  //   try {
  //     const response = await logout();
  //     console.log(response);
  //     removeCookie("token");
  //     setIsLogin(false);
  //     clientLogout();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const aboutUser = async () => {
  //   try {
  //     const userObj = await fetchAboutUser();
  //     console.log(userObj);
  //     // setUser(userObj.data.nickname);
  //     setUserId(userObj.data._id);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   if (token) {
  //     // aboutUser();
  //   } else {
  //   }
  // }, [token]);
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
              className={`justify-content-around flex-row pb-4 pb-${EXPAND_BREAKPOINT}-0`}
            >
              {/* {!user ? ( */}
              <div style={{ display: "flex", gap: "15px" }}>
              
              {/* 챗봇 토글 버튼 */}
                <Button variant="outline-primary" onClick={toggleChatBot} >
                  ChatBot
                </Button>
                <Nav.Link
                  as={Link}
                  className="flex-grow-1 text-center"
                  to="/login"
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
              {/* ) : (
                <>
                  <Nav.Link
                    as="div"
                    className="flex-grow-1 text-center border border-dark"
                  >
                    {user.nickname}
                  </Nav.Link>
                  <Nav.Link
                    as="div"
                    className="flex-grow-1 text-center border border-dark"
                    onClick={postLogout}
                  >
                    로그아웃
                  </Nav.Link>
                </>
              )} */}
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
