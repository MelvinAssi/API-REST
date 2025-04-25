import { createContext, useState, useEffect } from 'react';
import axios from "../services/axios.jsx";
export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [loading, setLoading] = useState(true); 
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
      setLoading(true);
      try {
        const res = await axios.get('/user'); 
        setUser(res.data.user);
        setLoading(false);
      } catch {
        setUser(null);
        setLoading(false);
      }
    };
    const deleteUser =async(data) =>{
      try {
        await axios.delete('/user', {
          data: {
            password: data.password
          }
        });
        setUser(null);
      } catch {
        setUser(null);
      }
    }
    const updateUser =async(data) =>{
      console.log(data)
      try {
        const res=await axios.put('/user', {
          password: data.password,
          newemail : data.newemail,
          newusername: data.newusername,
          newpassword : data.newpassword
      });
      console.log(res.data.user)
        setUser(res.data.user);
      } catch (error){        
        setUser(null);        
        console.error('Login error:', error.response?.data?.message || error.message);
        throw error;
      }
    }

    return (
      
      <AuthContext.Provider value={{ loading,user,signup, login, logout,deleteUser,updateUser}}>
        {props.children}
      </AuthContext.Provider>
    );
  };

