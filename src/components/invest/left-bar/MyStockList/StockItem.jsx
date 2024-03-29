import React from "react";
import styled from "styled-components";
import { getLogoFileName, onErrorImg } from "../../../../util/getLogoFileName";
import { getCookie } from "../../../../lib/apis/cookie";
import { useDispatch } from "react-redux";
import { setClickCompany } from "../../../../store/reducers/Chart/clickCompany";

const StockItem = ({ myFavoriteArr, addToFavorites }) => {
  const dispatch = useDispatch();
  const isLogin = !!getCookie("token");
  return (
    <MyListContainer>
      {isLogin &&
        myFavoriteArr?.map((item, idx) => (
          <MyListDiv
            key={item.code}
            onClick={() => {
              dispatch(setClickCompany(item));
            }}
          >
            <ImgDiv>
              <img
                src={`https://file.alphasquare.co.kr/media/images/stock_logo/${getLogoFileName(
                  item.name,
                  item.code
                )}.png`}
                style={{
                  width: "30px",
                  borderRadius: 100,
                  margin: "0px 10px",
                }}
                onError={onErrorImg}
              />
            </ImgDiv>
            <StockDiv>
              <StockName>{item.name}</StockName>
              <RowDiv>
                <StockCode>{item.code}</StockCode>
                <StockIndex>{item.market}</StockIndex>
              </RowDiv>
            </StockDiv>
            <StarImg
              onClick={() => addToFavorites(item)}
              src="/icon/FilledStar.svg"
              alt="filledstar"
              $hover="hover"
            />
          </MyListDiv>
        ))}
    </MyListContainer>
  );
};

const MyListContainer = styled.div`
  overflow: auto;
  height: calc(100vh - 145px);
  padding-bottom: 5px;
  background-color: white;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const MyListDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 10px;
  text-align: left;
  min-height: 60px;
  width: 249px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  margin: 0px 10px;
`;

const StockDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;
const StockName = styled.div`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  word-break: break-all;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  color: #8c8c8c;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const StockCode = styled.div`
  margin-right: 3px;
`;

const StockIndex = styled.div``;

const StarImg = styled.img`
  &:hover {
    transform: ${(props) =>
      props.$hover == "hover" ? `scale(1.5)` : "scale(1)"};
  }
`;

export default StockItem;
