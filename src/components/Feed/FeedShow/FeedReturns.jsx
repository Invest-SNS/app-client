import React from "react";
import styled from "styled-components";
import * as S from "../../../style/GlobalStyle";

const FeedReturns = ({ item }) => {
  console.log("profit", item);
  return (
    <>
      <S.FeedWrapper>
        <S.UserDiv>
          <S.UserNickname>{item.user.nickname}</S.UserNickname>
          <S.DateDiv>{item.createdAt}</S.DateDiv>
        </S.UserDiv>
        <S.BodyWrapper>
          <S.BodyCenter>
            <S.StockWrapper $buy="returns">
              <S.StockDiv $margin="0px">나의 전체 수익률은?</S.StockDiv>
              <ReturnDiv $returns={item.profit}>{item.profit}</ReturnDiv>
            </S.StockWrapper>
          </S.BodyCenter>
        </S.BodyWrapper>
        <S.BottomWrapper>
          <S.IconDiv>
            <img
              src="/icon/Heart.svg"
              alt="좋아요"
              style={{ width: "25px", marginRight: "8px" }}
            />
            <div>{item.like}</div>
          </S.IconDiv>
          <S.IconDiv>
            <img
              src="/icon/Comment.svg"
              alt="댓글"
              style={{ width: "30px", marginRight: "5px" }}
            />
            <div>7</div>
          </S.IconDiv>
        </S.BottomWrapper>
      </S.FeedWrapper>
    </>
  );
};

const ReturnDiv = styled.div`
  margin-left: auto;
  color: ${(props) =>
    parseFloat(props.$returns) >= 0 ? "#ee2f2a" : "#2679ed"};
`;

export default FeedReturns;
