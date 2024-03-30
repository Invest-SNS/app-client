import React, { useEffect } from "react";
import Account from "./Account";
import Share from "./Share";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { fetchMyOrder } from "../../store/reducers/User/order";

const MyAccount = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMyOrder());
  }, []);
  return (
    <Container>
      <Account />
      <Share />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 100%;
`;
export default MyAccount;
