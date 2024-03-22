import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as S from "../../style/GlobalStyle";
import { useDispatch, useSelector } from "react-redux";
import { getHotDatas, getPopularDatas } from "../../store/reducers/Hot/getStockInfo";
import default_Img from "../../../public/icon/+.svg";

export default function HotStockPage() {
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState("인기 주식");
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const popularData = useSelector((state) => state.hot.popularData);
  const hotData = useSelector((state) => state.hot.hotData);
  const [selectNum, setSelectNum] = useState(1);

  console.log('hotData', hotData)

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
        <div>
          <TitleDiv>
            <IconImg alt="" src="https://em-content.zobj.net/source/microsoft/379/sparkles_2728.png" />
            <MainFont>인기 주식</MainFont>
            <IconImg alt="" src="https://em-content.zobj.net/source/microsoft/379/sparkles_2728.png" />
          </TitleDiv>
          {popularData.map((item, idx) =>
            <RankDiv key={idx}>
              <RankFont>{item.now_rank}.</RankFont>
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
          )}
        </div>
      
        {/* 핫이슈 종목 */}
        <div style={{ paddingTop: '35px' }}>
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
          {hotData.map((item, idx) =>
            <RankDiv key={idx}>
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
  // justify-content: center;
  padding: 15px 0 15px 20px;
  gap: 8px;
`

const MainFont = styled.span`
  font-size: 18px;
  font-weight: 700;
`

const IconImg = styled.img`
  width: 45px;
  height: 45px;
`

const RankDiv = styled.div`
  display: flex;
  align-items: center;
  // justify-content: center;
  padding: 15px 0 15px 20px;
  gap: 10px;
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
    background-color: #FFE3D7;
  }
`
const CompanyLogo = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 999px;
  margin-right: 10px;
`;
