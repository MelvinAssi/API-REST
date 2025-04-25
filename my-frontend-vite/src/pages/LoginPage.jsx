import styled from "styled-components";
import ReCAPTCHA from 'react-google-recaptcha'; 
import { useRef, useState, useContext } from 'react'; 
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import { AuthContext } from "../contexts/AuthContext.jsx";

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
const StyledP = styled.p`
  color: #2C2727; 
  a{
    color: #2C2727;
  } 
`;
const StyledH5 = styled.h5`

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
    background-color :#3E3939;
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

  @media (max-width: 768px) {
  }
`;

const ReCAPTCHACenterWrapper = styled.div`
    overflow-x: visible;
  div {
    overflow-x: visible;
  }
  @media (max-width: 768px) {
  }
`;

const LoginPage = () => {
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const navigate = useNavigate();
    const formRef = useRef();
    const inputs = useRef([]);
    const recaptchaRef = useRef();
    const {login} = useContext(AuthContext);

   
    const addInputs = (el) => {
      if (el && !inputs.current.includes(el)) {
        inputs.current.push(el);
      }
    };
    const handleRecaptchaChange = (value) => {
      setRecaptchaToken(value);
    };
    const handleForm = async (e) => {
        e.preventDefault();    
        if (!recaptchaToken) return;

        const data = {
        email: inputs.current[0]?.value,
        password: inputs.current[1]?.value,
        };
        try {
            await login(data, recaptchaToken);
            navigate('/');
        } catch (error) {

         }
        setRecaptchaToken(null);
        recaptchaRef.current.reset();
    };

    return (      
      <PageContainer>        
        <Form ref={formRef} onSubmit={handleForm}>
          <StyledH1>Login</StyledH1>
                <Label>Email
                    <Input
                    ref={addInputs}
                    type="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}" 
                    required
                    aria-label="write your email"
                    />   
                </Label>
                <Label>
                    Password
                    <Input
                        ref={addInputs}
                        type="password"
                        required
                        aria-label="write your password"
                    />
                </Label>

              <ReCAPTCHACenterWrapper>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={handleRecaptchaChange}
                  size="normal"
                />
              </ReCAPTCHACenterWrapper>              
              <div>
                <Button type="submit" disabled={!recaptchaToken}><StyledH5>Login</StyledH5></Button>
              </div>            
          </Form>
          <StyledP>
            You don't have a account ? <Link to="/signup">Sign up Now !!!</Link>
          </StyledP>
      </PageContainer>
      
    );
  };

  export default LoginPage;