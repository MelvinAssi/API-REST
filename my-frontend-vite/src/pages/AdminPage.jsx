import styled from "styled-components";


const PageContainer = styled.main`
    min-height:100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    background-color :#F6F4F4;
`;

const AdminPage = () => {
    return (      
      <PageContainer>
        <h1>Titre</h1>
        <h2>Sous Titre</h2>
        <p>Paragraphe</p>
      </PageContainer>
    );
  };

  export default AdminPage;