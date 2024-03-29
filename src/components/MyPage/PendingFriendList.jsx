import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFriendRequest,
  fetchPendingFriends,
  postFriendAccept,
} from "../../store/reducers/User/friend";

const UserPage = ({ onClose }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPendingFriends());
  }, [dispatch]);

  const pendingFriends = useSelector((state) => state.friend.pendingFriends);

  return (
    <>
      <RowDiv>
        <img src="/icon/arrow.svg" onClick={onClose} />
        <div style={{ fontSize: 20 }}>친구 대기 목록</div>
        <img style={{ width: 20 }} />
      </RowDiv>
      <FriendContainer>
        {pendingFriends.map((item) => (
          <FriendWrapper key={item._id}>
            <img src="/icon/user.svg" alt="프로필" />
            <NicknameDiv>{item.nickname}</NicknameDiv>
            <Div>
              <ButtonDiv
                $color="#BDFFA9"
                $hover="#8cff69"
                onClick={() => dispatch(postFriendAccept(item._id))}
              >
                수락
              </ButtonDiv>
              <ButtonDiv
                $color="#ffcac7"
                $hover="#ff7c75"
                onClick={() => dispatch(deleteFriendRequest(item._id))}
              >
                삭제
              </ButtonDiv>
            </Div>
          </FriendWrapper>
        ))}
      </FriendContainer>
    </>
  );
};

export default UserPage;

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
  min-height: 75px;
  height: auto;
`;

const NicknameDiv = styled.div`
  margin-left: 20px;
  font-size: 18px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  gap: 10px;
`;

const ButtonDiv = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: ${(props) => props.$color};
  width: 40px;
  height: 40px;
  font-size: 15px;
  border: none;
  padding: 0;

  &:hover {
    background-color: ${(props) => props.$hover};
  }
`;
