import React from "react";
import FeedLayout from "./FeedLayout";
import styled from "styled-components";
import * as S from "../../../style/GlobalStyle";

const FeedBoard = ({ item, toggleUser }) => {
  return (
    <FeedLayout item={item} toggleUser={toggleUser}>
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
    </FeedLayout>
  );
};

const Img = styled.img`
  width: 100%;
`;

export default FeedBoard;
