import styled from "styled-components";


const FooterContainer = styled.footer`
  display:flex;
  align-items: center;
  justify-content: center;
  background-color: #3E3939;;
`;
const StyledP = styled.p`
  color: #F6F4F4; 

`;

const Footer = () => {
    return (      
      <FooterContainer>
        <StyledP>Copyright © 2025 All right reverse API Rest</StyledP>
      </FooterContainer>
    );
  };

  export default Footer;