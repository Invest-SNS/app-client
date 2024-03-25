import React, { useState } from "react";
import styled from "styled-components";
import * as S from "../../style/GlobalStyle";


import Feed from "../../components/Feed/FeedShow/Feed";
//import Account from "../../components/Feed/Account";


export default function MyPage() {
  const [selectedTab, setSelectedTab] = useState("내 피드");
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  return (
    <S.Container>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "7%",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderBottom:
              selectedTab === "내 피드"
                ? "1.5px solid red"
                : "1.5px solid #D9D9D9",
            fontSize: "0.85rem",
          }}
          onClick={() => handleTabClick("내 피드")}
        >
          내 피드
        </div>
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderBottom:
              selectedTab === "내 종목"
                ? "1.5px solid red"
                : "1.5px solid #D9D9D9",
            fontSize: "0.85rem",
          }}
          onClick={() => handleTabClick("내 종목")}
        >
          내 종목
        </div>
      </div>
      <UserContainer>
        <ImgDiv>
          <img src="/icon/me.svg" alt="유저" />
          <NicknameDiv>양똥개</NicknameDiv>
        </ImgDiv>
        <ColumnDiv>
          <ItemDiv>게시물</ItemDiv>
          <NumDiv>12</NumDiv>
        </ColumnDiv>
        <ColumnDiv $pointer="pointer">
          <ItemDiv>친구</ItemDiv>
          <NumDiv>20</NumDiv>
        </ColumnDiv>
      </UserContainer>
      <ContentContainer>
        {/* {selectedTab === "내 피드" ? <Feed /> : <></>}
        {selectedTab === "내 종목" ? <Account /> : <></>} */}
      </ContentContainer>
    </S.Container>
  );
}

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 35px 40px;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  margin-bottom: 5px;
`;

const ImgDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NicknameDiv = styled.div`
  font-size: 17px;
`;

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  font-size: 20px;

  cursor: ${(props) => props.$pointer || "default"};
`;

const ItemDiv = styled.div``;

const NumDiv = styled.div``;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
