import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as S from "../../style/GlobalStyle";
import { useDispatch, useSelector } from "react-redux";
import { getHotDatas, getPopularDatas } from "../../store/reducers/Hot/getStockInfo";
import restart_Img from '../../../public/icon/restart.svg';
import { PuffLoader } from "react-spinners";
import PopularStock from "../../components/side-bar/PopularStock";

export default function HotStockPage() {
  const dispatch = useDispatch();

  const popularData = useSelector((state) => state.hot.popularData);
  const hotData = useSelector((state) => state.hot.hotData);
  const loading = useSelector((state) => state.hot.loading);
  const [selectNum, setSelectNum] = useState(1);

  useEffect(() => {
    dispatch(getPopularDatas());
    dispatch(getHotDatas(selectNum));
  }, [selectNum])

  return (
    <S.Container>
      <Container>
        {/* 인기 주식 */}
        <div style={{ padding: '0 10px' }}>
          <TitleDiv>
            <IconImg alt="" src="https://em-content.zobj.net/source/microsoft/379/sparkles_2728.png" />
            <MainFont>실시간 인기 주식</MainFont>
            <IconImg alt="" src="https://em-content.zobj.net/source/microsoft/379/sparkles_2728.png" />
          </TitleDiv>
          {popularData.length > 0 ? (
            popularData.map((item, idx) =>
              <PopularStock 
                key={idx}
                idx={idx}
                item={item}
              />
            )
          ) : (
            <ErrorDiv1>
              <ReIcon src={restart_Img} onClick={() => dispatch(getPopularDatas())} />
            </ErrorDiv1>
          )}
        </div>
      
        {/* 핫이슈 종목 */}
        <div style={{ padding: '15px 10px 0 10px' }}>
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
          {loading ? (
            <div style={{ height: '36vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PuffLoader color="#FF7D75" />
            </div>
          ) : (
            hotData.length > 0 ? (
              hotData.map((item, idx) =>
                <PopularStock
                  key={idx}
                  idx={idx}
                  item={item}
                />
              )
            ) : (
              <ErrorDiv2>
                <RankFont>조건에 맞는 데이터가 없습니다.</RankFont>
              </ErrorDiv2>
            )
          )}
        </div>
      </Container>
    </S.Container>
  );
}

const Container = styled.div`
  background-color: #FFF;
  height: 100vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 20px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 20px;
  }
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
