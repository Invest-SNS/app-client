import React, { useState, useEffect, useRef } from "react";
import { MdRefresh } from "react-icons/md";
import OrderPendingItem from "./OrderPendingItem";
import OrderFilledItem from "./OrderFilledItem";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";
import { getOrderHistory } from "../../../../lib/apis/order";
import "./OrderHistoryList.css";

const OrderHistoryList = () => {
  const [completedHistory, setCompletedHistory] = useState([]);
  const [reservedHistory, setReservedHistory] = useState([]);
  const [refreshTime, setRefreshTime] = useState("");
  const refreshIconContainerRef = useRef(null);
  const company = useSelector((state) => state.company.data[1]);
  const user = useSelector((state) => state.user.user);

  const fetchOrderHistory = async () => {
    const history = await getOrderHistory(company.code, user.id);
    setCompletedHistory(history.completedHistory);
    setReservedHistory(history.reservedHistory);
    const currentTime = new Date().toLocaleString("ko-KR", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true, // 오후/오후 표시
    });
    setRefreshTime(currentTime);
    setRefreshTime(currentTime);
  };

  const handleRefreshIcon = () => {
    fetchOrderHistory();
    refreshIconContainerRef.current.classList.add("spin");
    setTimeout(() => {
      refreshIconContainerRef.current.classList.remove("spin");
    }, 800);
  };

  useEffect(() => {
    fetchOrderHistory();
  }, [company, user]);

useEffect(() => {
  // 중복된 time 필드 제거
  const uniqueTimes = new Set();
  const uniqueCompletedHistory = completedHistory.filter((order) => {
    if (!uniqueTimes.has(order.time)) {
      uniqueTimes.add(order.time);
      return true;
    }
    return false;
  });
  setCompletedHistory(uniqueCompletedHistory);
}, [completedHistory]);


  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: "0.8rem",
        }}
      >
        <span
          style={{
            marginRight: "0.3rem",
            fontSize: "0.8rem",
            color: "#999999",
          }}
        >
          {refreshTime} 기준
        </span>
        <div ref={refreshIconContainerRef} className="refresh-icon-container">
          <MdRefresh
            onClick={handleRefreshIcon}
            style={{
              cursor: "pointer",
              fontSize: "1.1rem",
            }}
          />
        </div>
      </div>
      <div style={{ height: "44%", marginRight: "0.3rem" }}>
        <div
          style={{
            fontSize: "0.95rem",
            fontWeight: "500",
            margin: "0.3rem 0 0.5rem 1rem",
          }}
        >
          미체결
        </div>
        {reservedHistory.length !== 0 ? (
          <div
            className="scroll-container"
            style={{
              maxHeight: "100%",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
            }}
          >
            {reservedHistory.map((order) => (
              <OrderPendingItem
                key={order._id}
                order={order}
                name={company.name}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "#969696",
            }}
          >
            미체결 내역이 없습니다.
          </div>
        )}
      </div>

      <div
        style={{ height: "51%", marginTop: "2.4rem", marginRight: "0.3rem" }}
      >
        <div
          style={{
            fontSize: "0.95rem",
            fontWeight: "500",
            margin: "0.5rem 0 0.5rem 1rem",
          }}
        >
          체결
        </div>

        {completedHistory.length !== 0 ? (
          <div
            className="scroll-container"
            style={{
              maxHeight: "86%",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
            }}
          >
            {completedHistory.map((order) => (
              <OrderFilledItem
                key={order._id}
                order={order}
                name={company.name}
                userId={user.id}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              color: "#969696",
            }}
          >
            체결 내역이 없습니다.
          </div>
        )}
      </div>
    </>
  );
};

export default OrderHistoryList;
