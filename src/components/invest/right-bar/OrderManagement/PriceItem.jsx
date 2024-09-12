import React from "react";

const PriceItem = ({ price, amount, backgroundColor, textColor, nowPrice }) => {
  return (
    <div
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
        border: price === nowPrice?.message?.close ? "1px solid black" : "none",
      }}
    >
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
