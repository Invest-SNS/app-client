import { Modal, Button } from "react-bootstrap";

const ErrorOrderModal = ({ isOpen, onClose, content }) => {
  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -13%)",
        width: "400px",
      }}
    >
      <Modal.Body>
        <div style={{ textAlign: "center" }}>{content}</div>
      </Modal.Body>
      <Button
        variant="secondary"
        onClick={onClose}
        style={{ backgroundColor: "red", border: "none", margin: "1rem" }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#e61919";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "red";
        }}
      >
        확인
      </Button>
    </Modal>
  );
};

export default ErrorOrderModal;
