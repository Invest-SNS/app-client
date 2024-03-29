import React, { useRef, useState } from "react";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { postSearchFriend } from "../../store/reducers/User/friend";
import UserPage from "./UserPage";

const FriendSearch = ({ onClose }) => {
  const searchRef = useRef(null);
  const [searchInput, setSearchInput] = useState("");
  const [selectedFriend, setSelectedFriend] = useState(null);

  const dispatch = useDispatch();
  const friendSearch = useSelector((state) => state.friend.friendSearch);

  const onChangeInput = async (e) => {
    setSearchInput(e.target.value);
    dispatch(postSearchFriend({ nickname: e.target.value }));
  };

  const toggleUser = (item) => {
    setSelectedFriend(item);
  };

  return (
    <div>
      <RowDiv>
        <img
          src="/icon/arrow.svg"
          onClick={() => {
            onClose();
          }}
        />
        <div style={{ fontSize: 20 }}>친구 검색</div>
        <img style={{ width: 20 }} />
      </RowDiv>
      <SearchContainer>
        <div style={{ marginBottom: "10px", color: "#c4c4c4" }}>
          @를 입력하면 모든 사람을 볼 수 있어요!
        </div>
        <SearchWrapper ref={searchRef}>
          <SearchInput
            type="text"
            placeholder="닉네임을 검색해보세요."
            value={searchInput}
            onChange={(e) => onChangeInput(e)}
          ></SearchInput>
          {searchInput && (
            <SearchClearBtn
              onClick={() => {
                setSearchInput("");
                dispatch(postSearchFriend({ nickname: "" }));
              }}
            >
              <img src="/icon/X.svg" alt="x" style={{ width: 15 }} />
            </SearchClearBtn>
          )}
        </SearchWrapper>
        {friendSearch?.length > 0 && (
          <>
            <SearchResults>
              {friendSearch?.map((item) => (
                <div key={item._id}>
                  <SearchResult key={item._id} onClick={() => toggleUser(item)}>
                    {item.nickname}
                  </SearchResult>
                  <DetailContainers $showuser={selectedFriend === item}>
                    {selectedFriend === item && (
                      <UserPage
                        item={selectedFriend}
                        onClose={() => setSelectedFriend(null)}
                      />
                    )}
                  </DetailContainers>
                </div>
              ))}
            </SearchResults>
          </>
        )}
      </SearchContainer>
    </div>
  );
};

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 15px;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchWrapper = styled.label`
  position: relative;
  display: flex;
  width: 8 0%;
  padding: 10px;
  height: 44px;
  background-color: #f3f3f3;
  width: 80%;
`;

const SearchInput = styled.input`
  width: 85%;
  padding-left: 0px;
  font-size: 15px;
  border: none;
  background-color: #f3f3f3;
`;

const SearchClearBtn = styled.button`
  position: absolute;
  right: 15px;
  top: 14px;
  border: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const SearchResults = styled.ul`
  width: 80%;
  padding-left: 0;
  list-style: none;
  height: calc(100vh - 303px);
  overflow-y: auto;
  padding-bottom: 5px;
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
  border: 1px solid #f0f0f0;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const DetailContainers = styled.div`
  width: 400px;
  height: 100%;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transform: translateX(${(props) => (props.$showuser ? "0" : "100%")});
  transition: transform 0.3s ease;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 999;
`;
export default FriendSearch;
