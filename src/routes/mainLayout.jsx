import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import MyNavbar from "../components/MyNavbar";
import MainChart from "../components/invest/chart/MainChart";
import MyStockList from "../components/invest/left-bar/MyStockList";
import styled from "styled-components";
import ChartIndicators from "../components/invest/left-bar/ChartIndicators";
import Indicators from "../components/invest/left-bar/Indicators";

export default function MainLayout() {
  const [showIndicators, setShowIndicators] = useState(false);
  const [showCharts, setShowCharts] = useState(false);

  const toggleIndicators = () => {
    setShowIndicators(!showIndicators);
    setShowCharts(false);
  };

  const toggleCharts = () => {
    setShowCharts(!showCharts);
    setShowIndicators(false);
  };

  return (
    <>
      <MyNavbar />
      <Container>
        <LeftContainer>
          <MyStockList />
          <ContentContainer>
            <ChartsContainer $showcharts={showCharts}>
              {showCharts ? <ChartIndicators onClose={toggleCharts} /> : <></>}
            </ChartsContainer>
            <IndicatorsContainer $showindicators={showIndicators}>
              {showIndicators ? (
                <Indicators onClose={toggleIndicators} />
              ) : (
                <></>
              )}
            </IndicatorsContainer>
          </ContentContainer>
        </LeftContainer>
        <MainChart
          toggleCharts={toggleCharts}
          toggleIndicators={toggleIndicators}
        />
        <Outlet />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  height: calc(100vh - 57px);
  overflow: hidden;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  // flex-grow: 1;
  transition: margin-left 0.3s ease;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
`;

const ChartsContainer = styled.div`
  width: 250px;
  height: 100%;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transform: translateX(${(props) => (props.$showcharts ? "0" : "-100%")});
  transition: transform 0.3s ease;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
`;

const IndicatorsContainer = styled.div`
  width: 250px;
  height: 100%;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transform: translateX(${(props) => (props.$showindicators ? "0" : "-100%")});
  transition: transform 0.3s ease;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
`;
