import React from "react";
import { Outlet } from "react-router-dom";
import MyNavbar from "../components/MyNavbar";

export default function MainLayout() {
  return (
    <>
      <MyNavbar />
      <Outlet />
    </>
  );
}
