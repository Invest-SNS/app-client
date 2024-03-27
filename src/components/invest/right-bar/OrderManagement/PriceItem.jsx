import { useEffect } from "react";
import React from "react";

const PriceItem = ({
  price,
  amount,
  backgroundColor,
  textColor,
  nowPrice,
  onPriceSelect,
  selectedPrice,
}) => {
  const isSelected = price === selectedPrice;

  return (
    <div
      onClick={() => {
        onPriceSelect(price);
      }}
      style={{
        width: "150px",
        height: "2.3rem",
        backgroundColor: backgroundColor,
        marginBottom: "0.15rem",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1rem",
        border: price === nowPrice ? "1px solid black" : "none",
        position: "relative",
        cursor: "pointer",
      }}
    >
      {isSelected && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: "4px",
            backgroundColor: "red",
          }}
        />
      )}
      {price !== "" && (
        <>
          <span style={{ fontSize: "0.9rem" }}>{price.toLocaleString()}</span>
          <span style={{ fontSize: "0.7rem", color: textColor }}>
            {amount.toLocaleString()}
          </span>
        </>
      )}
    </div>
  );
};

export default PriceItem;
