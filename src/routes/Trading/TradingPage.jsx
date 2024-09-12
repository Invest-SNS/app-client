import React, { useState, useEffect } from "react";
import styled from "styled-components";
import default_Img from "../../../public/icon/+.svg";
import PriceBook from "../../components/invest/right-bar/OrderManagement/PriceBook";
import OrderBook from "../../components/invest/right-bar/OrderManagement/OrderBook";
import OrderList from "../../components/invest/right-bar/OrderHistory/OrderHistoryList";
import NewIcon from "../../components/invest/right-bar/OrderHistory/NewIcon";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedTab } from "../../store/reducers/Trading/trading";

export default function TradingPage() {
  const dispatch = useDispatch();
  const { selectedTab } = useSelector((state) => state.trading);

  const handleTabClick = (tab) => {
    dispatch(setSelectedTab(tab));
  };

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

  const Container = styled.div`
    width: 400px;
    height: 100%;
    position: relative;
    overflow: hidden;
  `;

  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "2rem 0.5rem",
          alignItems: "center",
          height: "10%",
          width: "100%",
        }}
      >
        <div>
          <img
            src={`https://file.alphasquare.co.kr/media/images/stock_logo/${getLogoFileName(
              "삼성전자",
              "005930"
            )}.png`}
            style={{
              width: "30px",
              borderRadius: 100,
              margin: "0px 10px",
            }}
            onError={onErrorImg}
          />
        </div>
        <div>
          <div>삼성전자</div>
          <div style={{ display: "flex", flexDirection: "row", gap: "0.8rem" }}>
            <span style={{ color: "#999999", fontSize: "0.9rem" }}>005930</span>
            <span style={{ color: "#999999", fontSize: "0.9rem" }}>코스피</span>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          height: "5%",
        }}
      >
        <div
          style={{
            width: "33.3%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderBottom:
              selectedTab === "매수"
                ? "1.5px solid red"
                : "1.5px solid #D9D9D9",
            fontSize: "0.85rem",
            cursor: "pointer",
          }}
          onClick={() => handleTabClick("매수")}
        >
          매수
        </div>
        <div
          style={{
            width: "33.3%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderBottom:
              selectedTab === "매도"
                ? "1.5px solid red"
                : "1.5px solid #D9D9D9",
            fontSize: "0.85rem",
            cursor: "pointer",
          }}
          onClick={() => handleTabClick("매도")}
        >
          매도
        </div>
        <div
          style={{
            width: "33.3%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderBottom:
              selectedTab === "주문내역"
                ? "1.5px solid red"
                : "1.5px solid #D9D9D9",
            fontSize: "0.85rem",
            cursor: "pointer",
          }}
          onClick={() => handleTabClick("주문내역")}
        >
          주문내역
          <NewIcon />
        </div>
      </div>
      {selectedTab === "매수" || selectedTab === "매도" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            width: "100%",
          }}
        >
          <PriceBook />
          {/* <OrderBook /> */}
        </div>
      ) : (
        <></>
        // <div style={{ height: "80%" }}>
        //   <OrderList
        //     pedingOrderList={pendingOrders}
        //     filledOrderList={filledOrders}
        //   />
        // </div>
      )}
    </Container>
  );
}
