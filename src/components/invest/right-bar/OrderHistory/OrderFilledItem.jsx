import React, { useState } from "react";
import { postOrder } from "../../../../lib/apis/feed";

const OrderFilledItem = ({ order, name, userId }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [date, time] = order.time.split(" ");
  const formattedDate = date.replace(/^\d{4}-/, "");

  const handlePostButton = () => {
    const isConfirmed = window.confirm("주문 내역을 공유하시겠습니까?");

    if (isConfirmed) {
      postOrder(userId, order.ownedShare, name, order.buyOrSell, order.quantity)
        .then(() => {
          window.alert("주문 내역이 공유되었습니다. 피드를 확인해주세요!");
        })
        .catch((error) => {
          console.error("주문 내역 공유 오류:", error);
          window.alert("주문 내역을 공유하는 동안 오류가 발생했습니다.");
        });
    }
  };

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
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: "0.7rem",
          }}
        >
          {formattedDate}
          <br />
          {time}
        </div>
      </div>

      <div style={{ marginLeft: "1rem" }}>
        <div>{name}</div>

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
              color: order.buyOrSell === "buy" ? "red" : "#015FFF",
              marginRight: "0.5rem",
            }}
          >
            {order.buyOrSell === "buy" ? "매수" : "매도"}
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
          marginRight: "0.5rem",
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

      <button
        style={{
          border: "none",
          borderRadius: "20%",
          background: "#E6E6E6",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "0.8rem",
        }}
        onClick={handlePostButton}
      >
        공유
      </button>
    </div>
  );
};

export default OrderFilledItem;
