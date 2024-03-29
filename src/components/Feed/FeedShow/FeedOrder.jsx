import React from "react";
import FeedLayout from "./FeedLayout";
import styled from "styled-components";
import * as S from "../../../style/GlobalStyle";
import { getLogoFileName } from "~/util/getLogoFileName";
import { onErrorImg } from "~/util/getLogoFileName";

// TODO : 공유 후 수정
const FeedOrder = ({ item, toggleUser }) => {
  return (
    <FeedLayout item={item} toggleUser={toggleUser}>
      <S.BodyWrapper>
        <S.BodyCenter>
          <S.StockWrapper $buy="sell">
            <img
              src={`https://file.alphasquare.co.kr/media/images/stock_logo/${getLogoFileName(
                "삼성생명",
                "032830"
              )}.png`}
              style={{
                width: "30px",
                borderRadius: 100,
              }}
              onError={onErrorImg}
            />
            <S.StockDiv>삼성생명</S.StockDiv>
            <QuantityDiv>10주</QuantityDiv>
            <OrderDiv>매수</OrderDiv>
          </S.StockWrapper>
        </S.BodyCenter>
      </S.BodyWrapper>
    </FeedLayout>
  );
};

const QuantityDiv = styled.div`
  margin-left: 7px;
  color: #000;
  font-size: 16px;
  font-weight: 500;
`;

const OrderDiv = styled.div`
  margin-left: 7px;
  color: #000;
  font-size: 16px;
  font-weight: 500;
`;

export default FeedOrder;
