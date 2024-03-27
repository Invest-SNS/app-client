import React, { useState } from "react";

const OrderTypeButton = ({ type, selectedType, onClick }) => {
  return (
    <div
      onClick={() => onClick(type)}
      style={{
        backgroundColor: selectedType === type ? "#FFE3D7" : "#F5F5F5",
        padding: "0.3rem 0.6rem",
        borderRadius:
          type === "지정가" ? "0.3rem 0 0 0.3rem" : "0 0.3rem 0.3rem 0",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "0.9rem",
        cursor: "pointer",
      }}
    >
      {type}
    </div>
  );
};

export default OrderTypeButton;
