import React, { useState } from "react";
import styled from "styled-components";
import * as S from "../../../style/GlobalStyle";
import Comment from "./Comment";

//TODO : 로고 사진 변경
import default_Img from "/icon/+.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFeed,
  postLike,
  postUnlike,
} from "../../../store/reducers/Feed/feed";

const FeedOrder = ({ item }) => {
  console.log("order", item);
  const [check, setCheck] = useState(false);
  const comments = useSelector((state) => state.comment.comments[item._id]);
  const userId = useSelector((state) => state.user.user.id);
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

  const dispatch = useDispatch();
  const [like, setLike] = useState(item.like);
  const [isMyLike, setIsMyLike] = useState(item.isLike);
  const onLike = () => {
    if (!isMyLike) {
      dispatch(postLike(item._id));
      setLike((prevLike) => prevLike + 1);
      setIsMyLike(true);
    } else {
      dispatch(postUnlike(item._id));
      setLike((prevLike) => prevLike - 1);
      setIsMyLike(false);
    }
  };
  return (
    <>
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
            <S.StockWrapper $buy="sell">
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
              <S.StockDiv>삼성생명</S.StockDiv>
              <QuantityDiv>10주</QuantityDiv>
              <OrderDiv>매수</OrderDiv>
            </S.StockWrapper>
          </S.BodyCenter>
        </S.BodyWrapper>
        <S.BottomWrapper>
          <S.IconDiv>
            <img
              src={isMyLike ? "/icon/FilledHeart.svg" : "/icon/Heart.svg"}
              alt="좋아요"
              style={{ width: "25px", marginRight: "8px" }}
              onClick={onLike}
            />
            <div>{like}</div>
          </S.IconDiv>
          <div>
            <S.IconDiv onClick={() => setCheck((prev) => !prev)}>
              <img
                src="/icon/Comment.svg"
                alt="댓글"
                style={{ width: "30px", marginRight: "5px" }}
              />
              <S.CommentDiv $check={check}>
                {comments ? comments?.length : item.commentsCount}
              </S.CommentDiv>
            </S.IconDiv>
          </div>
        </S.BottomWrapper>
        {check ? <Comment feedId={item._id} /> : <></>}
      </S.FeedWrapper>
    </>
  );
};

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

export default FeedOrder;
