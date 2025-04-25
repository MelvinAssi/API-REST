import styled from "styled-components";
import { useEffect,useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';


const PageContainer = styled.main`
    min-height:100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    background-color :#F6F4F4;
`;

const ProfilePage = () => {
    const {user} = useContext(AuthContext);

    return (      
      <PageContainer>
        <h1>Titre</h1>
        <h2>Sous Titre</h2>
        <p>{user.email}</p>
        <p>{user.username}</p>
        
      </PageContainer>
    );
  };

  export default ProfilePage;