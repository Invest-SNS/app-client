import React, { useEffect, useState } from "react";
import styled from "styled-components";
import IndicatorDetail from "./IndicatorDetail";
// import chartData from "../../../../public/Json/chartData.json";
import chartData from '../../../Json/chartData.json'
import { useDispatch, useSelector } from "react-redux";
import { setActiveSub, setChartIndi, setDisactiveSub } from "../../../store/reducers/Chart/Indicators/clickIndicators";

const ChartIndicators = ({ onClose }) => {
  const [showDetail, setShowDetail] = useState(
    Array(chartData.length).fill(false)
  );

  const toggleDetail = (index) => {
    setShowDetail((prevShowDetail) => {
      const newShowDetail = [...prevShowDetail];
      newShowDetail[index] = !newShowDetail[index];
      return newShowDetail;
    });
  };

  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.clickIndicator);
  const chartIndi = useSelector((state) => state.clickIndicator.chartIndi);
  // 1️⃣ onChange함수를 사용하여 이벤트 감지, 필요한 값 받아오기
  const onCheckedElement = (checked, item) => {
    if (chartIndi.length < 4) {
      if (checked) {
        dispatch(setActiveSub(item))
        dispatch(setChartIndi([...chartIndi, item]))
      }
    } else {
      if (checked) {
        dispatch(setActiveSub(item))
        dispatch(setChartIndi([...chartIndi.filter((el, idx) => idx !== 0), item]))
        dispatch(setDisactiveSub(chartIndi[0]))
      }
    }

    if (!checked) {
      dispatch(setDisactiveSub(item))
      dispatch(setChartIndi(chartIndi.filter(el => el !== item)))
    }
  };

  return (
    
    <Container>
      <IndicatorsWrapper>
        <IndicatorDiv>차트지표</IndicatorDiv>
        <CloseButton onClick={onClose} src="/icon/X.svg" alt="x" />
      </IndicatorsWrapper>
      <ItemContainer>
        {chartData.map((item, idx) => (
          <ItemWrapper key={item.id}>
            <CheckBox 
              type="checkbox"
              value={item.name}
              checked={isActive[item.name]}
              onChange={e => {
                onCheckedElement(e.target.checked, e.target.value);
              }}
            ></CheckBox>
            <ItemDiv>{item.showName}</ItemDiv>
            <DetailBtn onClick={() => toggleDetail(idx)}>설정</DetailBtn>
            <DetailContainer $showdetail={showDetail[idx]}>
              {showDetail[idx] ? (
                <IndicatorDetail
                  indiType="chart"
                  showName={item.showName}
                  name={item.name}
                  vars={item.vars}
                  onClose={() => toggleDetail(idx)}
                  initialValues={item.vars.map((item) => item.default)}
                />
              ) : (
                <></>
              )}
            </DetailContainer>
          </ItemWrapper>
        ))}
      </ItemContainer>
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

const ItemContainer = styled.div`
  width: 100%;
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
  transform: translateX(${(props) => (props.$showdetail ? "0" : "-100%")});
  transition: transform 0.3s ease;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 999;
`;

export default ChartIndicators;
