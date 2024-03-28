import React, { useEffect, useState } from "react";
import FeedBoard from "./FeedBoard";
import FeedOrder from "./FeedOrder";
import FeedReturns from "./FeedReturns";
import FeedVoteNot from "./FeedVoteNot";
import FeedVoteYes from "./FeedVoteYes";
import FeedDetail from "../FeedDetail";
import styled from "styled-components";
import { fetchAllFeed } from "../../../store/reducers/Feed/feed";
import { useDispatch, useSelector } from "react-redux";

const Feed = () => {
  const [showDetail, setShowDetail] = useState(false);
  const toggleDetail = () => {
    setShowDetail(true);
  };

  useEffect(() => {
    setShowDetail(false);
    dispatch(fetchAllFeed());
  }, []);
  console.log(showDetail);

  const dispatch = useDispatch();
  const allFeedData = useSelector((state) => state.feed.allFeed);
  console.log("allFeedData", allFeedData);
  return (
    <>
      {allFeedData?.map((item, idx) => {
        console.log("item", item);
        return (
          <div key={idx}>
            {item.isOrder ? (
              <FeedOrder item={item} />
            ) : item.isProfit ? (
              <FeedReturns item={item} />
            ) : item.isVote && item.myVote ? (
              <FeedVoteYes item={item} />
            ) : item.isVote ? (
              <FeedVoteNot item={item} />
            ) : (
              <FeedBoard item={item} toggleDetail={toggleDetail} />
            )}
          </div>
        );
      })}

      <DetailContainer $showdetail={showDetail}>
        {showDetail ? (
          <>
            <FeedDetail setShowDetail={setShowDetail} />
          </>
        ) : (
          <></>
        )}
      </DetailContainer>
    </>
  );
};

const DetailContainer = styled.div`
  width: 400px;
  height: 100%;
  background-color: #fff;
  transform: translateX(${(props) => (props.$showdetail ? "0" : "100%")});
  transition: transform 0.3s ease;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 999;
`;

export default Feed;
