import React from "react";
import TradingInputButton from "./Button/TradingInputButton";

const OrderInput = ({
  label,
  value,
  onChange,
  increase,
  decrease,
  disabled,
}) => {
  const handleIncrease = () => {
    if (!disabled) {
      increase();
    }
  };

  const handleDecrease = () => {
    if (!disabled) {
      decrease();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        position: "relative",
        alignItems: "center",
      }}
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        style={{
          padding: "0.2rem 1.8rem",
          borderRadius: "0.3rem 0 0 0.3rem",
          width: "100%",
          textAlign: "right",
          border: "solid 1px #D9D9D9",
          backgroundColor: disabled ? "#F0F0F0" : "white",
          pointerEvents: disabled ? "none" : "auto",
        }}
        disabled={disabled}
      />
      <span
        style={{
          position: "absolute",
          fontSize: "0.85rem",
          color: "#666",
          right: "2.7rem",
        }}
      >
        {label}
      </span>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "34px",
          maxWidth: "fitContent",
        }}
      >
        <TradingInputButton
          onClick={handleIncrease}
          borderRadius={"0 0.3rem 0rem 0"}
          disabled={disabled}
        >
          ▲
        </TradingInputButton>
        <TradingInputButton
          onClick={handleDecrease}
          borderRadius={"0 0rem 0.3rem 0"}
          disabled={disabled}
        >
          ▼
        </TradingInputButton>
      </div>
    </div>
  );
};

export default OrderInput;
