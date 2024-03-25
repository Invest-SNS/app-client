import React, { useEffect, useRef, useState } from "react";
import FeedBoard from "./FeedBoard";
import FeedOrder from "./FeedOrder";
import FeedReturns from "./FeedReturns";

import styled from "styled-components";
import { fetchAllFeed, fetchMyFeed } from "../../../store/reducers/Feed/feed";
import { useDispatch, useSelector } from "react-redux";

import FeedVote from "./FeedVote";

const Feed = ({ path }) => {
  const dispatch = useDispatch();
  const [isBottom, setIsBottom] = useState(false);
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(false);

  const scrollRef = useRef();

  const userId = useSelector((state) => state.user.user.id);

  console.log("page", page);

  useEffect(() => {
    if (path === "/feed") {
      console.log("isBottom", isBottom);
      if (isBottom) {
        setFetching(true);
        dispatch(fetchAllFeed(page))
          .then(() => setFetching(false))
          .catch(() => setFetching(false));
      } else {
        dispatch(fetchAllFeed(1));
      }
    } else if (path === "/mypage" && userId) {
      if (isBottom) {
        setFetching(true);
        dispatch(fetchMyFeed({ userId: userId, page: page }))
          .then(() => setFetching(false))
          .catch(() => setFetching(false));
      } else {
        dispatch(fetchMyFeed({ userId: userId, page: 1 }));
      }
    }
  }, [dispatch, path, userId, isBottom, page]);

  const feedData = useSelector((state) => {
    if (path === "/feed") return state.feed.allFeed;
    else if (path === "/mypage") return state.feed.myFeed;
    return [];
  });

  const handleScroll = () => {
    const scrollHeight = scrollRef.current.scrollHeight;
    const scrollTop = scrollRef.current.scrollTop;
    const clientHeight = scrollRef.current.clientHeight;

    let cal;
    if (path === "/feed") {
      cal = scrollTop + clientHeight + 0.5;
    } else {
      cal = scrollTop + clientHeight + 1;
    }
    if (cal >= scrollHeight && !fetching) {
      console.log("hello");
      setIsBottom(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      console.log("dddd");
      return () => {
        scrollElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

  console.log("feedData", feedData.length);
  if (feedData.length == 0) {
    return <Container> 아직 작성된 글이 없습니다.</Container>;
  }

  return (
    <FeedScrollDiv ref={scrollRef}>
      {feedData?.map((item, idx) => {
        console.log("item", item);
        return (
          <div key={idx}>
            {item.isOrder ? (
              <FeedOrder item={item} />
            ) : item.isProfit ? (
              <FeedReturns item={item} />
            ) : item.isVote ? (
              <FeedVote page={page} path={path} item={item} />
            ) : (
              <FeedBoard item={item} />
            )}
          </div>
        );
      })}
    </FeedScrollDiv>
  );
};

const Container = styled.div`
  background-color: white;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;

const FeedScrollDiv = styled.div`
  overflow-y: auto;
  /* max-height: 100%; */
  /* background-color: #fff; */
  /* padding-left: 8px; */
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #b8b8b8;
    border-radius: 10px;
    border: transparent;
  }

  &:hover {
    /* 마우스가 올라갔을 때 스크롤바를 보이게 함 */
    scrollbar-color: #b8b8b8 transparent;
  }
`;

export default Feed;
