import React, { useState } from "react";
import * as S from "../../../style/GlobalStyle";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFeed,
  postLike,
  postUnlike,
} from "../../../store/reducers/Feed/feed";
import Comment from "./Comment";

const FeedLayout = ({ item, toggleUser, children }) => {
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
            <S.DeleteDiv onClick={() => dispatch(deleteFeed(item._id))}>
              삭제
            </S.DeleteDiv>
          )}
        </div>
        {children}
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

export default FeedLayout;
