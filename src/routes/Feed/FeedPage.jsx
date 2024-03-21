import React, { useState } from "react";
import styled from "styled-components";
import FeedWriting from "../../components/Feed/FeedWriting";

//TODO : 로고 사진 변경
import default_Img from "/icon/+.svg";

const FeedPage = () => {
  const [isWrite, setIsWrite] = useState(false);

  const write = () => {
    setIsWrite(true);
  };

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
    <Container>
      {isWrite ? (
        <FeedWriting setIsWrite={setIsWrite} />
      ) : (
        <WritingContainer onClick={write}>
          <img src="/icon/user.svg" alt="프로필" style={{ width: "45px" }} />
          <InputDiv>무슨 생각을 하고 계신가요?</InputDiv>
        </WritingContainer>
      )}
      <FeedContainer>
        <FeedWrapper>
          <UserDiv>
            <UserNickname>게시글 쓰는 미나리</UserNickname>
            <DateDiv>2024.03.08</DateDiv>
          </UserDiv>
          <BodyWrapper>
            <BodyDiv>
              저번주 공시인데 괜찮아 보이네요! 시가배당률도 매년 올라가고 있어서
              눈여겨 보는 중입니다.
            </BodyDiv>
            <Img src="/icon/test.png" alt="본문 사진" />
          </BodyWrapper>
          <BottomWrapper>
            <IconDiv>
              <img
                src="/icon/Heart.svg"
                alt="좋아요"
                style={{ width: "25px", marginRight: "8px" }}
              />
              <Div>3</Div>
            </IconDiv>
            <IconDiv>
              <img
                src="/icon/Comment.svg"
                alt="댓글"
                style={{ width: "30px", marginRight: "5px" }}
              />
              <Div>7</Div>
            </IconDiv>
          </BottomWrapper>
        </FeedWrapper>
        <FeedWrapper>
          <UserDiv>
            <UserNickname>매수한 미나리</UserNickname>
            <DateDiv>2024.03.08</DateDiv>
          </UserDiv>
          <BodyWrapper>
            <StockWrapper $buy="sell">
              <img
                src={`https://file.alphasquare.co.kr/media/images/stock_logo/${getLogoFileName(
                  "삼성생명",
                  "032830"
                )}.png`}
                style={{
                  width: "30px",
                  borderRadius: 100,
                }}
                onError={onErrorImg}
              />
              <StockDiv>삼성생명</StockDiv>
              <QuantityDiv>10주</QuantityDiv>
              <OrderDiv>매수</OrderDiv>
            </StockWrapper>
          </BodyWrapper>
          <BottomWrapper>
            <IconDiv>
              <img
                src="/icon/Heart.svg"
                alt="좋아요"
                style={{ width: "25px", marginRight: "8px" }}
              />
              <Div>3</Div>
            </IconDiv>
            <IconDiv>
              <img
                src="/icon/Comment.svg"
                alt="댓글"
                style={{ width: "30px", marginRight: "5px" }}
              />
              <Div>7</Div>
            </IconDiv>
          </BottomWrapper>
        </FeedWrapper>
        <FeedWrapper>
          <UserDiv>
            <UserNickname>수익률 공유한 미나리</UserNickname>
            <DateDiv>2024.03.08</DateDiv>
          </UserDiv>
          <BodyWrapper>
            <StockWrapper $buy="returns">
              <StockDiv $margin="0px">나의 전체 수익률은?</StockDiv>
              <ReturnDiv $returns="0.01">0.01%</ReturnDiv>
            </StockWrapper>
          </BodyWrapper>
          <BottomWrapper>
            <IconDiv>
              <img
                src="/icon/Heart.svg"
                alt="좋아요"
                style={{ width: "25px", marginRight: "8px" }}
              />
              <Div>3</Div>
            </IconDiv>
            <IconDiv>
              <img
                src="/icon/Comment.svg"
                alt="댓글"
                style={{ width: "30px", marginRight: "5px" }}
              />
              <Div>7</Div>
            </IconDiv>
          </BottomWrapper>
        </FeedWrapper>
        <FeedWrapper>
          <UserDiv>
            <UserNickname>투표 아직 안 한 미나리</UserNickname>
            <DateDiv>2024.03.08</DateDiv>
          </UserDiv>
          <BodyWrapper>
            <BodyDiv $weight="550">
              티웨이 항공 vs 에어부산, 에어부산이 더 오른다
            </BodyDiv>
            <ButtonWrapper>
              <VoteBtn color="#bee4ff" $hover="#74c5ff">
                O
              </VoteBtn>
              <VoteBtn color="#FFE3D7" $hover="#ff9a6f">
                X
              </VoteBtn>
            </ButtonWrapper>
          </BodyWrapper>
        </FeedWrapper>
        <FeedWrapper>
          <UserDiv>
            <UserNickname>투표한 미나리</UserNickname>
            <DateDiv>2024.03.08</DateDiv>
          </UserDiv>
          <BodyWrapper>
            <BodyDiv $weight="550">
              티웨이 항공 vs 에어부산, 에어부산이 더 오른다
            </BodyDiv>
            <OXWrapper>
              <OXDiv>
                O<br />
                32%
              </OXDiv>
              <BarDiv>
                <ODiv></ODiv>
                <XDiv></XDiv>
              </BarDiv>
              <OXDiv>
                X<br />
                68%
              </OXDiv>
            </OXWrapper>
          </BodyWrapper>
        </FeedWrapper>
      </FeedContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: #f3f3f3;
`;

const WritingContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 35px;
  gap: 15px;
  cursor: pointer;
  background-color: white;
  height: 80px;
  width: 100%;
  margin-bottom: 5px;
`;

const InputDiv = styled.div`
  width: 361px;
  height: 40px;
  border-radius: 20px;
  background: #f3f3f3;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 22px;

  color: #7e7e7e;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const FeedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-bottom: 5px;
`;

const UserDiv = styled.div`
  margin: 20px 25px 0px 25px;
`;

const UserNickname = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 5px;
`;

const DateDiv = styled.div`
  color: #c1c1c1;
  font-size: 13px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px 25px 0px 25px;
`;

const BodyDiv = styled.div`
  margin-bottom: 15px;
  font-weight: ${(props) => props.$weight || "400"};
`;

const Img = styled.img`
  width: 100%;
  /* object-fit: cover; */
`;

const BottomWrapper = styled.div`
  display: flex;
  margin: 20px 25px 0px 25px;
  padding: 15px 0px;
  border-top: 1px solid #dadada;
  gap: 20px;
`;

const IconDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Div = styled.div``;

const StockWrapper = styled.div`
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

const StockDiv = styled.div`
  margin-left: ${(props) => props.$margin || "10px"};
  color: #000;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;

const QuantityDiv = styled.div`
  margin-left: 7px;
  color: #000;
  font-size: 16px;
  font-weight: 500;
`;

const OrderDiv = styled.div`
  margin-left: 7px;
  color: #000;
  font-size: 16px;
  font-weight: 500;
`;

const ReturnDiv = styled.div`
  margin-left: auto;
  color: ${(props) =>
    parseFloat(props.$returns) >= 0 ? "#ee2f2a" : "#2679ed"};
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 25px;
  margin-top: 5px;
`;

const VoteBtn = styled.button`
  width: 150px;
  height: 44px;
  border: none;
  border-radius: 10px;
  background: ${(props) => props.color};

  color: #fff;
  font-size: 25px;
  font-weight: 600;

  &:hover {
    background: ${(props) => props.$hover};
  }
`;

const BarDiv = styled.div`
  position: relative;
  width: 250px;
  height: 30px;
  /* background-color: #ffe3d7;
  border-radius: 10px; */
`;

const ODiv = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 32%;
  height: 30px;
  border-radius: 10px 0px 0px 10px;
  background: #bee4ff;
`;

const XDiv = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 68%;
  height: 30px;
  border-radius: 0px 10px 10px 0px;
  background: #ffe3d7;
`;

const OXWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  margin-top: 5px;
`;

const OXDiv = styled.div`
  text-align: center;
  font-size: 15px;
`;

export default FeedPage;
