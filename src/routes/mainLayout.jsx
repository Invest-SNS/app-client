import React from "react";
import { Outlet } from "react-router-dom";
import MyNavbar from "../components/MyNavbar";
import MainChart from "../components/invest/chart/MainChart";
import MyStockList from "../components/invest/left-bar/MyStockList";
import styled from "styled-components";

export default function MainLayout() {
  return (
    <>
      <MyNavbar />
      <Container>
        <MyStockList />
        <MainChart />
        <Outlet />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
`
