import React from "react";

const TradingInputButton = ({ onClick, children, borderRadius, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "0.2rem 0.7rem",
        cursor: "pointer",
        height: "17px",
        fontSize: "0.6rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: disabled ? "#F0F0F0" : "white",
        border: "solid 1px #D9D9D9",
        color: disabled ? "#999" : "#666",
        borderRadius: borderRadius,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.target.style.backgroundColor = "#e4e4e4";
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.target.style.backgroundColor = "white";
        }
      }}
    >
      {children}
    </button>
  );
};

export default TradingInputButton;
