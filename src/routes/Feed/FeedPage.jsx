import React, { useState } from "react";
import styled from "styled-components";
import * as S from "../../style/GlobalStyle";

import FeedWriting from "~/components/Feed/FeedWriting";
import Feed from "../../components/Feed/FeedShow/Feed";

const FeedPage = () => {
  const [isWrite, setIsWrite] = useState(false);

  const write = () => {
    setIsWrite(true);
  };

  const getLogoFileName = (name, code) => {
    if (name.includes("스팩")) {
      return "SPAC_230706";
    } else if (name.includes("ETN")) {
      return "ETN_230706";
    } else if (
      name.includes("KODEX") ||
      name.includes("KOSEF") ||
      name.includes("KoAct") ||
      name.includes("TIGER") ||
      name.includes("ACE") ||
      name.includes("ARIRANG") ||
      name.includes("합성 H") ||
      name.includes("HANARO") ||
      name.includes("SOL")
    ) {
      return "ETF_230706";
    } else {
      return `kr/${code}`;
    }
  };

  const onErrorImg = (e) => {
    e.target.src = default_Img;
  };

  return (
    <S.Container>
      {isWrite ? (
        <FeedWriting setIsWrite={setIsWrite} />
      ) : (
        <WritingContainer onClick={write}>
          <img src="/icon/user.svg" alt="프로필" style={{ width: "45px" }} />
          <InputDiv>무슨 생각을 하고 계신가요?</InputDiv>
        </WritingContainer>
      )}
      <FeedContainer>
        <Feed />
      </FeedContainer>
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
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default FeedPage;
