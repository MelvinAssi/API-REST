import styled from "styled-components";
import { useRef, useState, useContext } from 'react'; 
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import { AuthContext } from "../contexts/AuthContext.jsx";
import Modal from "../components/Modal.jsx";


const PageContainer = styled.main`
    min-height:100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:start;
    background-color :#F6F4F4;
`;
const StyledH1 = styled.h1`
  color: #FF7517;  
  padding:20px; 
`;
const StyledP = styled.p`
  color: #2C2727; 
  a{
    color: #2C2727;
  } 
`;
const StyledH5 = styled.h5`
  color: #2C2727;
`;
const Informations =styled.div`
  display: flex;
  flex-direction: column;
  gap:10px;
  padding:20px;
`;
const ButtonContainer=styled.div`
    display: flex;
    flex-direction: row;
    gap:10px;
    padding:20px;
`;
const Form = styled.form`
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    border-radius:16px;
    padding:20px;
    gap:10px;
    box-shadow: 10px 10px 10px rgba(0,0,0,0.25);
    background-color :#2C2727;
    color:#F6F4F4;
  @media (max-width: 768px) {

  }
`;
const Input = styled.input`
  padding: 4px 8px ;
  border-radius:16px;
  font-size:1.2rem;
  background-color:#F6F4F4; 
  color:#2C2727;
  @media (max-width: 768px) {
  }
`;
const Label=styled.label`
  font-size:1.2rem;
  color:#F6F4F4;
  @media (max-width: 768px) {
  }
`;

const Button = styled.button`
  border-radius : 16px;
  padding : 5px 20px;
  background-color : #FF7517;
  color:#3E3939;
  cursor: pointer;

  @media (max-width: 768px) {
  }
`;

const ProfilePage = () => {
    const {user,deleteUser,updateUser} = useContext(AuthContext);
    const navigate = useNavigate();
    const formRef = useRef();

    const deleteInputs = useRef([]);
    const updateInputs = useRef([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const addDeleteInputs = el => {
      if (el && !deleteInputs.current.includes(el)) {
        deleteInputs.current.push(el);
      }
    };

    const addUpdateInputs = el => {
      if (el && !updateInputs.current.includes(el)) {
        updateInputs.current.push(el);
      }
    };
    const handleDelete  = async (e) => {
      e.preventDefault();    

      try {
          const data = {              
            password: deleteInputs.current[0]?.value,
          };
          await deleteUser(data);
          setShowDeleteModal(false);
          navigate('/profile');
      } catch (error) {
        console.error("Error delete :", error);
       }
  };
    const handleUpdate = async (e) => {
        e.preventDefault();    

        try {
            const data = {
              password: updateInputs.current[0]?.value,
              newusername: updateInputs.current[1]?.value || '',
              newemail: updateInputs.current[2]?.value || '',             
              newpassword: updateInputs.current[3]?.value || '',
            }
              await updateUser(data);
              setShowUpdateModal(false);  
              navigate('/profile');
            
        } catch (error) {
          console.error("Error update :", error);
         }
    };

    return (      
      <PageContainer>

        <StyledH1>Profile</StyledH1>
        <Informations>
          <StyledH5>Email : {user.email}</StyledH5>
          <StyledH5>Username  : {user.username}</StyledH5>
          <StyledH5>Account created at {user.created_at}</StyledH5>
        </Informations>
        <ButtonContainer>
          <Button onClick={() => setShowUpdateModal(true)}><StyledH5>Update Account</StyledH5></Button>
          <Button onClick={() => setShowDeleteModal(true)}><StyledH5>Delete Account</StyledH5></Button>
        </ButtonContainer>



        {showUpdateModal && (
          <Modal onClose={() => setShowUpdateModal(false)}>
            <Form ref={formRef} onSubmit={handleUpdate}>
              <Label>Password<Input ref={addUpdateInputs} type="password"required aria-label="write your password"/></Label>
              <Label>New Username<Input ref={addUpdateInputs} type="text" aria-label="write your new username"/></Label>
              <Label>New Email<Input ref={addUpdateInputs} type="email" aria-label="write your new email"/></Label>
              <Label>New Password<Input ref={addUpdateInputs} type="password" aria-label="write your new password"/></Label>
              <Button type="submit" ><StyledH5>Update</StyledH5></Button>
          </Form>
          </Modal>
        )}

        {showDeleteModal && (
          <Modal onClose={() => setShowDeleteModal(false)}>
            <Form ref={formRef} onSubmit={handleDelete}>
              <Label>Password<Input ref={addDeleteInputs} type="password"required aria-label="write your password"/></Label>
              <Button type="submit" ><StyledH5>Delete</StyledH5></Button>
            </Form>
          </Modal>
        )}        
        
      </PageContainer>
    );
  };

  export default ProfilePage;