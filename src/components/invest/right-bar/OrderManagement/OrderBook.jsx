import React, { useState, useEffect } from "react";
import TradingInputButton from "./Button/TradingInputButton";
import OrderModal from "./Modal/OrderModal";
import ErrorOrderModal from "./Modal/ErrorOrderModal";
import { useDispatch, useSelector } from "react-redux";

const OrderBook = () => {
  // const [priceGap, setPriceGap] = useState(newPriceGap);
  // const [userMaxQuantity, setUserQuantity] = useState(maxQuatity);
  // const [userBalance, setUserBalance] = useState(balance);
  // const [userOrderType, setUserOrderType] = useState(orderType);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [balance, setBalance] = useState(2000000);
  const [selectedType, setSelectedType] = useState("지정가"); // 지정가, 시장가
  const [disablePriceInput, setDisablePriceInput] = useState(false);
  // const [price, setPrice] = useState(selectedPrice);
  const [quantity, setQuantity] = useState(0);

  const dispatch = useDispatch();
  const { selectedPrice } = useSelector((state) => state.trading);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openErrorModal = () => {
    setIsErrorModalOpen(true);
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    if (type === "시장가") {
      setDisablePriceInput(true);
      setQuantity(0);
      // setPrice(0);
    } else {
      setDisablePriceInput(false);
      setQuantity(0);
    }
  };

  const increasePrice = () => {
    // setPrice(price + priceGap);
  };

  const decreasePrice = () => {
    // const newPrice = price - priceGap;
    // setPrice(newPrice < 0 ? 0 : newPrice);
  };

  const increaseQuantity = () => {
    setQuantity(parseInt(quantity) + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(parseInt(quantity) - 1);
    }
  };

  return (
    <>
      {/* <ErrorOrderModal
        isOpen={isErrorModalOpen}
        onClose={closeErrorModal}
        content={"주문 수량이 없습니다."}
      />
      <OrderModal
        isOpen={isModalOpen}
        onClose={closeModal}
        userOrderType={userOrderType}
        price={price}
        quantity={quantity}
      />

      <div
        style={{
          width: "250px",
          height: "85%",
          padding: "1.5rem 1.2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <div
            onClick={() => handleTypeChange("지정가")}
            style={{
              backgroundColor:
                selectedType === "지정가" ? "#FFE3D7" : "#F5F5F5",
              padding: "0.3rem 0.6rem",
              borderRadius: "0.3rem 0 0 0.3rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            지정가
          </div>
          <div
            onClick={() => handleTypeChange("시장가")}
            style={{
              backgroundColor:
                selectedType === "시장가" ? "#FFE3D7" : "#F5F5F5",
              padding: "0.3rem 0.6rem",
              borderRadius: "0 0.3rem 0.3rem 0",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            시장가
          </div>
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <div style={{ fontSize: "0.85rem", color: "#666" }}>가격</div>
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
              value={price}
              onChange={(e) =>
                setPrice(e.target.value === "" ? 0 : parseFloat(e.target.value))
              }
              style={{
                padding: "0.2rem 1.8rem",
                borderRadius: "0.3rem 0 0 0.3rem",
                width: "100%",
                textAlign: "right",
                border: "solid 1px #D9D9D9",
                backgroundColor: disablePriceInput ? "#F0F0F0" : "white",
                pointerEvents: disablePriceInput ? "none" : "auto",
              }}
              disabled={disablePriceInput}
            />
            <span
              style={{
                position: "absolute",
                fontSize: "0.85rem",
                color: "#666",
                right: "2.7rem",
              }}
            >
              원
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
                onClick={increasePrice}
                borderRadius={"0 0.3rem 0rem 0"}
                disabled={disablePriceInput}
              >
                ▲
              </TradingInputButton>
              <TradingInputButton
                onClick={decreasePrice}
                borderRadius={"0 0rem 0.3rem 0"}
                disabled={disablePriceInput}
              >
                ▼
              </TradingInputButton>
            </div>
          </div>
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontSize: "0.85rem", color: "#666" }}>수량</div>
            <div
              style={{ display: "flex", flexDirection: "row", gap: "0.7rem" }}
            >
              <span style={{ fontSize: "0.9rem", color: "#969696" }}>최대</span>
              <span style={{ fontSize: "0.9rem", color: "red" }}>
                {userOrderType === "매수"
                  ? price !== 0
                    ? Math.floor(userMaxQuantity / price).toLocaleString()
                    : 0
                  : Math.floor(userMaxQuantity).toLocaleString()}{" "}
              </span>
              <span style={{ fontSize: "0.9rem", color: "#969696" }}>주</span>
            </div>
          </div>

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
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  e.target.value === "" ? 0 : parseFloat(e.target.value)
                )
              }
              style={{
                padding: "0.2rem 1.8rem",
                borderRadius: "0.3rem 0 0 0.3rem",
                width: "100%",
                textAlign: "right",
                border: "solid 1px #D9D9D9",
              }}
            />
            <span
              style={{
                position: "absolute",
                fontSize: "0.85rem",
                color: "#666",
                right: "2.7rem",
              }}
            >
              주
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
                onClick={increaseQuantity}
                borderRadius={"0 0.3rem 0rem 0"}
              >
                ▲
              </TradingInputButton>
              <TradingInputButton
                onClick={decreaseQuantity}
                borderRadius={"0 0rem 0.3rem 0"}
              >
                ▼
              </TradingInputButton>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginTop: "auto",
          }}
        >
          {orderType === "매수" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "0.3rem",
                alignItems: "center",
                marginLeft: "auto",
              }}
            >
              <div style={{ fontSize: "0.85rem", color: "#666" }}>최대</div>
              <div style={{ fontSize: "0.85rem", color: "red" }}>
                {userBalance.toLocaleString()}
              </div>
              <div style={{ fontSize: "0.85rem", color: "#666" }}>원</div>
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                fontSize: "0.85rem",
                color: "#66ƒ6",
                alignItems: "center",
              }}
            >
              주문총액
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "0.3rem",
              }}
            >
              <div>{(price * quantity).toLocaleString()}</div>
              <div style={{ fontSize: "0.85rem", color: "#666" }}>원</div>
            </div>
          </div>

          <button
            style={{
              width: "100%",
              backgroundColor: userOrderType === "매수" ? `red` : `#015FFF`,
              color: "white",
              borderRadius: "0.3rem",
              border: "none",
              fontSize: "0.9rem",
              padding: "0.3rem 0",
              marginTop: "1rem",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor =
                userOrderType === "매수" ? "#e61919" : "#0355AF";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor =
                userOrderType === "매수" ? "red" : "#015FFF";
            }}
            onClick={quantity !== 0 ? openModal : openErrorModal}
          >
            {userOrderType === "매수" ? `매수` : `매도`}
          </button>
        </div>
      </div> */}
    </>
  );
};

export default OrderBook;
