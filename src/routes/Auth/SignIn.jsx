import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoIcon from "../../../public/icon/logo.svg";
import { useDispatch, useSelector } from "react-redux";
import { postLogin, setUser } from "../../store/reducers/User/user";
import { getCookie } from "../../lib/apis/cookie";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    dispatch(postLogin(data)).then((res) => {
      if (res.payload.status === 201) {
        dispatch(setUser(res.payload.data));
        navigate("/");
      } else {
        setError("이메일 혹은 비밀번호가 옳지 않습니다.");
      }
    });
    setEmail("");
    setPassword("");
  };

  return (
    <SigninContainer>
      <LogoDiv>
        <img src={LogoIcon} style={{ width: 60 }} />
        <span>StockMate</span>
      </LogoDiv>
      <Form onSubmit={(e) => onLogin(e)}>
        <Label>
          <StyledInput
            type="text"
            placeholder="✉️   이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></StyledInput>
        </Label>
        <Label>
          <StyledInput
            type="password"
            placeholder="🔗   비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          ></StyledInput>
        </Label>
        <StyledButton type="submit">로그인</StyledButton>
      </Form>
      {error && <ErrorFont>이메일 혹은 비밀번호가 옳지 않습니다.</ErrorFont>}
      <div style={{ display: "flex", gap: "20px" }}>
        <NavDiv onClick={() => navigate("/")}>홈으로</NavDiv>
        <NavDiv>|</NavDiv>
        <NavDiv onClick={() => navigate("/signup")}>회원가입</NavDiv>
      </div>
    </SigninContainer>
  );
};
export default SignIn;

const SigninContainer = styled.div`
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
  gap: 32px;
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
  border: none;
  box-shadow: 2px 1px 5px rgba(0, 0, 0, 0.1);
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

const ErrorFont = styled.span`
  color: #ff3333;
`;
