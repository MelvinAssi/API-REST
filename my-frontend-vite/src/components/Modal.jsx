import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex; justify-content: center; align-items: center;
`;





const Modal = ({ children, onClose }) => {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      };
  return (
    <Overlay onClick={handleOverlayClick}>
        {children}
    </Overlay>
  );
};

export default Modal;
