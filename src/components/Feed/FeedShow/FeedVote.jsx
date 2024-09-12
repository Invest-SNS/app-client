import React, { useState } from "react";
import styled from "styled-components";
import * as S from "../../../style/GlobalStyle";
import { useDispatch } from "react-redux";
import { postVote } from "../../../store/reducers/Feed/feed";
import FeedLayout from "./FeedLayout";

const FeedVote = ({ item, toggleUser }) => {
  const dispatch = useDispatch();

  const [isMyVote, setIsMyVote] = useState(item.myVote);
  const [O, setO] = useState(item.vote.yes);
  const [X, setX] = useState(item.vote.no);

  const onVote = (vote) => {
    dispatch(postVote({ feedId: item._id, voteResult: vote }));
    setIsMyVote(true);
    if (vote === "yes") {
      setO((prev) => prev + 1);
    } else {
      setX((prev) => prev + 1);
    }
  };

  const calc = (num) => {
    return Math.round((num / (O + X)) * 100);
  };

  return (
    <FeedLayout item={item} toggleUser={toggleUser}>
      <S.BodyWrapper>
        <S.BodyCenter>
          <S.BodyDiv $weight="550">{item.body}</S.BodyDiv>
          {!isMyVote ? (
            <ButtonWrapper>
              <VoteBtn
                color="#bee4ff"
                $hover="#74c5ff"
                onClick={() => onVote("yes")}
              >
                O
              </VoteBtn>
              <VoteBtn
                color="#FFE3D7"
                $hover="#ff9a6f"
                onClick={() => onVote("no")}
              >
                X
              </VoteBtn>
            </ButtonWrapper>
          ) : (
            <OXWrapper>
              <OXDiv>
                O<br />
                {calc(O)}%
              </OXDiv>
              <BarDiv>
                <ODiv $width={calc(O)}></ODiv>
                <XDiv $width={calc(X)}></XDiv>
              </BarDiv>
              <OXDiv>
                X<br />
                {calc(X)}%
              </OXDiv>
            </OXWrapper>
          )}
        </S.BodyCenter>
      </S.BodyWrapper>
    </FeedLayout>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 25px;
  margin-top: 5px;
  justify-content: center;
`;

const VoteBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
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
`;

const ODiv = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: ${(props) => props.$width}%;
  height: 30px;
  border-radius: ${(props) =>
    props.$width == 100 ? "10px" : "10px 0px 0px 10px"};
  background: #bee4ff;
`;

const XDiv = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: ${(props) => props.$width}%;
  height: 30px;
  border-radius: ${(props) =>
    props.$width == 100 ? "10px" : "0px 10px 10px 0px"};
  background: #ffe3d7;
`;

const OXWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
  margin-top: 5px;
  justify-content: center;
`;

const OXDiv = styled.div`
  text-align: center;
  font-size: 15px;
`;

export default FeedVote;
