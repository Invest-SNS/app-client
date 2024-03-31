import React from "react";
import styled from "styled-components";
import { getLogoFileName } from "~/util/getLogoFileName";
import { onErrorImg } from "~/util/getLogoFileName";

export default function PopularStock({ idx, item }) {
  return (
    <RankDiv key={idx} num={idx}>
      <RankFont>{idx + 1}위</RankFont>
      <div style={{ display: "flex", alignItems: "center" }}>
        <CompanyLogo
          src={`https://file.alphasquare.co.kr/media/images/stock_logo/${getLogoFileName(
            item.stbd_nm,
            item.stock_code
          )}.png`}
          onError={onErrorImg}
        />
        <RankFont>{item.stbd_nm}</RankFont>
      </div>
    </RankDiv>
  );
}

const RankDiv = styled.div`
  background-color: ${(props) =>
    props.num % 2 ? "rgba(255, 227, 215, 0.4)" : "rgba(0, 0, 0, 0.03)"};
  display: flex;
  align-items: center;
  padding: 13px 0 13px 20px;
  gap: 10px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  margin-bottom: 8px;
`;

const RankFont = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

const CompanyLogo = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 999px;
  margin-right: 10px;
`;
