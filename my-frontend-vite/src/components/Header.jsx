import { useEffect,useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { AuthContext } from '../contexts/AuthContext';
import BurgerMenu from './BurgerMenu';


const HeaderContainer = styled.div`
  height:auto;
  width:100%;
  padding: 10px;
  display:flex;
  flex-direction: column; 
  align-items: center;
  background-color :#3E3939;


  ul{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    list-style: none;
  }

  li{

  }
  a {
    text-decoration: none;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;
const StyledH3 = styled.h3`
  color: #F6F4F4;
  transition: color 0.5s ease;  
  &:hover{
    color: #FF7517; 
  }
`;
const Button = styled.button`
  background-color: rgba(0,0,0,0);
  border: none;
  padding: 0;
  margin: 0;
  display: inline-flex;
`;

const Header = () => {
  const navigate = useNavigate();
  const {user,logout} = useContext(AuthContext);
  useEffect(() => {
    if (user) {
      console.log("User connecté ✅ :", user);
    }
  }, [user]);

  const LogOut = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const PagesLinks = user?(
    <>
      <li><Link to="/profile"><StyledH3>Profile</StyledH3></Link></li>
      <li><Link to="/recipes"><StyledH3>Recipes</StyledH3></Link></li>
      {user.is_admin && (
      <li><Link to="/admin"><StyledH3>Admin</StyledH3></Link></li>
      )}
      <li><Button onClick={LogOut}><StyledH3>Logout</StyledH3></Button></li>
    </>
  ):(
    <>      
      <li><Link to="/login"><StyledH3>Login</StyledH3></Link></li>
      <li><Link to="/signup"><StyledH3>Signup</StyledH3></Link></li>
    </>
  );
    return (    
      <>        
        <header>
          <BurgerMenu></BurgerMenu> 
          <HeaderContainer>          
            <ul>
              <li><Link to="/"><StyledH3>Home</StyledH3></Link></li>
              {PagesLinks}
            </ul>   
          </HeaderContainer>
        </header>
      </> 

    );
  };

  export default Header;