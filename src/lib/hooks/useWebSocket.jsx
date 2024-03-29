import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  joinRoom,
  leaveRoom,
  subscribeNowPrice,
  subscribeAskPrice,
} from "../../store/webSocket/nowPrice";
import { useSelector } from "react-redux";

const useWebSocketConnection = () => {
  const [askPrice, setAskPrice] = useState(null);
  const [nowPrice, setNowPrice] = useState(null);
  const before = useSelector((state) => state.company.data[0]?.code);
  const now = useSelector((state) => state.company.data[1]?.code);

  useEffect(() => {
    leaveRoom(before);
    joinRoom(now);
    setNowPrice(null);
  }, [before, now]);

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

  return { askPrice, nowPrice, ready: !!nowPrice };
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
