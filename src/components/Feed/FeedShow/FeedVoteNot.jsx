import React from "react";
import styled from "styled-components";
import * as S from "../../../style/GlobalStyle";

const FeedVoteNot = ({ item }) => {
  console.log("votenot", item);
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
            <ButtonWrapper>
              <VoteBtn color="#bee4ff" $hover="#74c5ff">
                O
              </VoteBtn>
              <VoteBtn color="#FFE3D7" $hover="#ff9a6f">
                X
              </VoteBtn>
            </ButtonWrapper>
          </S.BodyCenter>
        </S.BodyWrapper>
      </S.FeedWrapper>
    </>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 25px;
  margin-top: 5px;
`;

const VoteBtn = styled.button`
  width: 150px;
  height: 44px;
  border: none;
  border-radius: 10px;
  background: ${(props) => props.color};

  color: #fff;
  font-size: 25px;
  font-weight: 600;

  &:hover {
    background: ${(props) => props.$hover};
  }
`;

export default FeedVoteNot;
