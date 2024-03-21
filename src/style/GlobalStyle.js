import styled from "styled-components";

// Sidebar
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: #f3f3f3;
`;

// FeedShow
export const FeedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-bottom: 5px;
`;

export const UserDiv = styled.div`
  margin: 20px 25px 0px 25px;
`;

export const UserNickname = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 5px;
`;

export const DateDiv = styled.div`
  color: #c1c1c1;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

export const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 25px 0px 25px;
`;

export const BodyCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const BodyDiv = styled.div`
  margin-bottom: 15px;
  font-weight: ${(props) => props.$weight || "400"};
`;

export const BottomWrapper = styled.div`
  display: flex;
  margin: 20px 25px 0px 25px;
  padding: 15px 0px;
  border-top: 1px solid #dadada;
  gap: 20px;
`;

export const IconDiv = styled.div`
  display: flex;
  align-items: center;
`;

export const StockWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 95%;
  padding: 11px 22px;
  border-radius: 10px;
  background-color: ${(props) =>
    props.$buy === "sell"
      ? "#FFE3D7"
      : props.$buy === "returns"
      ? "#EFEFEF"
      : "#BEE4FF"};
`;

export const StockDiv = styled.div`
  margin-left: ${(props) => props.$margin || "10px"};
  color: #000;
  font-size: 17px;
  font-style: normal;
  font-weight: 550;
`;
