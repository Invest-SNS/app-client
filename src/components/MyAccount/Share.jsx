import React from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { getLogoFileName, onErrorImg } from "~/util/getLogoFileName";

// TODO : item.name 확인하기
const Share = () => {
  const mystocks = useSelector((state) => state.order.mystocks);

  return (
    <Container>
      <div style={{ marginRight: "auto", marginLeft: "15px" }}>보유 종목</div>
      <ShareContainer>
        {mystocks?.map((item, idx) => (
          <ShareItem key={item.code}>
            <RowDiv>
              <img
                src={`https://file.alphasquare.co.kr/media/images/stock_logo/${getLogoFileName(
                  item.name,
                  item.code
                )}.png`}
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: 100,
                  marginRight: 10,
                }}
                onError={onErrorImg}
              />
              <ColumnDiv>
                <NameDiv>{item.name} </NameDiv>
                <QuantityDiv>{item.amount}주</QuantityDiv>
              </ColumnDiv>
            </RowDiv>
            <ColumnDiv>
              <ProfitDiv>{item.whole}원</ProfitDiv>
              <RowDiv>
                <CurrentDiv $color={item.upDownRate >= 0 ? "#015FFF" : "#F00"}>
                  {item.price}원&nbsp;
                </CurrentDiv>
                <ReturnRateDiv
                  $color={item.upDownRate >= 0 ? "#015FFF" : "#F00"}
                >
                  ({item.upDownRate}%)
                </ReturnRateDiv>
              </RowDiv>
            </ColumnDiv>
          </ShareItem>
        ))}
      </ShareContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ShareContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 550px);
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ShareItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 7px 15px;
`;

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NameDiv = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

const QuantityDiv = styled.div`
  color: #8c8c8c;
  font-size: 12px;
  font-weight: 400;
`;

const ProfitDiv = styled.div`
  text-align: right;
  font-size: 16px;
  font-weight: 700;
`;

const CurrentDiv = styled.div`
  color: ${(props) => props.$color};
  font-size: 16px;
  font-weight: 400;
`;

const ReturnRateDiv = styled.div`
  color: ${(props) => props.$color};
  font-size: 16px;
  font-weight: 400;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export default Share;
