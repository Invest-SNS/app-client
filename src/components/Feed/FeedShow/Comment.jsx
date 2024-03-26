import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchComments,
  postComment,
  deleteComment,
} from "../../../store/reducers/Feed/comment";

const Comment = ({ feedId }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

  return (
    <CommentWrapper>
      <LengthDiv>댓글 &nbsp; {totalComments}</LengthDiv>
      {comments
        .slice(0, showAll ? totalComments : currentPage * commentsPerPage)
        .map((item, idx) => (
          <Div key={item._id}>
            <CommentDiv>
              <NicknameDiv>{item.user.nickname}</NicknameDiv>
              <DateDiv>{item.createdAt}</DateDiv>
              <ContentDiv>{item.content}</ContentDiv>
            </CommentDiv>
            {item.user._id === userId && (
              <DeleteDiv>
                <div onClick={() => onDeleteComment(item._id)}>삭제</div>
              </DeleteDiv>
            )}
          </Div>
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
      <WriteDiv>
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
  padding: 16px 0px 8px 30px;
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

const NicknameDiv = styled.div``;

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
  gap: 2%;
  margin: 10px;
  border-top: 1px solid #c9c9c9;
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
  width: 10%;
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
