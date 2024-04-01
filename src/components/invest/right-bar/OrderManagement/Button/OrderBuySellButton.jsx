import React from "react";
import { useSelector } from "react-redux";

const OrderBuySellButton = ({
  quantity,
  openModal,
  openErrorModal,
  maxQuantity,
  user,
}) => {
  const { selectedTab } = useSelector((state) => state.trading);

  const handleModal = () => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const quantityAsString = String(quantity).replace(/,/g, "");
    const maxQuantityAsString = String(maxQuantity).replace(/,/g, "");

    if (!user || Object.keys(user).length === 0) {
      openErrorModal("로그인을 해주세요.");
    } else if (
      currentHour < 9 ||
      (currentHour === 15 && currentMinute > 30) ||
      currentHour > 15
    ) {
      openErrorModal("현재는 주문 가능한 시간이 아닙니다.");
    } else if (quantity === 0) {
      openErrorModal("주문 수량이 없습니다.");
    } else if (parseInt(quantityAsString) > parseInt(maxQuantityAsString)) {
      openErrorModal("최대 주문 수량을 초과하였습니다.");
    } else {
      openModal();
    }
  };

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
      onClick={handleModal}
    >
      {`${selectedTab}`}
    </button>
  );
};

export default OrderBuySellButton;
