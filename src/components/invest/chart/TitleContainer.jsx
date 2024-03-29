import React from 'react'
import styled from 'styled-components';
import KospiContent from './KospiContent';
import { CaretDownFill, CaretUpFill } from 'react-bootstrap-icons';
import {getLogoFileName, onErrorImg} from "~/util/getLogoFileName";

export default function TitleContainer({ nowPrice, company, upNum, dataList }) {

  // 장이 열려있을 때, 현재가 대비 종가 등락
  const nowRate = upNum / parseFloat(dataList[dataList.length - 2].close) * 100;

  // 장이 마감됐을 때, 전일 대비 종가 등락
  const upDown = parseFloat(dataList[dataList.length - 1].close) - parseFloat(dataList[dataList.length - 2].close)
  const close = dataList[dataList.length - 1].close.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const stockRate = upDown / parseFloat(dataList[dataList.length - 2].close) * 100;

  return (
    <MainContainer>
      <SubContainer>
        <CompanyContainer>
          <CompanyLogo
            src={`https://file.alphasquare.co.kr/media/images/stock_logo/${getLogoFileName(
              company.name,
              company.code
            )}.png`}
            onError={onErrorImg}
          />
          <FontContainer>
            <MainFont>{company.name}</MainFont>
            <SubFont>
              {company.code}&nbsp; {company.market}
            </SubFont>
          </FontContainer>
        </CompanyContainer>
        <StockInfo>
          {/* 실시간 데이터가 있을 때 (장이 열려있을 때) */}
          {nowPrice?.message ? (
            <>
              <StockFont num={upNum}>{nowPrice?.message.close.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</StockFont>
              <StockDiv>
                {upNum > 0 ?
                  <CaretUpFill color="#c70606" />
                : upNum < 0 ? 
                  <CaretDownFill color="#0636c7" />
                : null
                }
                <StockFont2 num={upNum}>{upNum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</StockFont2>
                <StockFont2 num={nowRate}>(</StockFont2>
                {nowRate > 0 && (
                  <StockFont2 num={nowRate}>+</StockFont2>
                )}
                <StockFont2 num={nowRate}>{nowRate.toFixed(2)}%)</StockFont2>
              </StockDiv>
            </>
          ) : (
            <>
              <StockFont num={upDown}>{close}</StockFont>
              <StockDiv>
                {upDown > 0 ?
                  <CaretUpFill color="#c70606" />
                : upDown < 0 ? 
                  <CaretDownFill color="#0636c7" />
                : null
                }
                <StockFont2 num={upDown}>{upDown.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</StockFont2>
                <StockFont2 num={stockRate}>(</StockFont2>
                {stockRate > 0 && (
                  <StockFont2 num={stockRate}>+</StockFont2>
                )}
                <StockFont2 num={stockRate}>{stockRate.toFixed(2)}%)</StockFont2>
              </StockDiv>
            </>
          )}
        </StockInfo>
      </SubContainer>
      <KospiContent />
    </MainContainer>
  )
}

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  justify-content: space-between;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1)
`

const SubContainer = styled.div`
  display: flex;
  gap: 20px;
`

const CompanyContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 5px;
`;

const CompanyLogo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 999px;
  margin-right: 10px;
`;

const StockInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

const StockDiv = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  gap: 5px;
`

const StockFont = styled.span`
  padding-right: 15px;
  font-size: 20px;

  color: ${(props) => props.num > 0 ? "#c70606" : props.num < 0 ? "#0636c7" : "#000"};
`

const StockFont2 = styled.span`
  color: ${(props) => props.num > 0 ? "#c70606" : props.num < 0 ? "#0636c7" : "#000"};
`

const FontContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MainFont = styled.span`
  font-weight: 700;
`;

const SubFont = styled.span`
  font-size: 12px;
`;
