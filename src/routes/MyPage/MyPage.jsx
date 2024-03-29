import React, { useEffect, useState } from "react";
import styled from "styled-components";
import * as S from "../../style/GlobalStyle";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyPageFeedCount } from "../../store/reducers/Feed/feed";
import {
  fetchFriendCount,
  fetchFriends,
  fetchPendingFriends,
} from "../../store/reducers/User/friend";
import Feed from "../../components/Feed/FeedShow/Feed";
import FriendList from "../../components/MyPage/FriendList";
import FriendSearch from "../../components/MyPage/FriendSearch";
// import MyAccount from "../../components/MyAccount/MyAccount";
import LogoIcon from "../../../public/icon/logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "../../lib/apis/cookie";

export default function MyPage() {
  const isLogin = !!getCookie("token");
  const [selectedTab, setSelectedTab] = useState("내 피드");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };
  const location = useLocation();
  const path = location.pathname;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMyPageFeedCount(userId));
    dispatch(fetchFriendCount(userId));
    dispatch(fetchFriends());
    dispatch(fetchPendingFriends());
  }, []);

  const pendingFriends = useSelector((state) => state.friend.pendingFriends);
  const userId = useSelector((state) => state.user.user.id);
  const userNickname = useSelector((state) => state.user.user.nickname);
  const feedCount = useSelector((state) => state.feed.mypageFeedCount);
  const friendCount = useSelector((state) => state.friend.friends);
  // const friendCounts = useSelector((state) => state.friend.friendCount);

  useEffect(() => {
    dispatch(fetchFriendCount(userId));
  }, [friendCount]);

  const [showDetail, setShowDetail] = useState(false);

  const toggleDetail = () => {
    setShowDetail(!showDetail);
  };

  const [showFriendSearch, setShowFriendSearch] = useState(false);

  const toggleFriendSearch = () => {
    setShowFriendSearch(!showFriendSearch);
  };

  const navigate = useNavigate();
  return (
    <S.Container>
      {isLogin ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              height: "7%",
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                width: "50%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderBottom:
                  selectedTab === "내 피드"
                    ? "1.5px solid red"
                    : "1.5px solid #D9D9D9",
                fontSize: "0.85rem",
              }}
              onClick={() => handleTabClick("내 피드")}
            >
              내 피드
            </div>
            <div
              style={{
                width: "50%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                borderBottom:
                  selectedTab === "내 계좌"
                    ? "1.5px solid red"
                    : "1.5px solid #D9D9D9",
                fontSize: "0.85rem",
              }}
              onClick={() => handleTabClick("내 계좌")}
            >
              내 계좌
            </div>
          </div>
          <UserContainer>
            <FriendDiv onClick={toggleFriendSearch}>친구 검색</FriendDiv>
            <DetailContainer $showdetail={showFriendSearch}>
              {showFriendSearch ? (
                <FriendSearch onClose={toggleFriendSearch} />
              ) : (
                <></>
              )}
            </DetailContainer>
            <ImgDiv>
              <img src="/icon/me.svg" alt="유저" style={{ width: "85px" }} />
              <NicknameDiv>{userNickname}</NicknameDiv>
            </ImgDiv>
            <ColumnDiv>
              <ItemDiv>게시물</ItemDiv>
              <NumDiv>{feedCount}</NumDiv>
            </ColumnDiv>
            <ColumnDiv $pointer="pointer" onClick={toggleDetail}>
              {pendingFriends.length != 0 && (
                <img
                  src="/icon/redAlert.svg"
                  alt="alert"
                  style={{
                    marginLeft: "auto",
                    position: "absolute",
                    right: "60px",
                  }}
                />
              )}
              <ItemDiv>친구</ItemDiv>
              <NumDiv>{friendCount?.length}</NumDiv>
            </ColumnDiv>
            <DetailContainer $showdetail={showDetail}>
              {showDetail ? <FriendList onClose={toggleDetail} /> : <></>}
            </DetailContainer>
          </UserContainer>
          <ContentContainer>
            {selectedTab === "내 피드" ? (
              <Feed path={path} friendId="" />
            ) : (
              <></>
            )}
            {/* {selectedTab === "내 계좌" ? <MyAccount /> : <></>} */}
          </ContentContainer>
        </>
      ) : (
        <S.Wrapper>
          <img src={LogoIcon} width={50} onClick={() => navigate("/signin")} />
          로그인을 해주세요.
        </S.Wrapper>
      )}
    </S.Container>
  );
}

const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 35px 40px;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  margin-bottom: 5px;
`;

const FriendDiv = styled.div`
  position: absolute;
  top: 45px;
  right: 30px;
  color: #a2a2a2;
  font-size: smaller;

  &:hover {
    color: #525252;
  }
`;

const ImgDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  word-break: break-all;
`;

const NicknameDiv = styled.div`
  font-size: 17px;
  max-width: 98px;
`;

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;
  font-size: 18px;

  cursor: ${(props) => props.$pointer || "default"};
`;

const ItemDiv = styled.div``;

const NumDiv = styled.div``;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const DetailContainer = styled.div`
  width: 400px;
  height: 100%;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transform: translateX(${(props) => (props.$showdetail ? "0" : "100%")});
  transition: transform 0.3s ease;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  z-index: 999;
`;
