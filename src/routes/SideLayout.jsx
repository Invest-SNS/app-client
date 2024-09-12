import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import SideNavbar from "~/components/side-bar/SideNavbar";
const SideLayout = () => {
  return (
    <Container>
      <Outlet />
      <SideNavbar />
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 400px;
  position: relative;
  z-index: 999;
  background-color: white;
  border-left: 1px solid #e2e2e2;
`;
export default SideLayout;
