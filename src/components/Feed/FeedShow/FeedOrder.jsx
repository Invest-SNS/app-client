import React from "react";
import FeedLayout from "./FeedLayout";
import styled from "styled-components";
import * as S from "../../../style/GlobalStyle";
import { getLogoFileName } from "~/util/getLogoFileName";
import { onErrorImg } from "~/util/getLogoFileName";

const FeedOrder = ({ item, toggleUser }) => {
  console.log("order", item);
  const order = item.order.buyOrSell == "buy" ? "매수" : "매도";
  return (
    <FeedLayout item={item} toggleUser={toggleUser}>
      <S.BodyWrapper>
        <S.BodyCenter>
          <S.StockWrapper $buy="sell">
            <img
              src={`https://file.alphasquare.co.kr/media/images/stock_logo/${getLogoFileName(
                item.order.name,
                item.order.code
              )}.png`}
              style={{
                width: "30px",
                borderRadius: 100,
              }}
              onError={onErrorImg}
            />
            <S.StockDiv>{item.order.name}</S.StockDiv>
            <QuantityDiv>{item.order.quantity}</QuantityDiv>
            <OrderDiv>{order}</OrderDiv>
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
