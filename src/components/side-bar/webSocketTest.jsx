import React, { useState, useEffect, useRef } from "react";
import {
  joinRoom,
  leaveRoom,
  subscribeAskPrice,
  subscribeNowPrice,
} from "../../store/webSocket/nowPrice"; // 경로는 실제 프로젝트 구조에 따라 조정해주세요.

const WebSocketTest = () => {
  const containerRef = useRef(null);
  const [nowPrice, setNowPrice] = useState(null);
  const [askPrice, setAskPrice] = useState(null);
  const [stockCode, setStockCode] = useState("");

  useEffect(() => {
    const settingNowPrice = subscribeNowPrice((nowPriceMessage) => {
      setNowPrice(nowPriceMessage);
    });

    const settingAskPrice = subscribeAskPrice((askPriceMessage) => {
      setAskPrice(askPriceMessage);
    });

    return () => {
      settingNowPrice();
      settingAskPrice();
    };
  }, [nowPrice, askPrice]);

  useEffect(() => {
    const adjustScroll = () => {
      const container = containerRef.current;
      if (container) {
        const scrollTop = (container.scrollHeight - container.clientHeight) / 2;
        container.scrollTop = scrollTop;
      }
    };

    adjustScroll(); // 스크롤 조정
  }, []);

  // joinRoom 및 leaveRoom 함수는 여기에서 직접 호출합니다.

  return (
    <div>
      <input
        type="text"
        value={stockCode}
        onChange={(e) => setStockCode(e.target.value)}
        placeholder="Enter stock code"
      />
      <button
        onClick={async () => {
          joinRoom(stockCode);
        }}
      >
        Join Room
      </button>
      <button onClick={() => leaveRoom(stockCode)}>Leave Room</button>
      <div>
        <h3>Real-time Data:</h3>
        {nowPrice ? (
          <pre>{JSON.stringify(nowPrice, null, 2)}</pre>
        ) : (
          <p>데이터 없음</p>
        )}
      </div>
      <div>
        <h3>Real-time Data2:</h3>
        {askPrice ? (
          <pre>{JSON.stringify(askPrice, null, 2)}</pre>
        ) : (
          <p>데이터 없음</p>
        )}
      </div>
    </div>
  );
};

export default WebSocketTest;
