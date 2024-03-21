import React, { useState, useEffect } from "react";

const ErrorOrderModal = ({ isOpen, onClose, content }) => {
  const [modalStyle, setModalStyle] = useState({
    opacity: 0,
    pointerEvents: "none",
  });

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setModalStyle({
          opacity: 1,
          pointerEvents: "auto",
        });
      }, 100);
    } else {
      setModalStyle({
        opacity: 0,
        pointerEvents: "none",
      });
      setTimeout(() => {
        setModalStyle({
          opacity: 0,
          pointerEvents: "none",
          transition: "none",
        });
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "2",
        transition: "opacity 0.3s ease",
        ...modalStyle,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          width: "23rem",
          padding: "1rem 1.2rem",
          borderRadius: "0.5rem",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transition: "opacity 0.3s ease",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ marginBottom: "2rem", fontSize: "1.1rem" }}>
          {content}
        </div>
        <button
          onClick={onClose}
          style={{
            width: "100%",
            backgroundColor: "red",
            color: "white",
            borderRadius: "0.3rem",
            border: "none",
            fontSize: "0.9rem",
            padding: "0.5rem 0rem",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#e61919";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "red";
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default ErrorOrderModal;
