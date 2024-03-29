import React, { useState, useEffect } from "react";
import PriceBook from "../../components/invest/right-bar/OrderManagement/PriceBook";
import OrderBook from "../../components/invest/right-bar/OrderManagement/OrderBook";
import OrderList from "../../components/invest/right-bar/OrderHistory/OrderHistoryList";
import NewIcon from "../../components/invest/right-bar/OrderHistory/NewIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedTab,
  setSelectedPrice,
  setSelectedQuantity,
  setIsNew,
} from "../../store/reducers/Trading/trading";
import { useWebSocket } from "../../lib/hooks/useWebSocket";
import { getLogoFileName, onErrorImg } from "../../util/getLogoFileName";

export default function TradingPage() {
  const dispatch = useDispatch();
  const { selectedTab, disabledPriceInput, isNew } = useSelector(
    (state) => state.trading
  );
  const { nowPrice } = useWebSocket();
  const company = useSelector((state) => state.company.data[1]);

  const handleTabClick = (tab) => {
    dispatch(setSelectedTab(tab));
    dispatch(setSelectedQuantity(0));
    dispatch(setSelectedPrice(nowPrice?.message?.close));

    if (!disabledPriceInput) {
      dispatch(setSelectedPrice(nowPrice?.message?.close));
    }
  };

  return (
    <div
      style={{
        width: "400px",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
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
              company.name,
              company.code
            )}.png`}
            onError={onErrorImg}
            style={{
              width: "30px",
              borderRadius: 100,
              margin: "0px 10px",
            }}
          />
        </div>
        <div>
          <div>{company.name}</div>
          <div style={{ display: "flex", flexDirection: "row", gap: "0.8rem" }}>
            <span style={{ color: "#999999", fontSize: "0.9rem" }}>
              {company.code}
            </span>
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
            position: "relative",
          }}
          onClick={() => {
            handleTabClick("주문내역");
            dispatch(setIsNew(false));
          }}
        >
          주문내역
          {isNew && <NewIcon />}
        </div>
      </div>
      {selectedTab === "매수" || selectedTab === "매도" ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              height: "100%",
              width: "100%",
            }}
          >
            <PriceBook />
            <OrderBook initPrice={nowPrice?.message?.close} />
          </div>
        </>
      ) : (
        <div style={{ height: "80%" }}>
          <OrderList pedingOrderList={[]} filledOrderList={[]} />
        </div>
      )}
    </div>
  );
}
