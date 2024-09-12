import React, { useEffect } from "react";
import { styled } from "styled-components";
import * as S from "../../style/GlobalStyle";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyFeedCount } from "../../store/reducers/Feed/feed";
import {
  fetchFriendCount,
  setFriendNickname,
  setFriendId,
  postFriendRequest,
  fetchFriendsState,
  deleteMyRequest,
} from "../../store/reducers/User/friend";
import Feed from "../Feed/FeedShow/Feed";

const UserPage = ({ item, onClose }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFriendId(item._id));
    dispatch(setFriendNickname(item.nickname));
    dispatch(fetchMyFeedCount(item._id));
    dispatch(fetchFriendCount(item._id));
    dispatch(fetchFriendsState(item._id));
  }, [item._id]);

  const friendNickname = useSelector((state) => state.friend.friendNickname);
  const friendId = useSelector((state) => state.friend.friendId);
  const feedCount = useSelector((state) => state.feed.myFeedCount);
  const friendCounts = useSelector((state) => state.friend.friendCount);
  const userId = useSelector((state) => state.user.user.id);
  const states = useSelector((state) => state.friend.friendsState);

  const postRequest = () => {
    if (window.confirm("친구 요청을 보내시겠습니까?")) {
      dispatch(postFriendRequest(friendId));
      alert("요청이 완료되었습니다.");
    }
  };

  return (
    <S.Container>
      <RowDiv>
        <img src="/icon/X.svg" onClick={onClose} />
        <div style={{ fontSize: 20 }}></div>
        <img style={{ width: 20 }} />
      </RowDiv>
      <UserContainer>
        <ImgDiv>
          <img src="/icon/me.svg" alt="유저" style={{ width: "85px" }} />
          <NicknameDiv>{friendNickname}</NicknameDiv>
        </ImgDiv>
        <ColumnWrapper>
          <Div>
            <ColumnDiv>
              <ItemDiv>게시물</ItemDiv>
              <NumDiv>{feedCount}</NumDiv>
            </ColumnDiv>
            <ColumnDiv>
              <ItemDiv>친구</ItemDiv>
              <NumDiv>{friendCounts}</NumDiv>
            </ColumnDiv>
          </Div>
          {states?.state === "requested" ? (
            <FriendBtn
              onClick={() => dispatch(deleteMyRequest(friendId))}
              $color="#cbcbcb"
              $hover="#959595"
            >
              신청 취소
            </FriendBtn>
          ) : states?.state === "pending" ? (
            <FriendBtn $color="#ffffb9" $hover="none">
              알림창 확인
            </FriendBtn>
          ) : states?.state === "friend" ? (
            <></>
          ) : (
            friendId !== userId && (
              <FriendBtn onClick={postRequest}>친구 신청</FriendBtn>
            )
          )}
        </ColumnWrapper>
      </UserContainer>
      <ContentContainer>
        <Feed path="/mypage" friendId={item._id} />
      </ContentContainer>
    </S.Container>
  );
};

export default UserPage;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 15px 0px 15px;
  height: 75px;
  background-color: white;
`;

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 18px 40px;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  margin-bottom: 5px;
`;

const ImgDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  word-break: break-all;
`;

const NicknameDiv = styled.div`
  font-size: 17px;
  max-width: 98px;
`;

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  font-size: 18px;
`;

const ItemDiv = styled.div``;

const NumDiv = styled.div``;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  gap: 30px;
`;

const FriendBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  height: 30px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.$color || "#ffe3d7"};
  width: 130px;
  margin-top: 15px;

  &:hover {
    background-color: ${(props) => props.$hover || "#ffaa85"};
  }
`;
