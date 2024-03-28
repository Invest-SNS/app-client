import React from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setClickDate } from '../../../store/reducers/Chart/chart';

export default function ButtonContainer({ toggleCharts, toggleIndicators, showCharts, showIndicators, getData }) {
  const dispatch = useDispatch();
  
  return (
    <BtnContainer>
      <Content>
        <IndiBtn check={showCharts.toString()} onClick={toggleCharts}>차트지표</IndiBtn>
        <IndiBtn check={showIndicators.toString()} onClick={toggleIndicators}>보조지표</IndiBtn>
      </Content>
      <Content>
        {/* <button>분</button> */}
        <DateBtn
          id="D"
          onClick={() => {
            getData("D");
            dispatch(setClickDate("D"));
          }}
        >
          일
        </DateBtn>
        <DateBtn
          id="W"
          onClick={() => {
            getData("W");
            dispatch(setClickDate("W"));
          }}
        >
          주
        </DateBtn>
        <DateBtn
          id="M"
          onClick={() => {
            getData("M");
            dispatch(setClickDate("M"));
          }}
        >
          월
        </DateBtn>
        <DateBtn
          id="Y"
          onClick={() => {
            getData("Y");
            dispatch(setClickDate("Y"));
          }}
        >
          년
        </DateBtn>
      </Content>
    </BtnContainer>
  )
}

const Content = styled.div`
  display: flex;
  gap: 6px;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const IndiBtn = styled.button`
  background-color: ${(props) => props.check === "true" ? "#ffe3d7" : "#fff"};
  border: 1px solid #bdbebf;
  border-radius: 999px;
  padding: 5px 15px;
  font-size: 14px;

  &:hover {
    background: #ffe3d7;
  }
`;

const DateBtn = styled.button`
  background-color: #fff;
  border: 1px solid #bdbebf;
  border-radius: 10px;
  padding: 5px 15px;
  font-size: 14px;

  &:hover {
    background: #ffe3d7;
  }
`;
