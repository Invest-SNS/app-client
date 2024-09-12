import React, { useState, useEffect } from "react";
import OrderModal from "./Modal/OrderModal";
import ErrorOrderModal from "./Modal/ErrorOrderModal";
import OrderInput from "./OrderInput";
import OrderTypeButton from "./Button/OrderTypeButton";
import OrderBuySellButton from "./Button/OrderBuySellButton";
import { useDispatch, useSelector } from "react-redux";
import { useWebSocket } from "../../../../lib/hooks/useWebSocket";
import {
  setSelectedPrice,
  setOrderType,
  setSelectedQuantity,
  increaseSelectedQuantity,
  decreaseSelectedQuantity,
} from "../../../../store/reducers/Trading/trading";
import { getBalance, getHoldingQuantity } from "../../../../lib/apis/holding";

const OrderBook = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [balance, setBalance] = useState(0); // 잔고
  const [maxQuantity, setMaxQuantity] = useState(0);
  const [selectedType, setSelectedType] = useState("지정가"); // 지정가, 시장가
  const { askPrice, nowPrice, ready } = useWebSocket();
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const { selectedPrice, selectedTab, orderType, selectedQuantity } =
    useSelector((state) => state.trading);
  const user = useSelector((state) => state.user.user);
  const company = useSelector((state) => state.company.data[1]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openErrorModal = (content) => {
    setContent(content);
    setIsErrorModalOpen(true);
  };
  const closeErrorModal = () => setIsErrorModalOpen(false);

  const handleTypeChange = (type) => {
    setSelectedType(type);
    if (type === "시장가") {
      dispatch(setSelectedQuantity(0));
      dispatch(setSelectedPrice(0));
      dispatch(setOrderType("시장가"));
    } else {
      dispatch(setSelectedQuantity(0));
      dispatch(setSelectedPrice(nowPrice?.message?.close));
      dispatch(setOrderType("지정가"));
    }
  };

  const increasePrice = () => {
    const priceDiff =
      parseInt(askPrice?.message?.sellPrice[1]) -
      parseInt(askPrice?.message?.sellPrice[0]);
    dispatch(setSelectedPrice(parseInt(selectedPrice) + priceDiff));
  };

  const decreasePrice = () => {
    const priceDiff =
      parseFloat(askPrice.message.sellPrice[1]) -
      parseFloat(askPrice.message.sellPrice[0]);
    const newPrice = selectedPrice - priceDiff;
    dispatch(setSelectedPrice(newPrice < 0 ? 0 : newPrice));
  };

  const increaseQuantity = () => {
    dispatch(increaseSelectedQuantity());
  };

  const decreaseQuantity = () => {
    dispatch(decreaseSelectedQuantity());
  };

  useEffect(() => {
    const calculateMaxQuantity = async () => {
      if (selectedTab === "매수") {
        if (selectedType === "지정가") {
          // 지정가
          return Math.floor(balance / selectedPrice).toLocaleString();
        } else {
          // 시장가
          return Math.floor(
            parseInt(balance) / askPrice?.message?.sellPrice[0]
          ).toLocaleString();
        }
      } else {
        if (!user || Object.keys(user).length === 0) {
          return "0";
        } else {
          const quantity = await getHoldingQuantity(user.id, company.code);
          return parseInt(quantity).toLocaleString();
        }
      }
    };

    calculateMaxQuantity()
      .then((result) => {
        setMaxQuantity(result);
      })
      .catch((error) => {
        console.error("Error calculating max quantity:", error);
      });
  }, [selectedTab, selectedType, balance, askPrice, user, company]);

  useEffect(() => {
    setSelectedType("지정가");
  }, [user]);

  useEffect(() => {
    dispatch(setSelectedPrice(nowPrice?.message?.close));
  }, [ready]);

  useEffect(() => {
    const fetchBalance = async () => {
      if (user && Object.keys(user).length !== 0) {
        const balance = await getBalance(user.id);
        setBalance(parseInt(balance));
      } else {
        setBalance(0);
      }
    };

    fetchBalance();
  }, [isModalOpen, user]);

  return (
    <>
      <ErrorOrderModal
        isOpen={isErrorModalOpen}
        onClose={closeErrorModal}
        content={content}
      />
      <OrderModal
        isOpen={isModalOpen}
        onClose={closeModal}
        userOrderType={selectedTab}
        price={
          selectedType === "지정가"
            ? selectedPrice
            : selectedTab === "매수"
            ? askPrice?.message?.sellPrice[0]
            : askPrice?.message?.buyPrice[0]
        }
        quantity={selectedQuantity}
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
          <OrderTypeButton
            type="지정가"
            selectedType={selectedType}
            onClick={handleTypeChange}
          />
          <OrderTypeButton
            type="시장가"
            selectedType={selectedType}
            onClick={handleTypeChange}
          />
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <div style={{ fontSize: "0.85rem", color: "#666" }}>가격</div>
          <OrderInput
            label={"원"}
            value={selectedPrice}
            onChange={(e) =>
              dispatch(
                setSelectedPrice(
                  e.target.value === "" ? 0 : parseFloat(e.target.value)
                )
              )
            }
            increase={increasePrice}
            decrease={decreasePrice}
            disabled={orderType === "시장가" ? true : false}
          />
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
                {maxQuantity}
              </span>
              <span style={{ fontSize: "0.9rem", color: "#969696" }}>주</span>
            </div>
          </div>
          <OrderInput
            label={"주"}
            value={selectedQuantity}
            onChange={(e) =>
              dispatch(
                setSelectedQuantity(
                  e.target.value === "" ? 0 : parseFloat(e.target.value)
                )
              )
            }
            increase={increaseQuantity}
            decrease={decreaseQuantity}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            marginTop: "auto",
          }}
        >
          {selectedTab === "매수" ? (
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
                {balance.toLocaleString()}
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
              <div>{(selectedPrice * selectedQuantity).toLocaleString()}</div>
              <div style={{ fontSize: "0.85rem", color: "#666" }}>원</div>
            </div>
          </div>

          <OrderBuySellButton
            user={user}
            quantity={selectedQuantity}
            openModal={openModal}
            openErrorModal={openErrorModal}
            selectedType={selectedType}
            maxQuantity={maxQuantity}
          />
        </div>
      </div>
    </>
  );
};

export default OrderBook;
