import React, { useState } from "react";

const OrderFilledItem = ({ order }) => {
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
        <div style={{ fontSize: "0.7rem" }}>{order.createdAt}</div>
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {(order.price * order.quantity).toLocaleString()}원
        </div>
      </div>
    </div>
  );
};

export default OrderFilledItem;
