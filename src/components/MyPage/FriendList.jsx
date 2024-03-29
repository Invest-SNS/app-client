import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFriend,
  fetchFriends,
  fetchPendingFriends,
} from "../../store/reducers/User/friend";
import PendingFriendList from "./PendingFriendList";
import UserPage from "./UserPage";

const FriendList = ({ onClose }) => {
  const dispatch = useDispatch();
  const [showDetail, setShowDetail] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  useEffect(() => {
    dispatch(fetchFriends());
    dispatch(fetchPendingFriends());
  }, [dispatch]);
  const friends = useSelector((state) => state.friend.friends);
  const pendingFriends = useSelector((state) => state.friend.pendingFriends);

  const toggleDetail = () => {
    setShowDetail(!showDetail);
  };

  const toggleUser = (item) => {
    setSelectedFriend(item);
  };

  const handleDeleteClick = (event, id) => {
    event.stopPropagation();
    dispatch(deleteFriend(id));
  };

  return (
    <div>
      <RowDiv>
        <img src="/icon/arrow.svg" onClick={onClose} />
        <div style={{ fontSize: 20 }}>친구 목록</div>
        <img
          src={
            pendingFriends.length == 0
              ? "/icon/alertNo.svg"
              : "/icon/alertYes.svg"
          }
          style={{ width: 20 }}
          onClick={toggleDetail}
        />
      </RowDiv>
      <DetailContainer $showdetail={showDetail}>
        {showDetail ? <PendingFriendList onClose={toggleDetail} /> : <></>}
      </DetailContainer>
      <FriendContainer>
        {friends?.map((item) => (
          <div key={item._id}>
            <FriendWrapper key={item._id} onClick={() => toggleUser(item)}>
              <img src="/icon/user.svg" alt="프로필" />
              <NicknameDiv>{item.nickname}</NicknameDiv>
              <DeleteDiv
                onClick={(event) => handleDeleteClick(event, item._id)}
              >
                친구 삭제
              </DeleteDiv>
            </FriendWrapper>
            <DetailContainers $showuser={selectedFriend === item}>
              {selectedFriend === item && (
                <UserPage
                  item={selectedFriend}
                  onClose={() => setSelectedFriend(null)}
                />
              )}
            </DetailContainers>
          </div>
        ))}
      </FriendContainer>
    </div>
  );
};

export default FriendList;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 15px;
`;

const FriendContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const FriendWrapper = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid #e4e4e4;
  background: #fff;
  padding: 15px 22px;
  align-items: center;
  margin: 0px 20px 10px 20px;
`;

const NicknameDiv = styled.div`
  margin-left: 20px;
  font-size: 18px;
  width: 50%;
`;

const DeleteDiv = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  border-radius: 10px;
  background: #ffe3d7;
  width: 25%;
  height: 37px;
  font-size: 15px;
  border: none;
`;

const DetailContainer = styled.div`
  width: 400px;
  height: 100%;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transform: translateX(${(props) => (props.$showdetail ? "0" : "100%")});
  transition: transform 0.3s ease;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 999;
`;

const DetailContainers = styled.div`
  width: 400px;
  height: 100%;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transform: translateX(${(props) => (props.$showuser ? "0" : "100%")});
  transition: transform 0.3s ease;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 999;
`;
