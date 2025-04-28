import { useEffect,useContext,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import { AuthContext } from '../contexts/AuthContext';


const BurgerHeader = styled.div`
  height:auto;
  width:100%;
  padding: 10px;
  display:flex;
  flex-direction: column; 
  align-items: center;
  background-color :#3E3939;
  @media (min-width: 768px) {
      display: none;
    }

`;
const BurgerMenuContainer = styled.div.withConfig({
    shouldForwardProp: (prop) => prop !== 'isOpen' 
  })`
    transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-100%)')};
    opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
    pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
   
    transition: transform 0.3s ease, position 0.3s ease;
    flex-direction: column;
    position: fixed;
    left: 0;
    right: 0;
    background-color: #3E3939;
    z-index: 1000;
    padding: 20px;
    
    ul{
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        list-style: none;
    }
  
    a {
        text-decoration: none;
    }

    @media (min-width: 768px) {
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


const BurgerMenu = () => {
    const navigate = useNavigate();
    const {user,logout} = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
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
      <BurgerHeader>
        <Button  onClick={() => setMenuOpen(!menuOpen)}><StyledH3>☰</StyledH3></Button>
      </BurgerHeader>
      <BurgerMenuContainer isOpen={menuOpen} >
        <ul>
            <li><Link to="/"><StyledH3>Home</StyledH3></Link></li>
            {PagesLinks}
        </ul>
      </BurgerMenuContainer>
    </>
  );
};
export default BurgerMenu;