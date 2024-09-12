import React from "react";
import FeedBoard from "./FeedShow/FeedBoard";
import * as S from "../../style/GlobalStyle";
import styled from "styled-components";

const FeedDetail = ({ setShowDetail }) => {
  console.log("detail");
  return (
    <S.Container>
      <BtnDiv>
        <CloseButton
          onClick={() => setShowDetail(false)}
          src="/icon/X.svg"
          alt="x"
        />
      </BtnDiv>
      <FeedBoard />
    </S.Container>
  );
};

const BtnDiv = styled.div`
  display: flex;
  background-color: white;
`;

const CloseButton = styled.img`
  margin: 10px 10px 10px auto;
`;

export default FeedDetail;
