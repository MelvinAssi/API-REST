import styled from "styled-components";
import axios from '../services/axios.jsx'
import { useState, useEffect ,useRef} from "react";
import AdminModal from "../components/AdminModal.jsx";

const PageContainer = styled.main`
    min-height: 100vh;
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    background-color: #F6F4F4;
`;

const Table = styled.table`
  width: 80%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  border: 1px solid #2C2727;
  background-color: #3E3939;
  color: #F6F4F4;
  padding: 10px;  
  text-align: left;
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

const TableCell = styled.td`
  padding: 10px;
  background-color: #F6F4F4;
  border: 1px solid #2C2727;
  color: #2C2727;
`;
const Input = styled.input`
  background-color: #F6F4F4;
  font-size:1rem;
  border: none;
`;
const Label=styled.label`
  font-size:1.2rem;
  color:#f6f4f4;
  @media (max-width: 768px) {
  }
`;

const Button = styled.button`
  border-radius : 16px;
  padding : 5px 20px;
  margin: 10px;
  background-color : #FF7517;
  color:#3E3939;
  cursor: pointer;
  border: none;
  box-shadow: 0 10px 4px rgba(0,0,0,0.10);

  @media (max-width: 768px) {
  }
`;

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalActionType, setModalActionType] = useState(""); 

  const [newUsers, setNewUsers] = useState([]);

const openModal = (actionType) => {
  setModalActionType(actionType);
  setShowModal(true);
};

const handleConfirmAction = (password) => {
  if (modalActionType === 'delete') {
    deleteUser(password);
  } else if (modalActionType === 'update') {
    updateUser(password);
  } else if (modalActionType === 'create') {
    createUser(password);
  }
  setShowModal(false);
};

  const handleSelectAll = () => {
    if (!isCheckAll) {
      const allIds = users.map(user => user.id.toString());
      setIsCheck(allIds);
    } else {
      setIsCheck([]);
    }
    setIsCheckAll(!isCheckAll);
  };
  
  const handleClick = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setIsCheck(prev => [...prev, id]);
    } else {
      setIsCheck(prev => prev.filter(item => item !== id));
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  

  const getUsers = async () => {
    try {
      const response = await axios.get("/admin");
      setUsers(response.data.users);
      setLoading(false);
    } catch (error) {
      console.error('Error fetch users :', error);
      setLoading(false); 
    }
  };

  const deleteUser = async (adminpassword) => {
    try {
      await Promise.all(
        isCheck.map(id =>          
          axios.delete("/admin", {
            data: { adminpassword, id },
          })
          
        )
      );
      setShowModal(false);
      setIsCheck([]);
      setIsCheckAll(false);
      getUsers();
    } catch (error) {
      console.error('Error delete user:', error.response?.data || error.message);
    }
  

  };
  const updateUser =async(adminpassword) => {
    try {
      await Promise.all(
        isCheck.map(id => {
          console.log(id)
          const user = users.find(u => u.id.toString() === id);
          
          return axios.put("/admin", {
            adminpassword,
            id: user.id,
            newusername: user.username,
            newemail: user.email,
            is_admin: user.is_admin,
          });
        })
      );
  

      setShowModal(false);
      setIsCheck([]);
      setIsCheckAll(false);
      getUsers();
    } catch (error) {
      console.error('Error update users :', error);
    }
  }
  const createUser =async(adminpassword) => {
    try {
      await Promise.all(
        newUsers.map(newUser => {
          if (!newUser.username || !newUser.email) return;
          console.log(newUser);
          return axios.post("/admin", {
            adminpassword,
            username: newUser.username,
            email: newUser.email,
            is_admin: newUser.is_admin,
          });
        })
      );
      setShowModal(false);
      setNewUsers([]);
      setIsCheck([]);
      setIsCheckAll(false);
      getUsers();
    } catch (error) {
      console.error('Error create users :', error);
    }
  }

  const addNewUser = () => {
    const newUser = {
      id: Date.now(), 
      username: "",
      email: "",
      is_admin: false,
    };
    setNewUsers(prev => [...prev, newUser]);
  };
  const deleteNewUser = () => {
    setNewUsers(prev => prev.slice(0, -1));
  };
  return (
    <PageContainer>
      <StyledH1>Admin</StyledH1>
      <div style={{padding:"20px" }}>
        <Button onClick={() => openModal('update')}>Update</Button>
        <Button onClick={addNewUser}>+</Button>
        <Button onClick={deleteNewUser}>-</Button>
        <Button onClick={() => openModal('create')}>Create</Button>
        <Button onClick={() => openModal('delete')}>Delete</Button>
      </div>


      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Table>
            <thead>
              <tr>
                <TableHeader><input type="checkbox" onChange={handleSelectAll} checked={isCheckAll}/> </TableHeader>
                <TableHeader>id</TableHeader>
                <TableHeader>Username</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Admin</TableHeader>
                <TableHeader>Created At</TableHeader>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <TableCell><input type="checkbox" id={user.id}  onChange={handleClick} checked={isCheck.includes(user.id.toString())}/> </TableCell>
                  <TableCell>{user.id}</TableCell>
                  <TableCell> <Input type="text"  value={user.username}
                      onChange={(e) => {
                        const updatedUsers = [...users];
                        updatedUsers[index].username = e.target.value;
                        setUsers(updatedUsers);
                      }}
                    />
                  </TableCell>
                  <TableCell><Input type="email" value={user.email}
                      onChange={(e) => {
                        const updatedUsers = [...users];
                        updatedUsers[index].email = e.target.value;
                        setUsers(updatedUsers);
                      }}
                    />
                  </TableCell>
                  <TableCell><input type="checkbox" checked={user.is_admin}
                      onChange={(e) => {
                        const updatedUsers = [...users];
                        updatedUsers[index].is_admin = e.target.checked;
                        setUsers(updatedUsers);
                      }}                  
                  />
                  </TableCell>
                  <TableCell>{user.created_at}</TableCell>
                </tr>
              ))}
              {newUsers.map((user, index) => (
                <tr key={user.id}>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    <Input
                      type="text"
                      value={user.username}
                      onChange={(e) => {
                        const updated = [...newUsers];
                        updated[index].username = e.target.value;
                        setNewUsers(updated);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="email"
                      value={user.email}
                      onChange={(e) => {
                        const updated = [...newUsers];
                        updated[index].email = e.target.value;
                        setNewUsers(updated);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={user.is_admin}
                      onChange={(e) => {
                        const updated = [...newUsers];
                        updated[index].is_admin = e.target.checked;
                        setNewUsers(updated);
                      }}
                    />
                  </TableCell>
                  <TableCell></TableCell>
                </tr>
              ))}
            </tbody>
          </Table>    
        </>     
      )}
      {showModal && (
        <AdminModal
          actionType={modalActionType} // 'delete', 'update' ou 'create'
          onConfirm={handleConfirmAction}
          onClose={() => setShowModal(false)}
        />
      )}

    </PageContainer>
  );
};

export default AdminPage;