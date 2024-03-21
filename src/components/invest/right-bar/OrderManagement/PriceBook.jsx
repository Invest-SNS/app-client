import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const PriceBook = ({
  onPriceUpdate,
  onPriceGapUpdate,
  onSelectedPriceUpdate,
}) => {
  // 매도
  const sellPriceData = [
    72200,
    72300,
    72300,
    72300,
    72300,
    72300,
    72300,
    72300,
    72300,
    "",
  ];

  // 매수
  const buyPriceData = [
    72100,
    71000,
    71000,
    71000,
    71000,
    71000,
    71000,
    71000,
    71000,
    "",
  ];

  // 매도 잔량
  const sellQuantityData = [
    260000,
    260000,
    260000,
    260000,
    260000,
    260000,
    260000,
    260000,
    260000,
    "",
  ];

  // 매수 잔량
  const buyQuantityData = [
    260000,
    260000,
    260000,
    260000,
    260000,
    260000,
    260000,
    260000,
    260000,
    "",
  ];

  const [sellPrice, setSellPrice] = useState(sellPriceData);
  const [buyPrice, setBuyPrice] = useState(buyPriceData);
  const [sellQuantity, setSellQuantity] = useState(sellQuantityData);
  const [buyQuantity, setBuyQuantity] = useState(buyQuantityData);
  const [currentPrice, setCurrentPrice] = useState(72200);
  const containerRef = useRef(null);

  useEffect(() => {
    onPriceUpdate(currentPrice);
    onPriceGapUpdate(sellPrice[1] - sellPrice[0]);
  }, []);

  const adjustScroll = () => {
    const container = containerRef.current;
    if (container) {
      const scrollTop = (container.scrollHeight - container.clientHeight) / 2;
      container.scrollTop = scrollTop;
    }
  };

  useEffect(() => {
    adjustScroll(); //스크롤 조정
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "150px",
        height: "calc(100% - 105px)",
        overflowY: "auto",
        scrollbarWidth: "none",
        ebkitScrollbar: "none",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        {sellPrice
          .map((price, index) => (
            <div
              key={uuidv4()}
              style={{
                height: "2.3rem",
                backgroundColor: "#E7F0FD",
                marginBottom: "0.15rem",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 1rem",
                border: price === currentPrice ? "1px solid black" : "none",
              }}
              onClick={() => {
                if (price !== "") {
                  onSelectedPriceUpdate(price);
                }
              }}
            >
              {price !== "" && (
                <>
                  <span style={{ fontSize: "0.9rem" }}>
                    {price.toLocaleString()}
                  </span>
                  <span style={{ fontSize: "0.7rem", color: "#015FFF" }}>
                    {sellQuantity[index].toLocaleString()}
                  </span>
                </>
              )}
            </div>
          ))
          .reverse()}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {buyPrice.map((price, index) => (
          <div
            key={uuidv4()}
            style={{
              height: "2.3rem",
              backgroundColor: "#FDE8E7",
              marginBottom: "0.15rem",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0 1rem",
              border: price === currentPrice ? "1px solid black" : "none",
            }}
            onClick={() => {
              if (price !== "") {
                onSelectedPriceUpdate(price);
              }
            }}
          >
            {price !== "" && (
              <>
                <span style={{ fontSize: "0.9rem" }}>
                  {price.toLocaleString()}
                </span>
                <span style={{ fontSize: "0.7rem", color: "red" }}>
                  {buyQuantity[index].toLocaleString()}
                </span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceBook;