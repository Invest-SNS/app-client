import React from "react";
import styled from "styled-components";
import * as S from "../../../style/GlobalStyle";

const FeedVoteYes = ({ item }) => {
  console.log("voteyes", item);
  const calc = (num) => {
    return Math.round((num / (item.vote.yes + item.vote.no)) * 100);
  };
  return (
    <>
      <S.FeedWrapper>
        <S.UserDiv>
          <S.UserNickname>{item.user.nickname}</S.UserNickname>
          <S.DateDiv>{item.createdAt}</S.DateDiv>
        </S.UserDiv>
        <S.BodyWrapper>
          <S.BodyCenter>
            <S.BodyDiv $weight="550">{item.body}</S.BodyDiv>
            <OXWrapper>
              <OXDiv>
                O<br />
                {calc(item.vote.yes)}%
              </OXDiv>
              <BarDiv>
                <ODiv $width={calc(item.vote.yes)}></ODiv>
                <XDiv $width={calc(item.vote.no)}></XDiv>
              </BarDiv>
              <OXDiv>
                X<br />
                {calc(item.vote.no)}%
              </OXDiv>
            </OXWrapper>
          </S.BodyCenter>
        </S.BodyWrapper>
      </S.FeedWrapper>
    </>
  );
};

const BarDiv = styled.div`
  position: relative;
  width: 250px;
  height: 30px;
`;

const ODiv = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: ${(props) => props.$width}%;
  height: 30px;
  border-radius: 10px 0px 0px 10px;
  background: #bee4ff;
`;

const XDiv = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: ${(props) => props.$width}%;
  height: 30px;
  border-radius: 0px 10px 10px 0px;
  background: #ffe3d7;
`;

const OXWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  margin-top: 5px;
`;

const OXDiv = styled.div`
  text-align: center;
  font-size: 15px;
`;

export default FeedVoteYes;
