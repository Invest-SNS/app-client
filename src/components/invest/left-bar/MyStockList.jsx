import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const MyStockList = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [favoriteArr, setFavoriteArr] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    // 예시
    const fetchSearchResults = async () => {
      const fakeSearchResults = [
        {
          id: 1,
          name: "삼성전자",
          code: "005930",
          index: "코스피",
          favorite: true,
          price: "72800",
          returns: "0.55%",
          accvolume: "333333",
          prdy_vrss: "1100",
        },
        {
          id: 2,
          name: "삼성SDI",
          code: "006400",
          index: "코스피",
          favorite: false,
          price: "450000",
          returns: "8.83%",
          accvolume: "44444444",
          prdy_vrss: "1100",
        },
        {
          id: 3,
          name: "삼성물산",
          code: "028260",
          index: "코스피",
          favorite: false,
          price: "162700",
          returns: "-3.15%",
          accvolume: "11111",
          prdy_vrss: "-5500",
        },
        {
          id: 4,
          name: "삼성생명",
          code: "032830",
          index: "코스피",
          favorite: true,
          price: "970100",
          returns: "-5.82%",
          accvolume: "66753",
          prdy_vrss: "-2100",
        },
      ];

      const favoriteResults = fakeSearchResults.filter(
        (result) => result.favorite
      );
      setFavoriteArr(favoriteResults);
      setSearchResults(fakeSearchResults);
    };

    if (searchInput) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchInput]);

  const addToFavorites = (result) => {
    if (!result.favorite) {
      const updatedResults = [...searchResults];
      updatedResults.forEach((item) => {
        if (item.id === result.id) {
          item.favorite = true;
          setFavoriteArr((prevArr) => [...prevArr, item]);
        }
      });

      console.log(`관심 종목으로 추가: ${result.name}`);
      console.log(favoriteArr);
    } else {
      const updatedResults = [...searchResults];
      updatedResults.forEach((item) => {
        if (item.id === result.id) {
          item.favorite = false;
        }
      });
      const updatedFavoriteArr = favoriteArr.filter(
        (item) => item.id !== result.id
      );
      setFavoriteArr(updatedFavoriteArr);
      console.log(`관심 종목에서 삭제: ${result.name}`);
      console.log(favoriteArr);
    }
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
              }}
            >
              <SearchWrapper ref={searchRef}>
                <Img src="/icon/searchGray.svg" alt="search" />
                <SearchInput
                  type="text"
                  placeholder="종목명 또는 코드"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                ></SearchInput>
                {searchInput && (
                  <SearchClearBtn onClick={() => setSearchInput("")}>
                    <img src="/icon/X.svg" alt="x" style={{ width: 15 }} />
                  </SearchClearBtn>
                )}
                <SearchOutBtn
                  onClick={(e) => {
                    e.stopPropagation();
                    setSearchInput("");
                    setShowSearch(false);
                  }}
                >
                  <img src="/icon/X.svg" alt="x" style={{ width: 30 }} />
                </SearchOutBtn>
              </SearchWrapper>
              {searchResults.length > 0 && (
                <SearchResults>
                  {searchResults.map((result) => (
                    <SearchResult key={result.id}>
                      <img
                        src={`https://file.alphasquare.co.kr/media/images/stock_logo/kr/${result.code}.png`}
                        style={{
                          width: "30px",
                          borderRadius: 100,
                          margin: "0px 10px",
                        }}
                      />
                      <StockDiv>
                        <StockName>{result.name}</StockName>
                        <RowDiv>
                          <StockCode>{result.code}</StockCode>
                          <StockIndex>{result.index}</StockIndex>
                        </RowDiv>
                      </StockDiv>
                      <StarImg
                        onClick={() => addToFavorites(result)}
                        src={
                          result.favorite
                            ? "/icon/FilledStar.svg"
                            : "/icon/BlankStar.svg"
                        }
                        alt={result.favorite ? "filledstar" : "blankstar"}
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
          {favoriteArr?.map((item, idx) => (
            <MyListDiv key={idx}>
              <ImgDiv>
                <ToggleImg
                  src={`https://file.alphasquare.co.kr/media/images/stock_logo/kr/${item.code}.png`}
                />
                <ToggleImg2
                  onClick={() => addToFavorites(item)}
                  src={
                    item.favorite
                      ? "/icon/FilledStar.svg"
                      : "/icon/BlankStar.svg"
                  }
                  alt={item.favorite ? "filledstar" : "blankstar"}
                />
              </ImgDiv>
              <StockDiv>
                <StockName>{item.name}</StockName>
                <RowDiv>
                  <StockCode>{item.code}</StockCode>
                  <StockIndex>{item.index}</StockIndex>
                  <StockVolume>{item.accvolume}</StockVolume>
                </RowDiv>
              </StockDiv>
              <PriceDiv returns={item.returns}>
                <CurrentPrice>{item.price}</CurrentPrice>
                <ChangeReturns>{item.returns}</ChangeReturns>
                <PrevVariance>{item.prdy_vrss}</PrevVariance>
              </PriceDiv>
            </MyListDiv>
          ))}
        </MyListContainer>
      </MyItemContainer>
    </LeftContainer>
  );
};

const LeftContainer = styled.section`
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
  border-bottom: 1px solid #c9c9c9;
`;

const SearchWrapper = styled.label`
  position: relative;
  display: flex;
  width: 100%;
  padding: 10px;
  height: 50px;
  background-color: #f3f3f3;
`;

const Img = styled.img`
  position: absolute;
  top: 18px;
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
  top: 18px;

  border: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SearchOutBtn = styled.button`
  width: 10%;
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
  &:hover {
    background-color: #f3f3f3;
  }
`;

const SearchResults = styled.ul`
  margin-top: 5px;
  padding-left: 0;
  list-style: none;
`;

const SearchResult = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 10px;
  text-align: left;
  height: 60px;
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
  text-align: center;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
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
  width: 100%;
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
  color: ${(props) => (parseFloat(props.returns) >= 0 ? "#ee2f2a" : "#2679ed")};
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
