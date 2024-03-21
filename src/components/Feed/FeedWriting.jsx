import React, { useState, useRef, useCallback } from "react";
import styled from "styled-components";
import { postBoardFeed, postVoteFeed } from "../../store/reducers/Feed/feed";
import { useDispatch, useSelector } from "react-redux";

const FeedWriting = ({ setIsWrite }) => {
  const inputRef = useRef();
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [body, setBody] = useState("");

  const [isVote, setIsVote] = useState(false);

  const dispatch = useDispatch();
  const userNickname = useSelector((state) => state.user.user.nickname);

  const onUploadImage = useCallback((e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  }, []);

  const onUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  const clickVote = () => {
    setIsVote(!isVote);
    setSelectedImage(null);
    setPreviewImage(null);
  };

  const onSubmit = () => {
    try {
      const formData = new FormData();
      if (isVote) {
        dispatch(postVoteFeed(body));
        window.location.reload();
      } else {
        formData.append("body", body);

        if (selectedImage) {
          formData.append("file", selectedImage);
        }
        dispatch(postBoardFeed(formData));
        window.location.reload();
      }
      for (let key of formData.keys()) {
        console.log(key);
      }

      for (let value of formData.values()) {
        console.log(value);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <UserContainer>
        <img src="/icon/user.svg" alt="프로필" style={{ width: "45px" }} />
        <UserNickname>{userNickname}</UserNickname>
        <img
          src="/icon/X.svg"
          alt="x"
          style={{ marginLeft: "auto", width: "30px" }}
          onClick={() => setIsWrite(false)}
        />
      </UserContainer>
      {isVote ? (
        <>
          <VoteWrapper>
            <VoteDiv>O / X 투표</VoteDiv>
            <VoteTextarea
              placeholder="투표 제목"
              onChange={(e) => {
                setBody(e.target.value);
                console.log("body", body);
              }}
            />
          </VoteWrapper>
        </>
      ) : (
        <StyledTextarea
          placeholder="글을 작성해보세요."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      )}

      {previewImage && (
        <PreviewImageContainer>
          <img
            src={previewImage}
            alt="업로드된 이미지"
            style={{ width: "300px", objectFit: "cover" }}
          />
        </PreviewImageContainer>
      )}
      <UploadContainer>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={onUploadImage}
          style={{ display: "none" }}
        />
        <ButtonDiv
          disabled={isVote}
          label="이미지 업로드"
          onClick={onUploadImageButtonClick}
        >
          <img
            src={isVote ? "/icon/pictureGray.svg" : "/icon/picture.svg"}
            alt="사진"
            style={{ width: "20px", marginRight: "3px" }}
          />
          <div>사진</div>
        </ButtonDiv>
        <ButtonDiv onClick={clickVote}>
          <img src="/icon/vote.svg" alt="투표" style={{ width: "27px" }} />
          <div>투표</div>
        </ButtonDiv>
        <UploadBtn onClick={onSubmit}>게시</UploadBtn>
      </UploadContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 25px 0px 25px;
  background-color: white;
  margin-bottom: 5px;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UserNickname = styled.div`
  margin-left: 13px;
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
`;

const StyledTextarea = styled.textarea`
  margin: 10px;
  resize: none;
  border: none;
  height: 100px;
  padding-left: 10px;
  padding-right: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const UploadContainer = styled.div`
  border-top: 1px solid #dadada;
  display: flex;
  flex-direction: row;
  padding: 10px;
`;

const ButtonDiv = styled.button`
  display: flex;
  flex-direction: row;
  width: 80px;
  gap: 5px;
  cursor: pointer;
  margin-right: 10px;
  border: none;
  background: none;
`;

const UploadBtn = styled.button`
  margin-left: auto;
  border-radius: 7px;
  border: none;
  background: #ff8049;
  width: 53px;
  height: 29px;
  color: #fefefe;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &:hover {
    background: #ff5208;
  }
`;

const PreviewImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const VoteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px 0px;
`;

const VoteDiv = styled.div`
  margin-right: auto;
  margin-left: 20px;
`;

const VoteTextarea = styled.textarea`
  display: flex;
  resize: none;
  width: 90%;
  height: 70px;
  padding: 10px 10px;
  margin: 10px 0px 10px 0px;
  border-radius: 7px;
  border: 1px solid #d9d9d9;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default FeedWriting;
