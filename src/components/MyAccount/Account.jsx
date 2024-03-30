import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { postMyProfit } from "../../store/reducers/Feed/feed";

const Account = () => {
  const dispatch = useDispatch();
  const myMoney = useSelector((state) => state.order.myMoney);

  const shareProfit = () => {
    const confirmed = window.confirm("전체 수익률을 공유하시겠습니까?");
    if (confirmed) {
      dispatch(postMyProfit(myMoney.wholeUpDownRate));
      window.location.reload();
    }
  };

  return (
    <>
      <UploadDiv onClick={shareProfit}>공유</UploadDiv>
      <AccountContainer>
        <EvaluatedAssetsWrapper>
          <EADiv>총 평가자산</EADiv>
          <EAValue>{myMoney.wholeMoney}원</EAValue>
        </EvaluatedAssetsWrapper>
        <hr style={{ margin: 0 }} />
        <RowDiv>
          <Wrapper>
            <Div>보유현금</Div>
            <ValueDiv>{myMoney.cash}</ValueDiv>
          </Wrapper>
          <Wrapper>
            <Div>전체 평가금</Div>
            <ValueDiv>{myMoney.wholeStockPrice}</ValueDiv>
          </Wrapper>
        </RowDiv>
        <RowDiv>
          <Wrapper>
            <Div>전체 수익금</Div>
            <ValueDiv
              style={{ color: myMoney.wholeUpDown >= 0 ? "#015FFF" : "#F00" }}
            >
              {myMoney.wholeUpDown}
            </ValueDiv>
          </Wrapper>
          <Wrapper>
            <Div>전체 수익률</Div>
            <ValueDiv
              style={{
                color: myMoney.wholeUpDownRate >= 0 ? "#015FFF" : "#F00",
              }}
            >
              {myMoney.wholeUpDownRate}%
            </ValueDiv>
          </Wrapper>
        </RowDiv>
      </AccountContainer>
    </>
  );
};

const UploadDiv = styled.div`
  margin: 10px 20px 0px auto;
  color: gray;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f2f2f2;
  width: 92%;
  border-radius: 5px;
  padding: 15px 10px;
  margin: 10px auto;
`;

const EvaluatedAssetsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  padding: 0px 5px 15px 5px;
`;
const EADiv = styled.div`
  font-size: 16px;
`;
const EAValue = styled.div``;
const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 10px 5px 0px 5px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 50%;
  font-size: 16px;
`;
const Div = styled.div``;
const ValueDiv = styled.div`
  color: ${(props) => props.$color};
`;

export default Account;
