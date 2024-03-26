import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../routes/mainLayout";

// pages
import TradingPage from "../routes/Trading/TradingPage";
import MarketInfoPage from "../routes/MarketInfo/MarketInfoPage";
import InvestStrategyPage from "../routes/InvestStrategy/InvestStrategyPage";
import HotStockPage from "../routes/HotStock/HotStockPage";
import FeedPage from "../routes/Feed/FeedPage";
import MyPage from "../routes/MyPage/MyPage";
import SideLayout from "../routes/SideLayout";
import ChatBot from "../routes/chatBot/chatBot";

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
];

const router = createBrowserRouter(mainRoutes);

export default router;
