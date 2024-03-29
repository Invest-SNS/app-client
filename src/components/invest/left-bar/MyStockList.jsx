import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  postSearchUser,
  postLikeStock,
  fetchLikeStock,
  fetchLikeStockArr,
} from "~/store/reducers/Trading/search";
import { setFavoriteArr } from "~/store/reducers/Trading/search";
import { getCookie } from "~/lib/apis/cookie";
import StockItem from "./MyStockList/StockItem";
import SearchStock from "./MyStockList/SearchStock";

const MyStockList = () => {
  const isLogin = !!getCookie("token");
  const [searchInput, setSearchInput] = useState("");
  const [isClick, setIsClick] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const favoriteArr = useSelector((state) => state.search.favoriteArr);
  const myFavoriteArr = useSelector((state) => state.search.myFavoriteArr);

  useEffect(() => {
    if (isLogin) {
      dispatch(fetchLikeStock(user.id));
      dispatch(fetchLikeStockArr(user.id));
    }
  }, [dispatch, isClick, user.id]);

  const addToFavorites = (result) => {
    setIsClick((prev) => !prev);
    if (!result.isLike) {
      const updatedArr = [...favoriteArr, result.code];
      dispatch(setFavoriteArr(updatedArr));
      dispatch(postLikeStock({ likeStock: updatedArr, userId: user.id }));
      dispatch(postSearchUser({ searchQuery: searchInput, userId: user.id }));
    } else {
      const updatedFavoriteArr = favoriteArr.filter(
        (item) => item !== result.code
      );
      dispatch(setFavoriteArr(updatedFavoriteArr));
      dispatch(
        postLikeStock({ likeStock: updatedFavoriteArr, userId: user.id })
      );
      dispatch(postSearchUser({ searchQuery: searchInput, userId: user.id }));
    }
  };

  return (
    <LeftContainer>
      <MyItemContainer>
        <MyItemDiv>관심 종목</MyItemDiv>
        <SearchStock
          addToFavorites={addToFavorites}
          searchInput={searchInput}
          setSearchInput={setSearchInput}
        />
        <StockItem
          myFavoriteArr={myFavoriteArr}
          addToFavorites={addToFavorites}
        />
      </MyItemContainer>
    </LeftContainer>
  );
};

const LeftContainer = styled.section`
  min-width: 250px;
  width: 250px;
  height: calc(100vh - 57px);
  border-right: 1px solid #e2e2e2;
`;

const MyItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyItemDiv = styled.div`
  color: #000;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  border-bottom: 1px solid #c9c9c9;
`;

export default MyStockList;
