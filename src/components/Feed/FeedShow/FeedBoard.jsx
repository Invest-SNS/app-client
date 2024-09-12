import React from "react";
import styled from "styled-components";
import * as S from "../../../style/GlobalStyle";

const FeedBoard = ({ item, toggleDetail }) => {
  console.log("board", item);
  return (
    <>
      <S.FeedWrapper onClick={toggleDetail}>
        <S.UserDiv>
          <S.UserNickname>{item.user.nickname}</S.UserNickname>
          <S.DateDiv>{item.createdAt}</S.DateDiv>
        </S.UserDiv>
        <S.BodyWrapper>
          <S.BodyDiv>{item.body}</S.BodyDiv>
          {item.photoUrl ? (
            <a href={item.photoUrl} target="_blank">
              <Img src={item.photoUrl} alt="본문 사진" />
            </a>
          ) : (
            <></>
          )}
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

const Img = styled.img`
  width: 100%;
  /* object-fit: cover; */
`;

export default FeedBoard;
