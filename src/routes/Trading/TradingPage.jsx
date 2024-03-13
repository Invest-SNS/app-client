import React, { useState } from "react";
import MyStockList from "../../components/invest/left-bar/MyStockList";
import styled from "styled-components";
import Indicators from "../../components/invest/left-bar/Indicators";
import ChartIndicators from "../../components/invest/left-bar/ChartIndicators";
import MainChart from '../../components/invest/chart/MainChart';

export default function TradingPage() {
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
    <Container>
      <MyStockList />
      <MainChart />
      {/* <ContentContainer showIndicators={showIndicators} showCharts={showCharts}>
        <Content>
          <button onClick={toggleCharts}>차트지표</button>
          <button onClick={toggleIndicators}>보조지표</button>
          TradingPage
        </Content>
        <ChartsContainer showCharts={showCharts}>
          <ChartIndicators onClose={toggleCharts} />
        </ChartsContainer>
        <IndicatorsContainer showIndicators={showIndicators}>
          <Indicators onClose={toggleIndicators} />
        </IndicatorsContainer>
      </ContentContainer> */}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
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
  transform: translateX(${(props) => (props.showCharts ? "0" : "-100%")});
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
  transform: translateX(${(props) => (props.showIndicators ? "0" : "-100%")});
  transition: transform 0.3s ease;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
`;
