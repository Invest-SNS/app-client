import React, { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useWebSocket } from "../../../../lib/hooks/useWebSocket";
import PriceItem from "./PriceItem";
import {
  setScrollPosition,
  setSelectedPrice,
} from "../../../../store/reducers/Trading/trading";
import { useDispatch, useSelector } from "react-redux";

const PriceBook = () => {
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const { askPrice, nowPrice } = useWebSocket();
  const { scrollPosition, disabledPriceInput, selectedPrice } = useSelector(
    (state) => state.trading
  );

  // const askPrice = {
  //   message: {
  //     sellPrice: [100, 101, 102, 103, 104, 104, 104, 104, 104, 104],
  //     sellAmount: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  //     buyPrice: [100, 101, 102, 103, 104, 104, 104, 104, 104, 104],
  //     buyAmount: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  //   },
  // };
  // const nowPrice = 100;

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = scrollPosition;
    }
  }, [scrollPosition, askPrice]);
  //scrollPosition, askPrice

  const handleScroll = (e) => {
    dispatch(setScrollPosition(e.target.scrollTop));
  };

  const handlePriceSelect = (price) => {
    if (!disabledPriceInput) {
      dispatch(setSelectedPrice(price));
    }
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      style={{
        width: "150px",
        height: "calc(100% - 105px)",
        overflowY: "auto",
        scrollbarWidth: "none",
        ebkitScrollbar: "none",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        {askPrice?.message?.sellPrice
          .map((price, index) => (
            <PriceItem
              key={uuidv4()}
              price={price}
              amount={askPrice?.message?.sellAmount[index]}
              backgroundColor="#E7F0FD"
              textColor="#015FFF"
              nowPrice={nowPrice?.message?.close}
              onPriceSelect={handlePriceSelect}
              selectedPrice={selectedPrice}
            />
          ))
          .reverse()}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {askPrice?.message?.buyPrice.map((price, index) => (
          <PriceItem
            key={uuidv4()}
            price={price}
            amount={askPrice?.message?.buyAmount[index]}
            backgroundColor="#FDE8E7"
            textColor="red"
            nowPrice={nowPrice?.message?.close}
            onPriceSelect={handlePriceSelect}
            selectedPrice={selectedPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default PriceBook;
