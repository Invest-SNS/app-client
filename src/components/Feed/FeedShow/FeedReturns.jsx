import React from "react";
import FeedLayout from "./FeedLayout";
import styled from "styled-components";
import * as S from "../../../style/GlobalStyle";

const FeedReturns = ({ item, toggleUser }) => {
  return (
    <FeedLayout item={item} toggleUser={toggleUser}>
      <S.BodyWrapper>
        <S.BodyCenter>
          <S.StockWrapper $buy="returns">
            <S.StockDiv $margin="0px">나의 전체 수익률은?</S.StockDiv>
            <ReturnDiv $returns={item.profit}>{item.profit}%</ReturnDiv>
          </S.StockWrapper>
        </S.BodyCenter>
      </S.BodyWrapper>
    </FeedLayout>
  );
};

const ReturnDiv = styled.div`
  margin-left: auto;
  color: ${(props) =>
    parseFloat(props.$returns) >= 0 ? "#ee2f2a" : "#2679ed"};
`;

export default FeedReturns;
