import React, { useState } from "react";
import CancleIcon from "./CancleIcon";

const OrderPendingItem = ({ order }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: isHovered ? "#f0f0f0" : "transparent",
        padding: "0.5rem 1rem",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <img
          src={`https://file.alphasquare.co.kr/media/images/stock_logo/kr/${order.code}.png`}
          style={{
            width: "30px",
            borderRadius: 100,
          }}
        />
      </div>

      <div style={{ marginLeft: "1rem" }}>
        <div>{order.name}</div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: "0.9rem",
            color: "#999999",
          }}
        >
          <div
            style={{
              color: order.orderType === "매수" ? "red" : "#015FFF",
              marginRight: "0.5rem",
            }}
          >
            {order.orderType}
          </div>
          <div>{order.price.toLocaleString()}원</div>
          <div style={{ margin: "0 0.2rem" }}>·</div>
          <div>{order.quantity}주</div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "auto",
        }}
      >
        <div>{order.remaining}주</div>
        <div style={{ marginLeft: "auto" }}>
          <div style={{ fontSize: "0.9rem", color: "#999999" }}>남음</div>
        </div>
      </div>
      <CancleIcon />
    </div>
  );
};

export default OrderPendingItem;
