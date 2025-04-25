import { createContext, useState, useEffect } from 'react';
import axios from "../services/axios.jsx";
export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
      fetchUser();
    }, []);

    const signup = async (data, recaptchaToken) => {
      try {        
        const response = await axios.post('/users', {
            username: data.username,
            email: data.email,
            password: data.password,
            recaptchaToken
        });

        setUser(response.data.user);
      } catch (error) {
        console.error('Signup error:', error.response?.data?.message || error.message);
        throw error;
      }
    };

    const login = async (data, recaptchaToken) => {
      try {
        const response = await axios.post('/login', {
            email: data.email,
            password: data.password,
            recaptchaToken
        });
        setUser(response.data.user);
        console.log(response.data.user)
        console.log(user)
      } catch (error) {
        console.error('Login error:', error.response?.data?.message || error.message);
        throw error;
      }
    };
  
    const logout = async () => {
      try {
        await axios.post('/logout');
        setUser(null);
      } catch (err) {
        console.error('Logout failed', err);
      }
    };
    const fetchUser = async () => {
      try {
        const res = await axios.get('/user'); 
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
    };

    return (
      
      <AuthContext.Provider value={{ user,signup, login, logout}}>
        {props.children}
      </AuthContext.Provider>
    );
  };

