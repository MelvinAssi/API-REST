import React from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #2C2727;
  padding: 30px;
  border-radius: 10px;
  color: #F6F4F4;
  min-width: 300px;
`;

const Button = styled.button`
  background-color: #FF7517;
  color: #F6F4F4;
  border: none;
  padding: 8px 16px;
  margin-top: 15px;
  cursor: pointer;
  border-radius: 5px;
`;

const Input = styled.input`
  background-color: #F6F4F4;
  border: none;
  padding: 6px;
  margin-top: 5px;
  width: 100%;
  border-radius: 5px;
`;

const Label = styled.label`
  display: block;
  margin-top: 10px;
`;

const AdminModal = ({ actionType, onConfirm, onClose }) => {
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(password);
    setPassword('');
  };

  const actionLabel = {
    delete: "Confirm Deletion",
    update: "Confirm Update",
    create: "Confirm Creation"
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>{actionLabel[actionType] || "Confirm Action"}</h2>
        <form onSubmit={handleSubmit}>
          <Label>
            Admin Password:
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Label>
          <Button type="submit">Confirm</Button>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default AdminModal;
