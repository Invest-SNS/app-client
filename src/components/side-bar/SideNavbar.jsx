import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const SideNavbar = () => {
  const location = useLocation();
  return (
    <Nav>
      <ul>
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            <img
              src={
                location.pathname === "/"
                  ? "/icon/tradingOrange.svg"
                  : "/icon/trading.svg"
              }
              alt="트레이딩"
            />
            <div>트레이딩</div>
          </Link>
        </li>
        <li>
          <Link
            to="/strategy"
            className={location.pathname === "/strategy" ? "active" : ""}
          >
            <img
              src={
                location.pathname === "/strategy"
                  ? "/icon/strategyOrange.svg"
                  : "/icon/strategy.svg"
              }
              alt="투자전략"
            />
            <div>투자전략</div>
          </Link>
        </li>
        <li>
          <Link
            to="/hot"
            className={location.pathname === "/hot" ? "active" : ""}
          >
            <img
              src={
                location.pathname === "/hot"
                  ? "/icon/hotOrange.svg"
                  : "/icon/hot.svg"
              }
              alt="HOT"
            />
            <div>HOT</div>
          </Link>
        </li>
        <li>
          <Link
            to="/feed"
            className={location.pathname === "/feed" ? "active" : ""}
          >
            <img
              src={
                location.pathname === "/feed"
                  ? "/icon/feedOrange.svg"
                  : "/icon/feed.svg"
              }
              alt="피드"
            />
            <div>피드</div>
          </Link>
        </li>
        <li>
          <Link
            to="/mypage"
            className={location.pathname === "/mypage" ? "active" : ""}
          >
            <img
              src={
                location.pathname === "/mypage"
                  ? "/icon/mypageOrange.svg"
                  : "/icon/mypage.svg"
              }
              alt="마이페이지"
            />
            <div>마이페이지</div>
          </Link>
        </li>
      </ul>
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  /* z-index: 1000; */
  height: 62px;
  border-top: 1px solid #e2e2e2;
  /* border-bottom: 1px solid #e2e2e2; */
  img {
    width: 22px;
  }

  ul {
    list-style: none;
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding-left: 0px;
    margin-bottom: 0px;
  }

  li {
    flex: 6;
  }

  a {
    text-decoration: none;
    color: #4e5968;
    font-size: 12px;

    &.active {
      color: #ff8049;
    }
  }
`;

export default SideNavbar;
