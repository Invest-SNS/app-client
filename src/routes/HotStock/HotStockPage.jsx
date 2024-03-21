import React, { useState } from "react";
import styled from "styled-components";
import * as S from "../../style/GlobalStyle";

export default function HotStockPage() {
  const [selectedTab, setSelectedTab] = useState("인기 주식");
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <S.Container>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "7%",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderBottom:
              selectedTab === "인기 주식"
                ? "1.5px solid red"
                : "1.5px solid #D9D9D9",
            fontSize: "0.85rem",
          }}
          onClick={() => handleTabClick("인기 주식")}
        >
          인기 주식
        </div>
        <div
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderBottom:
              selectedTab === "핫이슈 종목"
                ? "1.5px solid red"
                : "1.5px solid #D9D9D9",
            fontSize: "0.85rem",
          }}
          onClick={() => handleTabClick("핫이슈 종목")}
        >
          핫이슈 종목
        </div>
      </div>
    </S.Container>
  );
}
