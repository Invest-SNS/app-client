import React, { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useWebSocket } from "../../../../lib/hooks/useWebSocket";
import PriceItem from "./PriceItem";
import { setScrollPosition } from "../../../../store/reducers/Trading/trading";
import { useDispatch, useSelector } from "react-redux";

const PriceBook = () => {
  const containerRef = useRef(null);
  const dispatch = useDispatch();
  const { askPrice, nowPrice } = useWebSocket();
  const { scrollPosition } = useSelector((state) => state.trading);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = scrollPosition;
    }
  }, [scrollPosition, askPrice]);

  const handleScroll = (e) => {
    dispatch(setScrollPosition(e.target.scrollTop));
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
              nowPrice={nowPrice}
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
            nowPrice={nowPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default PriceBook;
