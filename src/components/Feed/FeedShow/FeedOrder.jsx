import React from "react";
import styled from "styled-components";
import * as S from "../../../style/GlobalStyle";

//TODO : 로고 사진 변경
import default_Img from "/icon/+.svg";
const FeedOrder = ({ item }) => {
  console.log("order", item);
  const getLogoFileName = (name, code) => {
    if (name.includes("스팩")) {
      return "SPAC_230706";
    } else if (name.includes("ETN")) {
      return "ETN_230706";
    } else if (
      name.includes("KODEX") ||
      name.includes("KOSEF") ||
      name.includes("KoAct") ||
      name.includes("TIGER") ||
      name.includes("ACE") ||
      name.includes("ARIRANG") ||
      name.includes("합성 H") ||
      name.includes("HANARO") ||
      name.includes("SOL")
    ) {
      return "ETF_230706";
    } else {
      return `kr/${code}`;
    }
  };

  const onErrorImg = (e) => {
    e.target.src = default_Img;
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
