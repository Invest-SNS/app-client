import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { signup } from "~/lib/apis/user";
import LogoIcon from '../../../public/icon/logo.svg';
import NicknameIcon from '../../../public/icon/nickname.svg';
import EmailIcon from '../../../public/icon/email.svg';
import PasswordIcon from '../../../public/icon/password.svg';
import { useDispatch } from "react-redux";
import { postSignup } from "../../store/reducers/User/user";

const SignUp = () => {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");

  const onSignup = (e) => {
    e.preventDefault();
    if (emailCheck(email)) {
      setError1("유효한 이메일 형식으로 입력해주세요.");
      setError2("");
    } else if (password === passwordCheck) {
      const data = {
        email,
        password,
        nickname
      }
      dispatch(postSignup(data))
        .then((res) => {
          console.log(res.payload)
          if (res.payload.status === 201) {
            alert('회원가입이 완료되었습니다.');
            navigate('/signin');
          } else {
            alert("해당 이메일은 이미 사용 중 입니다.");
            return;
          }
        })

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
        <img src={LogoIcon} style={{ width: 80 }} />
        <span>StockMate</span>
      </LogoDiv>
      <Form onSubmit={onSignup}>
        <Label>
          <Img src={NicknameIcon} alt="닉네임" />
          <StyledInput
            placeholder="닉네임"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          ></StyledInput>
        </Label>
        <Label>
          <Img src={EmailIcon} alt="이메일" />
          <StyledInput
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></StyledInput>
        </Label>
        {error1 && <Error>{error1}</Error>}
        <Label>
          <Img src={PasswordIcon} alt="비밀번호" />
          <StyledInput
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="off"
          ></StyledInput>
        </Label>
        <Label>
          <Img src={PasswordIcon} alt="비밀번호 확인" />
          <StyledInput
            placeholder="비밀번호 확인"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            type="password"
            autoComplete="off"
          ></StyledInput>
        </Label>
        {error2 && <Error>{error2}</Error>}
        <StyledButton type="submit">회원가입</StyledButton>
      </Form>
      <div style={{ display: 'flex', gap: '20px' }}>
        <NavDiv onClick={() => navigate("/")}>홈으로</NavDiv>
        <NavDiv>|</NavDiv>
        <NavDiv onClick={() => navigate("/signin")}>로그인</NavDiv>
      </div>
    </SignupContainer>
  );
};
export default SignUp;

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
  gap: 22px;
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

const Error = styled.span`
  color: #ff3333;
  font-size: 13px;
`