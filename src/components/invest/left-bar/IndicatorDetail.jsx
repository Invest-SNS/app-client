import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import * as chartValuesModule from "../../../store/reducers/Trading/chartValues";
import * as indicatorValuesModule from "../../../store/reducers/Trading/indicatorValues";
import { setChartDatas } from "../../../store/reducers/Chart/chart";

const IndicatorDetail = ({
  indiType,
  showName,
  name,
  vars,
  onClose,
  initialValues,
}) => {
  const dispatch = useDispatch();

  let setValuesReducer;
  if (indiType === "chart") {
    setValuesReducer = chartValuesModule;
  } else if (indiType === "indi") {
    setValuesReducer = indicatorValuesModule;
  }
  const { setValues } = setValuesReducer;

  const values = useSelector((state) => {
    if (indiType === "chart") {
      return state.chartValues.values[name];
    } else if (indiType === "indi") {
      return state.indicatorValues.values[name];
    }
  });

  const decreaseValue = (idx) => {
    const newValues = [...values];
    if (newValues[idx] > vars[idx].min) {
      newValues[idx] = Math.round((newValues[idx] - vars[idx].val) * 100) / 100;
      const payload = { [name]: newValues };
      dispatch(setValues(payload));
    }
  };

  const increaseValue = (idx) => {
    const newValues = [...values];
    if (newValues[idx] < vars[idx].max) {
      newValues[idx] = Math.round((newValues[idx] + vars[idx].val) * 100) / 100;
      const payload = { [name]: newValues };
      dispatch(setValues(payload));
    }
  };

  return (
    <Container>
      <IndicatorsWrapper>
        <IndicatorDiv>{showName}</IndicatorDiv>
        <CloseButton onClick={onClose} src="/icon/X.svg" alt="x" />
      </IndicatorsWrapper>
      <ItemContainer>
        {values.length !== 0 ? (
          <RowDiv>
            <VarDiv>변수 설정</VarDiv>
            <ResetBtn
              onClick={() => {
                const payload = { [name]: initialValues };
                dispatch(setValues(payload));
              }}
            >
              초기화
            </ResetBtn>
          </RowDiv>
        ) : (
          <IndicatorDiv style={{ color: "gray" }}>
            변수가 없습니다.
          </IndicatorDiv>
        )}
        {vars.map((item, idx) => (
          <ItemWrapper key={item.id}>
            <ItemDiv>{item.name}</ItemDiv>
            <ValueContainer>
              <Btn
                onClick={() => {
                  decreaseValue(idx);
                }}
              >
                <Img1 src="/icon/-.svg" alt="-" />
                <Img2 src="/icon/-White.svg" alt="-" />
              </Btn>
              <VarInput
                type="number"
                value={values[idx] || ""}
                min={item.min}
                max={item.max}
                step={item.val}
                onChange={(e) => {
                  const newValue =
                    e.target.value.trim() === ""
                      ? ""
                      : parseFloat(e.target.value);
                  const newValues = [...values];
                  newValues[idx] = newValue;
                  const payload = { [name]: newValues };
                  dispatch(setValues(payload));
                }}
                onBlur={(e) => {
                  const newValue =
                    e.target.value.trim() === ""
                      ? item.default
                      : parseFloat(e.target.value);
                  const newValues = [...values];
                  newValues[idx] = newValue;
                  const payload = { [name]: newValues };
                  dispatch(setValues(payload));
                }}
              />
              <Btn
                onClick={() => {
                  increaseValue(idx);
                }}
              >
                <Img1 src="/icon/+.svg" alt="+" />
                <Img2 src="/icon/+White.svg" alt="+" />
              </Btn>
            </ValueContainer>
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

const RowDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 10px 0px 0px;
`;

const VarDiv = styled.div`
  width: 100%;
  margin-left: 10px;
  font-size: 14px;
  color: gray;
`;

const ResetBtn = styled.button`
  background: none;
  font-size: 14px;
  width: 80px;
  height: 30px;
  box-sizing: border-box;
  border: none;
  color: gray;
  &:hover {
    background-color: #ececec;
    color: black;
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  height: 50px;
  width: 100%;
  align-items: center;
  border-bottom: 1px solid #c9c9c9;
  padding-right: 10px;
  justify-content: space-between;
`;

const ItemDiv = styled.div`
  margin-left: 10px;
  font-size: 17px;
`;

const ValueContainer = styled.div`
  display: flex;
  align-items: center;
`;

const VarInput = styled.input`
  width: 80px;
  margin: 0 5px;
  padding: 2px 9px;
  font-size: 17px;
  border: 0.5px solid black;

  /* 화살표 숨기기 */
  -webkit-appearance: none;
  -moz-appearance: textfield;
  appearance: none;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Img1 = styled.img`
  width: 12px;
`;

const Img2 = styled.img`
  width: 12px;
  display: none;
`;

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  background: none;
  border: 1px solid black;
  border-radius: 100px;
  text-align: center;

  &:hover {
    background-color: black;
    border: 1px solid black;
  }

  &:hover > ${Img2} {
    display: block;
  }

  &:hover > ${Img1} {
    display: none;
  }
`;

export default IndicatorDetail;
