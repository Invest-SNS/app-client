import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../routes/mainLayout";

// pages
import TradingPage from "../routes/Trading/TradingPage";
import MarketInfoPage from "../routes/MarketInfo/page";
import InvestStrategyPage from "../routes/InvestStrategy/page";
import HotStockPage from "../routes/HotStock/page";
import FeedPage from "../routes/Feed/page";
import MyPage from "../routes/MyPage/page";

export const mainRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <TradingPage />,
        index: true,
      },
      {
        path: "/market",
        element: <MarketInfoPage />,
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
];

const router = createBrowserRouter(mainRoutes);

export default router;
