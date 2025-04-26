import styled from "styled-components";


const PageContainer = styled.main`
    min-height:100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    background-color :#F6F4F4;
`;
const StyledH1 = styled.h1`
  color: #FF7517;  
`;
//#FF7517#3E3939#2C2727#F6F4F4
const HomePage = () => {
    return (      
      <PageContainer>
        <StyledH1>Api Rest</StyledH1>
      </PageContainer>
    );
  };

  export default HomePage;