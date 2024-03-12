import React, { useState } from "react";
import styled from "styled-components";
import IndicatorDetail from "./IndicatorDetail";

const ChartIndicators = ({ onClose }) => {
  const [showDetail, setShowDetail] = useState(false);
  const toggleDetail = () => {
    setShowDetail(!showDetail);
  };

  const chartJson = [
    {
      id: 0,
      name: "SMA",
      showName: "단순 이동평균선",
      var: ["lineTime"],
    },
    { id: 1, name: "WMA", showName: "가중 이동평균선", var: ["lineTime"] },
    {
      id: 2,
      name: "BBANDS",
      showName: "볼린저밴드",
      var: ["lineTime", "stdev"],
    },
  ];

  return (
    <Container>
      <IndicatorsWrapper>
        <IndicatorDiv>차트지표</IndicatorDiv>
        <CloseButton onClick={onClose} src="/icon/X.svg" alt="x" />
      </IndicatorsWrapper>
      <ItemWrapper>
        <CheckBox type="checkbox"></CheckBox>
        <ItemDiv>이동평균선</ItemDiv>
        <DetailBtn onClick={toggleDetail}>설정</DetailBtn>
      </ItemWrapper>
      <DetailContainer showDetail={showDetail}>
        <IndicatorDetail onClose={toggleDetail} />
      </DetailContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.img`
  position: absolute;
  right: 10px;
  top: 8px;
  width: 25px;
  cursor: pointer;
`;

const IndicatorsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom: 1px solid #c9c9c9;
  justify-content: center;
`;

const IndicatorDiv = styled.div`
  color: #000;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const ItemWrapper = styled.div`
  display: flex;
  height: 45px;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid #c9c9c9;
  padding-right: 10px;
`;

const CheckBox = styled.input`
  position: relative;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  margin: 0px 10px;
  width: 20px;
  height: 20px;
  border: 1.5px solid gainsboro;
  border-radius: 5px;
  background-color: white;
  transition: background-color 0.3s, border-color 0.3s;

  &:checked {
    border-color: transparent;
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: black;

    &::before {
      content: "✓";
      font-size: 14px;
      color: white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

const ItemDiv = styled.div``;

const DetailBtn = styled.button`
  margin-left: auto;
  background: none;
  border: 1px solid black;
  border-radius: 100px;

  &:hover {
    border: 1px solid black;
    background-color: black;
    color: white;
  }
`;

const DetailContainer = styled.div`
  width: 250px;
  height: 100%;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transform: translateX(${(props) => (props.showDetail ? "0" : "-100%")});
  transition: transform 0.3s ease;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
`;

export default ChartIndicators;
