import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFeed,
  fetchMyFeed,
  fetchOtherFeed,
} from "../../../store/reducers/Feed/feed";
import FeedBoard from "./FeedBoard";
import FeedOrder from "./FeedOrder";
import FeedReturns from "./FeedReturns";
import FeedVote from "./FeedVote";
import UserDetail from "../../MyPage/UserDetail";
import { PuffLoader } from "react-spinners";

const Feed = ({ path, friendId }) => {
  const dispatch = useDispatch();

  const [isBottom, setIsBottom] = useState(false);
  const [page, setPage] = useState(1);
  const [fetching, setFetching] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const userId = useSelector((state) => state.user.user.id);
  const loading = useSelector((state) => state.feed.loading);

  useEffect(() => {
    if (path === "/feed") {
      if (isBottom) {
        setFetching(true);
        dispatch(fetchAllFeed(page))
          .then(() => setFetching(false))
          .catch(() => setFetching(false));
      } else {
        dispatch(fetchAllFeed(1));
      }
    } else if (friendId) {
      if (isBottom) {
        setFetching(true);
      } else {
        dispatch(fetchOtherFeed({ userId: "-1", page: 1 }));
        dispatch(fetchOtherFeed({ userId: friendId, page: 1 }));
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
  }, [dispatch, path, userId, isBottom, page, friendId]);

  const feedData = useSelector((state) => {
    if (path === "/feed") return state.feed.allFeed;
    else if (friendId) return state.feed.otherFeed;
    else if (path === "/mypage") return state.feed.myFeed;
    return [];
  });

  const toggleUser = (item) => {
    setSelectedFriend(item);
  };

  const scrollRef = useRef();

  const handleScroll = () => {
    const scrollHeight = scrollRef.current.scrollHeight;
    const scrollTop = scrollRef.current.scrollTop;
    const clientHeight = scrollRef.current.clientHeight;

    let cal;
    if (path === "/feed") {
      cal = scrollTop + clientHeight + 0.5;
    } else if (friendId) {
      cal = scrollTop + clientHeight;
    } else {
      cal = scrollTop + clientHeight + 1;
    }
    if (cal >= scrollHeight && !fetching) {
      setIsBottom(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      return () => {
        scrollElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

  if (feedData.length == 0) {
    if (loading !== "fulfilled") {
      return (
        <Container>
          <div
            style={{
              height: "36vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PuffLoader color="#FF7D75" />
          </div>
        </Container>
      );
    }
    return <Container>아직 작성된 글이 없습니다.</Container>;
  }

  return (
    <FeedScrollDiv ref={scrollRef}>
      {feedData?.map((item, idx) => {
        return (
          <div key={idx}>
            <div key={idx}>
              {item.isOrder ? (
                <FeedOrder item={item} toggleUser={toggleUser} />
              ) : item.isProfit ? (
                <FeedReturns item={item} toggleUser={toggleUser} />
              ) : item.isVote ? (
                <FeedVote item={item} toggleUser={toggleUser} />
              ) : (
                <FeedBoard item={item} toggleUser={toggleUser} />
              )}
            </div>
            <UserDetail
              item={item.user}
              selectedFriend={selectedFriend}
              func={toggleUser}
            />
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
  overflow-x: hidden;
  scrollbar-width: thin;
`;

export default Feed;
