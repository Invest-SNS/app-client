import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoIcon from "../../../public/icon/logo.svg";
import { useDispatch } from "react-redux";
import { postSignup } from "../../store/reducers/User/user";
import { Button, Modal } from "react-bootstrap";

const SignUp = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");

  const [isAlert, setIsAlert] = useState(false);
  const [alertModal, setAlertModal] = useState("");

  const onSignup = (e) => {
    e.preventDefault();
    if (emailCheck(email)) {
      setError1("유효한 이메일 형식으로 입력해주세요.");
      setError2("");
    } else if (password === passwordCheck) {
      const data = {
        email,
        password,
        nickname,
      };
      dispatch(postSignup(data)).then((res) => {
        if (res.payload.status === 201) {
          setIsAlert(true);
          setAlertModal("회원가입이 완료되었습니다. \n 🎉 해당 계정의 계좌로 1억원이 지급되었습니다 🎉 \n 로그인을 해보세요!");
        } else {
          setIsAlert(true);
          setAlertModal("해당 이메일은 이미 사용 중 입니다.");
        }
      });

      setEmail("");
      setPassword("");
      setPasswordCheck("");
      setNickname("");
      setError1("");
      setError2("");
    } else {
      setError2("비밀번호가 일치하지 않습니다.");
      setPassword("");
      setPasswordCheck("");
      setError1("");
    }
  };

  function emailCheck(email_address) {
    const email_regex = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/);
    return !email_regex.test(email_address);
  }

  return (
    <SignupContainer>
      <LogoDiv>
        <img src={LogoIcon} style={{ width: 60 }} />
        <span>StockMate</span>
      </LogoDiv>
      <Form onSubmit={onSignup}>
        <Label>
          <StyledInput
            placeholder="🤍   닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          ></StyledInput>
        </Label>
        <Label>
          <StyledInput
            placeholder="✉️   이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></StyledInput>
        </Label>
        {error1 && <Error>{error1}</Error>}
        <Label>
          <StyledInput
            placeholder="🔗   비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="off"
          ></StyledInput>
        </Label>
        <Label>
          <StyledInput
            placeholder="🔗   비밀번호 확인"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            type="password"
            autoComplete="off"
          ></StyledInput>
        </Label>
        {error2 && <Error>{error2}</Error>}
        <StyledButton type="submit">회원가입</StyledButton>
      </Form>
      <div style={{ display: "flex", gap: "20px" }}>
        <NavDiv onClick={() => navigate("/")}>홈으로</NavDiv>
        <NavDiv>|</NavDiv>
        <NavDiv onClick={() => navigate("/signin")}>로그인</NavDiv>
      </div>

      {/* Signup 모달 */}
      <Modal show={isAlert} onHide={() => setIsAlert(false)} centered>
        <Modal.Body style={{ textAlign: 'center', padding: '30px 0' }}>
          <span style={{ whiteSpace: 'pre-wrap', fontSize: '18px' }}>{alertModal}</span>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              backgroundColor: "#FFE3D7",
              border: "1px solid #FFE3D7",
              color: "#000",
            }}
            onClick={() => {
              if (alertModal === "해당 이메일은 이미 사용 중 입니다.") {
                setIsAlert(false);
              } else {
                setIsAlert(false);
                navigate("/signin");
              }
            }}
          >
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </SignupContainer>
  );
};
export default SignUp;

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 32px;

  @media (max-width: 500px) {
    transform: scale(0.8);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 22px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  background: #f4f5f7;
`;

const StyledInput = styled.input`
  width: 400px;
  height: 60px;
  background: #f4f5f7;
  box-shadow: 2px 1px 5px rgba(0, 0, 0, 0.1);
  border: none;
  font-size: 18px;
  font-weight: 400;
  padding: 0 30px;

  &::placeholder {
    color: rgba(160, 160, 160, 0.8);
  }

  &:focus {
    outline: 2px solid #ffd4c2;
  }
`;

const StyledButton = styled.button`
  border-radius: 16px;
  border: none;
  background: #FFE3D7;
  width: 404px;
  height: 55px;
  color: #000;
  text-align: center;
  font-size: 18px;
  font-weight: 400;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: #ffcfba;
  }
`;

const NavDiv = styled.div`
  color: #8b8b8b;
  text-align: center;
  font-weight: 400;
  margin-top: 30px;

  &:hover {
    cursor: pointer;
    color: #FF7D75;
  }
`;

const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 32px;
  font-weight: 200;
  gap: 10px;
`;

const Error = styled.span`
  color: #ff3333;
  font-size: 13px;
`;
