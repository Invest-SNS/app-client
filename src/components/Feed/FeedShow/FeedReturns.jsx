import React, { useState } from "react";
import styled from "styled-components";
import * as S from "../../../style/GlobalStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFeed,
  postLike,
  postUnlike,
} from "../../../store/reducers/Feed/feed";
import Comment from "./Comment";

//TODO : 전체 수익률 공유 후 수정하기
const FeedReturns = ({ item, toggleUser }) => {
  console.log("returns", item);
  const dispatch = useDispatch();

  const [like, setLike] = useState(item.like);
  const [isMyLike, setIsMyLike] = useState(item.isLike);
  const [check, setCheck] = useState(false);

  const comments = useSelector((state) => state.comment.comments[item._id]);
  const userId = useSelector((state) => state.user.user.id);

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
            <S.UserNickname onClick={() => toggleUser(item.user)}>
              {item.user.nickname}
            </S.UserNickname>
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
            <S.StockWrapper $buy="returns">
              <S.StockDiv $margin="0px">나의 전체 수익률은?</S.StockDiv>
              <ReturnDiv $returns={item.profit}>{item.profit}</ReturnDiv>
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

const ReturnDiv = styled.div`
  margin-left: auto;
  color: ${(props) =>
    parseFloat(props.$returns) >= 0 ? "#ee2f2a" : "#2679ed"};
`;

export default FeedReturns;
