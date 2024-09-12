import React, { useState } from "react";
import styled from "styled-components";
import * as S from "../../style/GlobalStyle";
import FeedWriting from "~/components/Feed/FeedWriting";
import Feed from "../../components/Feed/FeedShow/Feed";
import { useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "../../lib/apis/cookie";
import LogoIcon from "../../../public/icon/logo.svg";

const FeedPage = () => {
  const [isWrite, setIsWrite] = useState(false);
  const location = useLocation();
  const path = location.pathname;
  const isLogin = !!getCookie("token");
  const navigate = useNavigate();
  const write = () => {
    setIsWrite(true);
  };

  return (
    <S.Container>
      {isLogin ? (
        <>
          {isWrite ? (
            <FeedWriting setIsWrite={setIsWrite} />
          ) : (
            <WritingContainer onClick={write}>
              <img
                src="/icon/user.svg"
                alt="프로필"
                style={{ width: "45px" }}
              />
              <InputDiv>무슨 생각을 하고 계신가요?</InputDiv>
            </WritingContainer>
          )}
          <FeedContainer>
            <Feed path={path} friendId="" />
          </FeedContainer>
        </>
      ) : (
        <S.Wrapper>
          <img src={LogoIcon} width={50} onClick={() => navigate("/signin")} />
          로그인을 해주세요.
        </S.Wrapper>
      )}
    </S.Container>
  );
};

const WritingContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 35px;
  gap: 15px;
  cursor: pointer;
  background-color: white;
  height: 80px;
  width: 100%;
  margin-bottom: 5px;
`;

const InputDiv = styled.div`
  width: 361px;
  height: 40px;
  border-radius: 20px;
  background: #f3f3f3;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 22px;

  color: #7e7e7e;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default FeedPage;
