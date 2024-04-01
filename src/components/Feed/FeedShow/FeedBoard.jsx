import React, { useState } from "react";
import FeedLayout from "./FeedLayout";
import styled from "styled-components";
import * as S from "../../../style/GlobalStyle";

const FeedBoard = ({ item, toggleUser }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <FeedLayout item={item} toggleUser={toggleUser}>
      <S.BodyWrapper>
        <S.BodyDiv>{item.body}</S.BodyDiv>
        {item.photoUrl ? (
          <Img src={item.photoUrl} alt="본문 사진" onClick={openModal} />
        ) : (
          <></>
        )}
        {modalOpen && (
          <ModalOverlay onClick={closeModal}>
            <ModalImg src={item.photoUrl} alt="모달 이미지" />
          </ModalOverlay>
        )}
      </S.BodyWrapper>
    </FeedLayout>
  );
};

const Img = styled.img`
  width: 100%;
  cursor: pointer; // 마우스 커서를 변경하여 사용자에게 이미지 클릭 가능 여부를 알려줍니다.
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); // 반투명한 검은색 배경
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalImg = styled.img`
  max-width: 90%;
  max-height: 90%;
`;

export default FeedBoard;
