import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as S from "../../../style/GlobalStyle";
import { useDispatch, useSelector } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import {
  fetchComments,
  postComment,
  deleteComment,
} from "../../../store/reducers/Feed/comment";
import UserDetail from "../../MyPage/UserDetail";

const Comment = ({ feedId }) => {
  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFriend, setSelectedFriend] = useState(null);

  useEffect(() => {
    dispatch(fetchComments(feedId));
  }, [dispatch, feedId]);

  const comments = useSelector((state) => state.comment.comments[feedId]) || [];
  const userId = useSelector((state) => state.user.user.id);

  const commentsPerPage = 5;
  const totalComments = comments.length;

  const handleShowMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleFirstPage = () => {
    setShowAll(false);
    setCurrentPage(1);
  };

  const onPostComment = () => {
    dispatch(postComment({ feedId: feedId, content: input }));
    setInput("");
  };

  const onDeleteComment = (id) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      dispatch(deleteComment(id));
      alert("댓글이 삭제되었습니다.");
    }
  };

  const handleShowAll = () => {
    setShowAll(true);
    setCurrentPage(Math.ceil(totalComments / commentsPerPage));
  };

  const toggleUser = (item) => {
    setSelectedFriend(item);
  };

  return (
    <CommentWrapper>
      <LengthDiv>댓글 &nbsp; {totalComments}</LengthDiv>
      {comments
        .slice(0, showAll ? totalComments : currentPage * commentsPerPage)
        .map((item, idx) => (
          <div key={item._id}>
            <Div key={item._id}>
              <CommentDiv>
                <NicknameDiv onClick={() => toggleUser(item.user)}>
                  {item.user.nickname}
                </NicknameDiv>
                <DateDiv>{item.createdAt}</DateDiv>
                <ContentDiv>{item.content}</ContentDiv>
              </CommentDiv>
              {item.user._id === userId && (
                <DeleteDiv>
                  <S.DeleteDiv
                    onClick={() => onDeleteComment(item._id)}
                    style={{ width: "100%" }}
                  >
                    삭제
                  </S.DeleteDiv>
                </DeleteDiv>
              )}
            </Div>
            <UserDetail
              item={item.user}
              selectedFriend={selectedFriend}
              func={toggleUser}
            />
          </div>
        ))}
      {!showAll && totalComments > currentPage * commentsPerPage ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <ShowMoreButton onClick={handleShowMore}>더보기..</ShowMoreButton>
          <ShowMoreButton onClick={handleShowAll}>&gt;&gt;</ShowMoreButton>
        </div>
      ) : totalComments <= commentsPerPage ? (
        <></>
      ) : (
        <>
          <ShowMoreButton onClick={handleFirstPage}>접기</ShowMoreButton>
        </>
      )}
      <WriteDiv $totalComments={totalComments}>
        <TextareaAutosize
          placeholder="댓글 입력하기"
          className="textarea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <InputBtn onClick={onPostComment}>→</InputBtn>
      </WriteDiv>
    </CommentWrapper>
  );
};

const CommentWrapper = styled.div``;

const LengthDiv = styled.div`
  border-top: 1px solid #dadada;
  margin: 0px 25px;
  padding: 16px 0px 8px 5px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CommentDiv = styled.div`
  padding: 8px 0px 10px 30px;
  width: 85%;
  font-size: 16px;
`;

const NicknameDiv = styled.div`
  cursor: pointer;
`;

const DateDiv = styled.div`
  color: #c1c1c1;
  font-size: 13px;
  margin-bottom: 3px;
`;

const ContentDiv = styled.div``;

const DeleteDiv = styled.div`
  width: 15%;
  padding-right: 30px;
  color: #909090;
  font-size: 14px;
`;

const WriteDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5%;
  margin: 0px 25px 10px 25px;
  border-top: ${(props) =>
    props.$totalComments != 0 ? "1px solid #dadada" : null};
  padding-top: 10px;

  .textarea {
    resize: none;
    width: 80%;
    min-height: 35px;
    max-height: 70px;
    padding-left: 10px;
    padding-top: 5px;
  }
`;

const InputBtn = styled.button`
  width: 13%;
  height: 35px;
  background-color: #ff8b8b;
  border: none;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  &:hover {
    background-color: #ff3f3f;
  }
`;

const ShowMoreButton = styled.button`
  margin: 10px 0px 10px 30px;
  border: none;
  background: none;
  color: #a5a4a4;
  padding-left: 0px;
`;

export default Comment;
