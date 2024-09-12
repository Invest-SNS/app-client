import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../routes/mainLayout";

// pages
import TradingPage from "../routes/Trading/TradingPage";
import InvestStrategyPage from "../routes/InvestStrategy/InvestStrategyPage";
import HotStockPage from "../routes/HotStock/HotStockPage";
import FeedPage from "../routes/Feed/FeedPage";
import MyPage from "../routes/MyPage/MyPage";
import SideLayout from "../routes/SideLayout";
import SignIn from "../routes/Auth/SignIn";
import SignUp from "../routes/Auth/SignUp";

export const mainRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <SideLayout />,
        children: [
          {
            path: "",
            element: <TradingPage />,
            index: true,
          },
          {
            path: "/strategy",
            element: <InvestStrategyPage />,
            index: true,
          },
          {
            path: "/hot",
            element: <HotStockPage />,
            index: true,
          },
          {
            path: "/feed",
            element: <FeedPage />,
            index: true,
          },
          {
            path: "/mypage",
            element: <MyPage />,
            index: true,
          },
        ],
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
    children: [],
  },
  {
    path: "/signin",
    element: <SignIn />,
    children: [],
  },
];

const router = createBrowserRouter(mainRoutes);

export default router;
