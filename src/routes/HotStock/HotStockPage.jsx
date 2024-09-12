import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as S from "../../style/GlobalStyle";
import { useDispatch, useSelector } from "react-redux";
import { getHotDatas, getPopularDatas } from "../../store/reducers/Hot/getStockInfo";
import default_Img from "../../../public/icon/+.svg";
import restart_Img from '../../../public/icon/restart.svg';

export default function HotStockPage() {
  const dispatch = useDispatch();

  const popularData = useSelector((state) => state.hot.popularData);
  const hotData = useSelector((state) => state.hot.hotData);
  const [selectNum, setSelectNum] = useState(1);

  useEffect(() => {
    dispatch(getPopularDatas());
    dispatch(getHotDatas(selectNum));
  }, [selectNum])

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
    <S.Container>
      <Container>
        {/* 인기 주식 */}
        <div style={{ padding: '5px 10px 0 10px' }}>
          <TitleDiv>
            <IconImg alt="" src="https://em-content.zobj.net/source/microsoft/379/sparkles_2728.png" />
            <MainFont>실시간 인기 주식</MainFont>
            <IconImg alt="" src="https://em-content.zobj.net/source/microsoft/379/sparkles_2728.png" />
          </TitleDiv>
          {popularData.length > 0 ? (
            popularData.map((item, idx) =>
              <RankDiv key={idx} num={idx}>
                <RankFont>{item.now_rank}위</RankFont>
                <div style={{ display: 'flex', alignItems: 'center' }}>
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
            )
          ) : (
            <ErrorDiv1>
              <ReIcon src={restart_Img} onClick={() => dispatch(getPopularDatas())} />
            </ErrorDiv1>
          )}
        </div>
      
        {/* 핫이슈 종목 */}
        <div style={{ padding: '20px 10px 0 10px' }}>
          <TitleDiv>
            <IconImg alt="" src="https://em-content.zobj.net/source/microsoft/379/fire_1f525.png" />
            <MainFont>핫이슈 종목</MainFont>
            <IconImg alt="" src="https://em-content.zobj.net/source/microsoft/379/fire_1f525.png" />
          </TitleDiv>
          <BtnDiv>
            <SelectBtn num={selectNum} onClick={() => setSelectNum(1)}>거래량</SelectBtn>
            <SelectBtn num={selectNum} onClick={() => setSelectNum(2)}>주가상승률</SelectBtn>
            <SelectBtn num={selectNum} onClick={() => setSelectNum(3)}>외국인순매수</SelectBtn>
            <SelectBtn num={selectNum} onClick={() => setSelectNum(4)}>기관순매수</SelectBtn>
          </BtnDiv>
          {hotData.length > 0 ? (
            hotData.map((item, idx) =>
              <RankDiv key={idx} num={idx}>
                <RankFont>{item.rank}.</RankFont>
                <div style={{ display: 'flex', alignItems: 'center' }}>
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
            )
          ) : (
            <ErrorDiv2>
              <RankFont>조건에 맞는 데이터가 없습니다.</RankFont>
            </ErrorDiv2>
          )}
        </div>
      </Container>
    </S.Container>
  );
}

const Container = styled.div`
  background-color: #FFF;
  height: 100vh;
`

const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 5px;
  gap: 8px;
`

const MainFont = styled.span`
  font-size: 18px;
  font-weight: 700;
`

const IconImg = styled.img`
  width: 35px;
  height: 35px;
`

const RankDiv = styled.div`
  // background-color: ${(props) => props.num % 2 ? "rgba(255, 227, 215, 0.4)" : "rgba(0, 0, 0, 0.03)"};
  display: flex;
  align-items: center;
  padding: 13px 0 13px 20px;
  gap: 10px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  margin-bottom: 8px;
`

const RankFont = styled.span`
  font-size: 16px;
  font-weight: 700;
`

const BtnDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 0 0 20px 0;
`

const SelectBtn = styled.div`
  padding: 8px 15px;
  border-radius: 999px;
  background-color: #D9D9D9;
  font-size: 13px;
  font-weight: 600;

  &:hover{
    cursor: pointer;
  }

  &:nth-child(${(props) => props.num}) {
    background-color: #ffd4c2;
  }
`

const CompanyLogo = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 999px;
  margin-right: 10px;
`;

const ErrorDiv1 = styled.div`
  display: flex;
  padding: 90px 0;
  justify-content: center;
  align-items: center;
`

const ErrorDiv2 = styled.div`
  display: flex;
  padding: 150px 0;
  justify-content: center;
  align-items: center;
`

const ReIcon = styled.img`
  width: 20px;
`
