import React from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { setClickDate } from '../../../store/reducers/Chart/chart';

export default function ButtonContainer({ toggleCharts, toggleIndicators, showCharts, showIndicators, getData, clickDate }) {
  const dispatch = useDispatch();
  
  return (
    <BtnContainer>
      <Content>
        <IndiBtn check={showCharts.toString()} onClick={toggleCharts}>차트지표</IndiBtn>
        <IndiBtn check={showIndicators.toString()} onClick={toggleIndicators}>보조지표</IndiBtn>
      </Content>
      <Content>
        {/* <button>분</button> */}
        <IndiBtn
          check={clickDate === "D" ? "true" : "false"}
          onClick={() => {
            getData("D");
            dispatch(setClickDate("D"));
          }}
        >
          일
        </IndiBtn>
        <IndiBtn
          check={clickDate === "W" ? "true" : "false"}
          onClick={() => {
            getData("W");
            dispatch(setClickDate("W"));
          }}
        >
          주
        </IndiBtn>
        <IndiBtn
          check={clickDate === "M" ? "true" : "false"}
          onClick={() => {
            getData("M");
            dispatch(setClickDate("M"));
          }}
        >
          월
        </IndiBtn>
        <IndiBtn
          check={clickDate === "Y" ? "true" : "false"}
          onClick={() => {
            getData("Y");
            dispatch(setClickDate("Y"));
          }}
        >
          년
        </IndiBtn>
      </Content>
    </BtnContainer>
  )
}

const Content = styled.div`
  display: flex;
  gap: 10px;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 20px 0 20px;
`;

const IndiBtn = styled.button`
  background-color: ${(props) => props.check === "true" ? "rgba(255, 125, 117, 0.4)" : "#fff"};
  color: ${(props) => props.check === "true" ? "" : ""};
  border: ${(props) => props.check === "true" ? "1px solid rgba(255, 125, 117, 0.4)" : "1px solid rgba(0, 0, 0, 0.6)"};
  border-radius: 999px;
  padding: 5px 15px;
  font-size: 14px;
  font-weight: 600;

  &:hover {
    background: rgba(255, 125, 117, 0.4);
    border: 1px solid rgba(255, 125, 117, 0.4);
  }
`;

