import React from "react";
import { styled } from "styled-components";
import UserPage from "./UserPage";

const UserDetail = ({ item, selectedFriend, func }) => {
  return (
    <Container $showuser={selectedFriend === item}>
      {selectedFriend === item && (
        <UserPage item={selectedFriend} onClose={() => func(null)} />
      )}
    </Container>
  );
};

const Container = styled.div`
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
export default UserDetail;
