import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import {
  postSearch,
  postSearchUser,
} from "../../../../store/reducers/Trading/search";
import { getLogoFileName, onErrorImg } from "../../../../util/getLogoFileName";
import { getCookie } from "../../../../lib/apis/cookie";
import { setClickCompany } from "../../../../store/reducers/Chart/clickCompany";

const SearchStock = ({ addToFavorites, searchInput, setSearchInput }) => {
  const searchRef = useRef(null);
  const isLogin = !!getCookie("token");
  const [showSearch, setShowSearch] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const searchResults = useSelector((state) => state.search.searchResults);

  const searchFunc = (prop) => {
    const actionToDispatch = isLogin
      ? postSearchUser({ searchQuery: prop.searchQuery, userId: user.id })
      : postSearch({ searchQuery: prop.searchQuery });
    dispatch(actionToDispatch);
  };

  useEffect(() => {
    searchFunc({ searchQuery: "" });
    setSearchInput("");
    setShowSearch(false);
  }, []);

  const onChangeInput = async (e) => {
    setSearchInput(e.target.value);
    searchFunc({ searchQuery: e.target.value });
  };

  return (
    <SearchContainer
      onClick={() => {
        setShowSearch(true);
      }}
    >
      {showSearch ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          }}
        >
          <SearchWrapper ref={searchRef}>
            <Img src="/icon/searchGray.svg" alt="search" />
            <SearchInput
              type="text"
              placeholder="종목명 또는 코드"
              value={searchInput}
              onChange={(e) => onChangeInput(e)}
            ></SearchInput>
            {searchInput && (
              <SearchClearBtn
                onClick={() => {
                  setSearchInput("");
                  searchFunc({ searchQuery: "" });
                }}
              >
                <img src="/icon/X.svg" alt="x" style={{ width: 15 }} />
              </SearchClearBtn>
            )}
            <SearchOutBtn
              onClick={(e) => {
                e.stopPropagation();
                setSearchInput("");
                setShowSearch(false);
                searchFunc({ searchQuery: "" });
              }}
            >
              <div style={{ fontSize: "13px" }}>닫기</div>
            </SearchOutBtn>
          </SearchWrapper>
          {searchResults?.length > 0 && (
            <SearchResults>
              {searchResults?.map((result) => (
                <SearchResult
                  key={result._id}
                  onClick={() => {
                    dispatch(setClickCompany(result));
                  }}
                >
                  <img
                    src={`https://file.alphasquare.co.kr/media/images/stock_logo/${getLogoFileName(
                      result.name,
                      result.code
                    )}.png`}
                    style={{
                      width: "30px",
                      borderRadius: 100,
                      margin: "0px 10px",
                    }}
                    onError={onErrorImg}
                  />
                  <StockDiv>
                    <StockName>{result.name}</StockName>
                    <RowDiv>
                      <StockCode>{result.code}</StockCode>
                      <StockIndex>
                        {result.market === "kospi" ? "코스피" : "코스닥"}
                      </StockIndex>
                    </RowDiv>
                  </StockDiv>
                  {isLogin ? (
                    <StarImg
                      onClick={() => addToFavorites(result)}
                      src={
                        result.isLike
                          ? "/icon/FilledStar.svg"
                          : "/icon/BlankStar.svg"
                      }
                      alt={result.isLike ? "filledstar" : "blankstar"}
                      $hover="hover"
                    />
                  ) : (
                    <></>
                  )}
                </SearchResult>
              ))}
            </SearchResults>
          )}
        </div>
      ) : (
        <SearchDiv>
          <img
            src="/icon/search.svg"
            alt="search"
            style={{ position: "absolute", left: 24 }}
          />
          종목 검색
        </SearchDiv>
      )}
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #000;
  text-align: center;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  width: 100%;
`;

const SearchWrapper = styled.label`
  position: relative;
  display: flex;
  width: 100%;
  padding: 10px;
  height: 44px;
  background-color: #f3f3f3;
`;

const Img = styled.img`
  position: absolute;
  top: 15.2px;
  left: 18px;
  color: grey;
  width: 15px;
`;

const SearchInput = styled.input`
  width: 85%;
  padding-left: 30px;
  font-size: 15px;
  border: none;
  background-color: #f3f3f3;
`;

const SearchClearBtn = styled.button`
  position: absolute;
  right: 50px;
  top: 14px;

  border: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SearchOutBtn = styled.button`
  width: 17%;
  margin-left: 5%;
  border: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SearchDiv = styled.div`
  font-size: 18px;
  width: 100%;
  padding: 10px 30px;
  height: 44px;

  &:hover {
    background-color: #f3f3f3;
  }
`;

const SearchResults = styled.ul`
  position: relative;
  width: 100%;
  padding-left: 0;
  list-style: none;
  max-height: calc(100vh - 151px);
  height: calc(100vh - 151px);
  overflow: auto;
  padding-bottom: 5px;
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.25);
  background-color: white;
  z-index: 98;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SearchResult = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 10px;
  text-align: left;
  min-height: 60px;

  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const StockDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;
const StockName = styled.div`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  word-break: break-all;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  color: #8c8c8c;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const StarImg = styled.img`
  &:hover {
    transform: ${(props) =>
      props.$hover == "hover" ? `scale(1.5)` : "scale(1)"};
  }
`;

const StockCode = styled.div`
  margin-right: 3px;
`;

const StockIndex = styled.div``;

export default SearchStock;
