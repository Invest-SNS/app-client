import React, { useState, useEffect } from "react";
import OrderPendingItem from "./OrderPendingItem";
import OrderFilledItem from "./OrderFilledItem";
import { v4 as uuidv4 } from "uuid";

const OrderHistoryList = ({ pedingOrderList, filledOrderList }) => {
  const [pendingOrders, setPendingOrders] = useState(pedingOrderList);
  const [filledOrders, setFilledOrders] = useState(filledOrderList);

  return (
    <>
      <div
        style={{
          height: "45%",
        }}
      >
        <div
          style={{
            fontSize: "0.95rem",
            fontWeight: "500",
            margin: "0.7rem 0 0.5rem 1rem",
          }}
        >
          미체결
        </div>
        {pendingOrders.length !== 0 ? (
          <div
            style={{
              maxHeight: "100%",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              cursor: "pointer",
            }}
          >
            {pendingOrders.map((order) => (
              <OrderPendingItem key={uuidv4()} order={order} />
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
        style={{
          height: "55%",
          marginTop: "2.5rem",
        }}
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
        {filledOrderList.length !== 0 ? (
          <div
            style={{
              maxHeight: "86%",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              "&::-webkit-scrollbar": {
                display: "none",
              },
              cursor: "pointer",
            }}
          >
            {filledOrders.map((order) => (
              <OrderFilledItem key={uuidv4()} order={order} />
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
