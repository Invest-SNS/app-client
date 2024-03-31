import React, { useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Offcanvas,
  Button,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ChatBot from "../routes/chatBot/chatBot";
import LogoIcon from "../../public/icon/logo.svg";
import { postLogout, setUser } from "../store/reducers/User/user";
import { setSelectedTab } from "../store/reducers/Trading/trading";
import chatbotImg from "../../public/icon/chat_mate.jpg";
import styled from "styled-components";
import { getCookie } from "../lib/apis/cookie";

const EXPAND_BREAKPOINT = "md";

const MyNavbar = ({ offCanvasTitle }) => {
  const [showChatBot, setShowChatBot] = useState(false); // ChatBot 표시 상태
  const toggleChatBot = () => setShowChatBot((prev) => !prev);
  const [logoutModal, setLogoutModal] = useState(false);
  const User = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const isLogin = !!getCookie("token");
  const token = getCookie("token");
  return (
    <Navbar
      expand={EXPAND_BREAKPOINT}
      sticky="top"
      style={{ borderBottom: "1px solid black", zIndex: 1 }}
    >
      <Container fluid>
        <Navbar.Brand
          href="/"
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            fontWeight: "100",
          }}
        >
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
              {!isLogin ? (
                <div style={{ display: "flex", gap: "15px" }}>
                  {/* 챗봇 토글 버튼 */}
                  <ChatBotBtn onClick={toggleChatBot}>
                    <img
                      src={chatbotImg}
                      alt="Robot"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "20px",
                      }}
                    />
                    <span>ChatBot</span>
                  </ChatBotBtn>
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
                  <ChatBotBtn onClick={toggleChatBot}>
                    <img
                      src={chatbotImg}
                      alt="Robot"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "20px",
                      }}
                    />
                    <span>ChatBot</span>
                  </ChatBotBtn>
                  <Nav.Link as="div" className="flex-grow-1 text-center">
                    {User.nickname} 님
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    className="flex-grow-1 text-center"
                    // to="/"
                    onClick={() => setLogoutModal(true)}
                  >
                    로그아웃
                  </Nav.Link>
                </>
              )}
              {/* ChatBot 모달 */}
              <Modal
                show={showChatBot}
                onHide={toggleChatBot}
                size="lg"
                centered
              >
                <Modal.Header closeButton>
                  <Modal.Title>ChatMate</Modal.Title>
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

              {/* Logout 모달 */}
              <Modal show={logoutModal} onHide={() => setLogoutModal(false)}>
                <Modal.Body>
                  <span>로그아웃 하시겠습니까?</span>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    style={{
                      backgroundColor: "#6e97ff",
                      border: "1px solid #6e97ff",
                    }}
                    onClick={() => {
                      dispatch(postLogout(token)).then((res) => {
                        if (res.payload.status === 200) {
                          dispatch(setUser({}));
                          dispatch(setSelectedTab("매수"));
                          setLogoutModal(false);
                        }
                      });
                    }}
                  >
                    네
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setLogoutModal(false)}
                  >
                    아니오
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

const ChatBotBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  color: rgba(0, 0, 0, 0.5);
  animation: ct 1s infinite;

  &:hover {
    cursor: pointer;
  }

  @keyframes ct {
    50% {
      color: #ff8b5c;
    }
  }
`;
