import React from "react";
import { useSelector } from "react-redux";

const OrderBuySellButton = ({ quantity, openModal, openErrorModal }) => {
  const { selectedTab } = useSelector((state) => state.trading);

  return (
    <button
      style={{
        width: "100%",
        backgroundColor: selectedTab === "매수" ? `red` : `#015FFF`,
        color: "white",
        borderRadius: "0.3rem",
        border: "none",
        fontSize: "0.9rem",
        padding: "0.3rem 0",
        marginTop: "1rem",
      }}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor =
          selectedTab === "매수" ? "#e61919" : "#0355AF";
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor =
          selectedTab === "매수" ? "red" : "#015FFF";
      }}
      onClick={quantity !== 0 ? openModal : openErrorModal}
    >
      {`${selectedTab}`}
    </button>
  );
};

export default OrderBuySellButton;
