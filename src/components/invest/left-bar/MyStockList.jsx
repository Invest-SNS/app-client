import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  postSearch,
  postSearchUser,
  postLikeStock,
} from "~/store/reducers/Trading/search";
import { postLogin } from "~/store/reducers/User/user";
import { setFavoriteArr } from "~/store/reducers/Trading/search";

//TODO : 로고 사진 변경
import default_Img from "/icon/+.svg";
import { getCookie } from "~/lib/apis/cookie";
import clickCompany, { setClickCompany } from "../../../store/reducers/Chart/clickCompany";

const MyStockList = () => {
  const isLogin = !!getCookie("token");
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  // const [favoriteArr, setFavoriteArr] = useState([]);
  const searchRef = useRef(null);

  const dispatch = useDispatch();
  const favoriteArr = useSelector((state) => state.search.favoriteArr);
  const searchResults = useSelector((state) => state.search.searchResults);
  console.log("favoriteArr", favoriteArr);
  useEffect(() => {
    // 예시
    const fetchSearchResults = async () => {};
    if (searchInput) {
      fetchSearchResults();
    } else {
      // setSearchResults([]);
    }
  }, [searchInput]);

  const searchFunc = (prop) => {
    const actionToDispatch = isLogin ? postSearchUser(prop) : postSearch(prop);
    dispatch(actionToDispatch);
  };

  useEffect(() => {
    searchFunc({ searchQuery: "" });
    setSearchInput("");
    setShowSearch(false);
  }, []);

  useEffect(() => {
    dispatch(postLogin({ email: "ddu@naver.com", password: "1234" }));
  }, []);

  const onChangeInput = async (e) => {
    setSearchInput(e.target.value);
    console.log("searchInput", e.target.value);
    searchFunc({ searchQuery: e.target.value });
  };

  const addToFavorites = (result) => {
    console.log(result);
    console.log("favoriteArr", favoriteArr);
    if (!result.isLike) {
      const updatedArr = [...favoriteArr, result.code]; // Update favoriteArr directly
      dispatch(setFavoriteArr(updatedArr)); // Dispatch the updated favoriteArr
      dispatch(postLikeStock({ likeStock: updatedArr }));
      dispatch(postSearchUser({ searchQuery: searchInput }));
      console.log(`관심 종목으로 추가: ${result.name} :${result.code} `);
      console.log("favoriteArr", updatedArr);
    } else {
      const updatedFavoriteArr = favoriteArr.filter(
        (item) => item !== result.code
      );

      dispatch(setFavoriteArr(updatedFavoriteArr)); // Dispatch the updated favoriteArr
      dispatch(postLikeStock({ likeStock: updatedFavoriteArr }));
      dispatch(postSearchUser({ searchQuery: searchInput }));
      console.log(`관심 종목에서 삭제: ${result.name} :${result.code}`);
      console.log("favoriteArr", updatedFavoriteArr);
    }
  };

  const getLogoFileName = (name, code) => {
    if (name.includes("스팩")) {
      return "SPAC_230706";
    } else if (name.includes("ETN")) {
      return "ETN_230706";
    } else if (
      name.includes("KODEX") ||
      name.includes("KOSEF") ||
      name.includes("KoAct") ||
      name.includes("TIGER") ||
      name.includes("ACE") ||
      name.includes("ARIRANG") ||
      name.includes("합성 H") ||
      name.includes("HANARO") ||
      name.includes("SOL")
    ) {
      return "ETF_230706";
    } else {
      return `kr/${code}`;
    }
  };

  const onErrorImg = (e) => {
    e.target.src = default_Img;
  };

  return (
    <LeftContainer>
      <MyItemContainer>
        <MyItemDiv>관심 종목</MyItemDiv>
        <SearchContainer onClick={() => setShowSearch(true)}>
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
                        console.log("");
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
                          <StockIndex>{result.market}</StockIndex>
                        </RowDiv>
                      </StockDiv>
                      <StarImg
                        onClick={() => addToFavorites(result)}
                        src={
                          result.isLike
                            ? "/icon/FilledStar.svg"
                            : "/icon/BlankStar.svg"
                        }
                        alt={result.isLike ? "filledstar" : "blankstar"}
                      />
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
        <MyListContainer>
          {/* {favoriteArr?.map((item, idx) => ( */}
          <MyListDiv>
            <ImgDiv>
              {/* <ToggleImg
                  src={`https://file.alphasquare.co.kr/media/images/stock_logo/${getLogoFileName(
                    item.name,
                    item.code
                  )}.png`}
                  onError={onErrorImg}
                />
                <ToggleImg2
                  onClick={() => addToFavorites(item)}
                  src={
                    item.isLike ? "/icon/FilledStar.svg" : "/icon/BlankStar.svg"
                  }
                  alt={item.isLike ? "filledstar" : "blankstar"}
                /> */}
            </ImgDiv>
            <StockDiv>
              <StockName>ㅎㅎ</StockName>
              <RowDiv>
                <StockCode>12345</StockCode>
                <StockIndex>kospi</StockIndex>
                <StockVolume>11111</StockVolume>
              </RowDiv>
            </StockDiv>
            <PriceDiv $returns="1111">
              <CurrentPrice>111</CurrentPrice>
              <ChangeReturns>111</ChangeReturns>
              <PrevVariance>1111</PrevVariance>
            </PriceDiv>
          </MyListDiv>
          {/* ))} */}
        </MyListContainer>
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
  max-height: calc((100vh - 151px) / 2);
  height: max-content;
  overflow: auto;
  padding-bottom: 5px;
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.25);
  background-color: white;
  z-index: 999;
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
    background-color: #e8e8e8;
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

const StarImg = styled.img``;

const MyListContainer = styled.div`
  position: absolute;
  top: 88px;
  left: 0;
  min-width: 250px;
  width: 250px;
`;

const MyListDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 10px;
  text-align: left;
  height: 60px;
`;

const StockCode = styled.div`
  margin-right: 3px;

  ${MyListDiv}:hover & {
    display: none;
  }
`;

const StockIndex = styled.div`
  ${MyListDiv}:hover & {
    display: none;
  }
`;

const StockVolume = styled.div`
  display: none;

  ${MyListDiv}:hover & {
    display: block;
  }
`;

const ToggleImg = styled.img`
  width: 30px;
  border-radius: 100px;
  margin: 0px 10px;

  ${MyListDiv}:hover & {
    display: none;
  }
`;

const ToggleImg2 = styled.img`
  display: none;

  ${MyListDiv}:hover & {
    display: block;
    width: 15px;
    border-radius: 100px;
    text-align: center;
    margin: 0px 10px;
  }
`;

const ImgDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  margin: 0px 10px;
`;

const PriceDiv = styled.div`
  color: ${(props) =>
    parseFloat(props.$returns) >= 0 ? "#ee2f2a" : "#2679ed"};
  text-align: right;
  display: flex;
  flex-direction: column;
`;

const CurrentPrice = styled.div`
  font-size: 14px;
`;

const ChangeReturns = styled.div`
  font-size: 12px;
  ${MyListDiv}:hover & {
    display: none;
  }
`;

const PrevVariance = styled.div`
  display: none;
  ${MyListDiv}:hover & {
    display: block;
    font-size: 12px;
  }
`;

export default MyStockList;
