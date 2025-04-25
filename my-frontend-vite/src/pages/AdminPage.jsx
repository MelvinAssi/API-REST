import styled from "styled-components";
import axios from '../services/axios.jsx'
import { useState, useEffect } from "react";

const PageContainer = styled.main`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #F6F4F4;
`;

const Table = styled.table`
  width: 80%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHeader = styled.th`
  border: 1px solid #2C2727;
  background-color: #3E3939;
  color: #F6F4F4;
  padding: 10px;  
  text-align: left;
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #2C2727;
  color: #2C2727;
`;

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("/users");
      setUsers(response.data.users);
      setLoading(false);
    } catch (error) {
      console.error('Error fetch users :', error);
      setLoading(false); 
    }
  };

  return (
    <PageContainer>
      <h1>Admin</h1>
      <div>
        <button>Update</button>
        <button>New</button>
        <button>Delete</button>
      </div>


      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <TableHeader> <input type="checkbox" /> </TableHeader>
                <TableHeader>id</TableHeader>
                <TableHeader>Username</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Created At</TableHeader>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <TableCell><input type="checkbox"></input></TableCell> 
                  <TableCell><p>{user.id}</p></TableCell>
                  <TableCell><p> {user.username}</p></TableCell>
                  <TableCell><p> {user.email}</p></TableCell>
                  <TableCell><p> {user.created_at}</p></TableCell>              
                </tr> 
              ))}
            </tbody>
          </Table>    
        </>       

      )}
    </PageContainer>
  );
};

export default AdminPage;