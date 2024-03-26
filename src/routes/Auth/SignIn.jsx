import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoIcon from '../../../public/icon/logo.svg';
import EmailIcon from '../../../public/icon/email.svg';
import PasswordIcon from '../../../public/icon/password.svg';
import { useDispatch } from "react-redux";
import { postLogin, setUser } from "../../store/reducers/User/user";

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
      password
    }
    dispatch(postLogin(data))
      .then((res) => {
        console.log(res.payload)
        if (res.payload.status === 201) {
          console.log('여기')
          dispatch(setUser(res.payload.data));
          navigate('/');
        } else {
          setError("이메일 혹은 비밀번호가 옳지 않습니다.");
        }
      })

    setEmail("");
    setPassword("");
  };

  return (
    <SignupContainer>
      <LogoDiv>
        <img src={LogoIcon} style={{ width: 80 }} />
        <span>StockMate</span>
      </LogoDiv>
      <Form onSubmit={(e) => onLogin(e)}>
        <Label>
          <Img src={EmailIcon} alt="이메일" />
          <StyledInput
            type="text"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></StyledInput>
        </Label>
        <Label>
          <Img src={PasswordIcon} alt="비밀번호" />
          <StyledInput
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          ></StyledInput>
        </Label>
        <StyledButton type="submit">로그인</StyledButton>
      </Form>
      {error && <ErrorFont>이메일 혹은 비밀번호가 옳지 않습니다.</ErrorFont>}
      <div style={{ display: 'flex', gap: '20px' }}>
        <NavDiv onClick={() => navigate("/")}>홈으로</NavDiv>
        <NavDiv>|</NavDiv>
        <NavDiv onClick={() => navigate("/signup")}>회원가입</NavDiv>
      </div>
    </SignupContainer>
  );
};
export default SignIn;

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 42px);
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

const Img = styled.img`
  margin: 0 30px;
  width: 20px;
`;

const StyledInput = styled.input`
  width: 320px;
  height: 60px;
  background: #f4f5f7;
  border: none;
  font-size: 18px;
  font-weight: 400;
  padding: 0 10px;

  &::placeholder {
    color: rgba(186, 186, 186, 0.9);
  }

  &:focus {
    outline: 2px solid #FFE3D7;
  }
`;

const StyledButton = styled.button`
  border-radius: 16px;
  border: none;
  background: #FFE3D7;
  width: 409px;
  height: 55px;
  color: #000;
  text-align: center;
  font-size: 20px;
  font-weight: 400;
`;

const NavDiv = styled.div`
  color: #8b8b8b;
  text-align: center;
  font-weight: 400;
  margin-top: 30px;

  &:hover {
    cursor: pointer;
  }
`;

const LogoDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 36px;
  font-weight: 100;
  gap: 10px;
`

const ErrorFont = styled.span`
  color: #ff3333;
`