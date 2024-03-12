import React from "react";
import styled from "styled-components";

const Indicators = ({ onClose }) => {
  return (
    <Container>
      <IndicatorsWrapper>
        <IndicatorDiv>보조지표</IndicatorDiv>
        <CloseButton onClick={onClose} src="/icon/X.svg" alt="x" />
      </IndicatorsWrapper>
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
export default Indicators;
