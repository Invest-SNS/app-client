import React, { useState, useEffect } from "react";

const OrderModal = ({ isOpen, onClose, userOrderType, price, quantity }) => {
  const [modalStyle, setModalStyle] = useState({
    opacity: 0,
    pointerEvents: "none",
  });

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setModalStyle({
          opacity: 1,
          pointerEvents: "auto",
        });
      }, 100);
    } else {
      setModalStyle({
        opacity: 0,
        pointerEvents: "none",
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "2",
        transition: "opacity 0.3s ease",
        ...modalStyle,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "20rem",
          padding: "1rem 1.2rem",
          borderRadius: "0.5rem",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={`https://file.alphasquare.co.kr/media/images/stock_logo/kr/005930.png`}
          style={{
            width: "40px",
            borderRadius: 100,
            margin: "0px 10px",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            fontSize: "1.15rem",
            fontWeight: "480",
            gap: "0.3rem",
          }}
        >
          <div>삼성전자</div>
          <div style={{ color: userOrderType === "매수" ? "red" : "#015FFF" }}>
            {userOrderType}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "1.2rem 0",
            width: "100%",
            gap: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ color: "#666" }}>주문단가</div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div>{price.toLocaleString()}</div>
              <div style={{ marginLeft: "0.2rem" }}>원</div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ color: "#666" }}>주문수량</div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div>{quantity}</div>
              <div style={{ marginLeft: "0.2rem" }}>주</div>
            </div>
          </div>

          <hr
            style={{
              border: "none",
              borderTop: "0.5px solid #000",
              margin: "0",
              padding: "0",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <div style={{ color: "#666" }}>총 주문금액</div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div>{(price * quantity).toLocaleString()}</div>
              <div style={{ marginLeft: "0.2rem" }}>원</div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            gap: "0.5rem",
          }}
        >
          <button
            onClick={onClose}
            style={{
              width: "50%",
              backgroundColor: userOrderType === "매수" ? "#ffeaed" : "#e4f1ff",
              color: userOrderType === "매수" ? "red" : "#015FFF",
              borderRadius: "0.3rem",
              border: "none",
              fontSize: "0.9rem",
              padding: "0.3rem 0",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor =
                userOrderType === "매수" ? "#ead9db" : "#dfe6f9";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor =
                userOrderType === "매수" ? "#ffeaed" : "#e4f1ff";
            }}
          >
            취소
          </button>
          <button
            style={{
              width: "50%",
              backgroundColor: userOrderType === "매수" ? `red` : `#015FFF`,
              color: "white",
              borderRadius: "0.3rem",
              border: "none",
              fontSize: "0.9rem",
              padding: "0.3rem 0",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor =
                userOrderType === "매수" ? "#e61919" : "#0355AF";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor =
                userOrderType === "매수" ? "red" : "#015FFF";
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
