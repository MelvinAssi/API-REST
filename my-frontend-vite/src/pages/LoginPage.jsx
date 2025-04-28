import styled from "styled-components";
import ReCAPTCHA from 'react-google-recaptcha';
import { useState, useRef, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext.jsx";
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const PageContainer = styled.main`
    min-height:100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    background-color :#F6F4F4;
`;
const StyledForm = styled.div`
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
const StyledH1 = styled.h1`
  color: #FF7517;
`;

const StyledP = styled.p`
  color: #2C2727;
  a {
    color: #2C2727;
  }
`;

const Input = styled.input`
  padding: 4px 8px;
  border-radius:16px;
  font-size:1.2rem;
  background-color:#F6F4F4;
  color:#2C2727;
`;

const Label = styled.label`
  font-size:1.2rem;
  color:#F6F4F4;
`;

const Button = styled.button`
  border-radius: 16px;
  padding: 5px 20px;
  background-color: #FF7517;
  color:#3E3939;
  cursor: pointer;

  &:disabled {
    background-color: #D3D3D3;
    cursor: not-allowed;
  }
`;

const ReCAPTCHACenterWrapper = styled.div`
    overflow-x: visible;
    div {
      overflow-x: visible;
    }
`;

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(12, 'Password must be at least 12 characters')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/\d/, 'Password must contain a number')
    .required('Password is required'),
});

const LoginPage = () => {
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const recaptchaRef = useRef();
  const { login } = useContext(AuthContext);

  const handleRecaptchaChange = (value) => {
    setRecaptchaToken(value);
  };

  const handleSubmit = async (values) => {
    if (!recaptchaToken) return;

    const data = {
      email: values.email,
      password: values.password,
    };

    try {
      setLoading(true);
      await login(data, recaptchaToken);
      navigate('/');
    } catch (error) {
      console.error("Login error: ", error);
    } finally {
      setLoading(false);
      setRecaptchaToken(null);
      recaptchaRef.current.reset();
    }
  };

  return (
    <PageContainer>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <FormikForm>
            <StyledForm>
              <StyledH1>Login</StyledH1>

              <div>
                <Label htmlFor="email">Email</Label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  as={Input}
                  aria-label="Write your email"
                />
                <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  as={Input}
                  aria-label="Write your password"
                />
                <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
              </div>

              <ReCAPTCHACenterWrapper>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={handleRecaptchaChange}
                  size="normal"
                />
              </ReCAPTCHACenterWrapper>

              <div>
                <Button type="submit" disabled={isSubmitting || !recaptchaToken}>
                  {loading ? 'Logging In...' : 'Login'}
                </Button>
              </div>
            </StyledForm>
            
          </FormikForm>
        )}
      </Formik>

      <StyledP>
        You don't have an account? <Link to="/signup">Sign up Now !!!</Link>
      </StyledP>
    </PageContainer>
  );
};

export default LoginPage;
