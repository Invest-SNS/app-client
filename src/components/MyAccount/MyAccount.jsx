import React, { useEffect } from "react";
import Account from "./Account";
import Share from "./Share";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrder } from "../../store/reducers/User/order";
import { PuffLoader } from "react-spinners";

const MyAccount = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMyOrder());
  }, []);
  const loading = useSelector((state) => state.order.loading);

  return (
    <Container>
      {loading !== "fulfilled" ? (
        <div style={{ height: "100vh" }}>
          <div
            style={{
              height: "36vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PuffLoader color="#FF7D75" />
          </div>
        </div>
      ) : (
        <>
          <Account />
          <Share />
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 100%;
  overflow: hidden;
`;

export default MyAccount;
