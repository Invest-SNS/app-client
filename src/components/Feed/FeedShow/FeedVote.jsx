import React, { useState } from "react";
import styled from "styled-components";
import * as S from "../../../style/GlobalStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFeed,
  fetchAllFeed,
  fetchMyFeed,
  postVote,
} from "../../../store/reducers/Feed/feed";

const FeedVote = ({ page, path, item }) => {
  console.log("vote", item);
  const [isMyVote, setIsMyVote] = useState(item.myVote);
  const [O, setO] = useState(item.vote.yes);
  const [X, setX] = useState(item.vote.no);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.user.id);

  const onVote = (vote) => {
    dispatch(postVote({ feedId: item._id, voteResult: vote }));
    console.log("path", path);
    setIsMyVote(true);
    if (vote === "yes") {
      setO((prev) => prev + 1);
    } else {
      setX((prev) => prev + 1);
    }

    if (path == "/feed") {
      dispatch(fetchAllFeed(page));
    } else if (path == "/mypage" && userId) {
      dispatch(fetchMyFeed(userId, page));
    }
  };

  const calc = (num) => {
    return Math.round((num / (O + X)) * 100);
  };

  return (
    <>
      {!isMyVote ? (
        <S.FeedWrapper>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <S.UserDiv>
              <S.UserNickname>{item.user.nickname}</S.UserNickname>
              <S.DateDiv>{item.createdAt}</S.DateDiv>
            </S.UserDiv>
            {item.user._id === userId && (
              <div
                onClick={() => dispatch(deleteFeed(item._id))}
                style={{ width: "20%", color: "gray" }}
              >
                삭제
              </div>
            )}
          </div>
          <S.BodyWrapper>
            <S.BodyCenter>
              <S.BodyDiv $weight="550">{item.body}</S.BodyDiv>
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
            </S.BodyCenter>
          </S.BodyWrapper>
        </S.FeedWrapper>
      ) : (
        <S.FeedWrapper>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <S.UserDiv>
              <S.UserNickname>{item.user.nickname}</S.UserNickname>
              <S.DateDiv>{item.createdAt}</S.DateDiv>
            </S.UserDiv>
            {item.user._id === userId && (
              <div
                onClick={() => dispatch(deleteFeed(item._id))}
                style={{ width: "20%", color: "gray" }}
              >
                삭제
              </div>
            )}
          </div>
          <S.BodyWrapper>
            <S.BodyCenter>
              <S.BodyDiv $weight="550">{item.body}</S.BodyDiv>
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
            </S.BodyCenter>
          </S.BodyWrapper>
        </S.FeedWrapper>
      )}
      {/* {isMyVote ? (
        
      ) : (
        
      )} */}
    </>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 25px;
  margin-top: 6px;
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
`;

const OXDiv = styled.div`
  text-align: center;
  font-size: 15px;
`;

export default FeedVote;
