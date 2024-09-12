import React, { createContext, useContext, useEffect, useState } from "react";
import {
  joinRoom,
  leaveRoom,
  subscribeNowPrice,
  subscribeAskPrice,
} from "../../store/webSocket/nowPrice";

const useWebSocketConnection = () => {
  const [askPrice, setAskPrice] = useState(null);
  const [nowPrice, setNowPrice] = useState(null);
  const [stockCode, setStockCode] = useState("005930");

  useEffect(() => {
    joinRoom(stockCode);

    return () => {
      leaveRoom(stockCode);
    };
  }, [stockCode]);

  useEffect(() => {
    const settingAskPrice = subscribeAskPrice((askPriceMessage) => {
      setAskPrice(askPriceMessage);
    });

    const settingNowPrice = subscribeNowPrice((nowPriceMessage) => {
      setNowPrice(nowPriceMessage);
    });

    return () => {
      settingAskPrice();
      settingNowPrice();
    };
  }, []);

  return { askPrice, nowPrice, setStockCode };
};

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const webSocketData = useWebSocketConnection();

  return (
    <WebSocketContext.Provider value={webSocketData}>
      {children}
    </WebSocketContext.Provider>
  );
};

// 커스텀 훅
export const useWebSocket = () => useContext(WebSocketContext);
