import styled from "styled-components";
import axios from '../services/axios.jsx'
import { useState, useEffect ,useRef} from "react";
import AdminModal from "../components/AdminModal.jsx";
import TextareaAutosize from 'react-textarea-autosize';

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
const StyledH2 = styled.h2`
 
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
const Tab = styled.button`
  color:#2C2727;
  background-color: none;
  border: none;
  padding:10px;
  cursor: pointer;
`;
const TextArea = styled(TextareaAutosize)`
  width:95%;
  background-color:#F6F4F4;
  border: none;
  resize: none;
  margin:10px;
`;

const AdminPage = () => {
  const [tabUsers,setTabUsers]= useState(true)
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const [isCheckRecipeAll, setIsCheckReceipeAll] = useState(false);
  const [isCheckRecipe, setIsCheckRecipe] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [modalActionType, setModalActionType] = useState(""); 

  const [newUsers, setNewUsers] = useState([]);

  const [recipes, setRecipes] = useState([]);

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
    getRecipes();
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
  const createUser = async(adminpassword) => {
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

  const getRecipes = async () => {
    try {
      const response = await axios.get("/recipes");
      setRecipes(response.data.recipes);
      setLoading(false);
    } catch (error) {
      console.error('Error fetch recipes :', error);
      setLoading(false); 
    }
  };

  const updateRecipe =async() => {
    setLoading(true); 
    try {
          await Promise.all(
            isCheckRecipe.map(id => {
              const recipe = recipes.find(r => r.id.toString() === id);
              return axios.put("/recipes/admin/"+id, {
                name: recipe.name,
                ingredients: recipe.ingredients,
                instructions: recipe.instructions,
              });
            })
          );
          setIsCheck([]);
          getRecipes();
          setLoading(false);
        } catch (error) {
          console.error('Error Update recipes :', error);
          setLoading(false); 
        }
  }
  const deleteRecipe =async() => {
    setLoading(true); 
    try {
      await Promise.all(
        isCheckRecipe.map(id =>  {
          const response =  axios.delete("/recipes/admin/"+id);
        })              
      );
        setIsCheck([]);
        getRecipes();
        setLoading(false);
      } catch (error) {
        console.error('Error Delete recipes :', error);
        setLoading(false); 
      }
  }

  const handleSelectRecipeAll = () => {
    if (!isCheckRecipeAll) {
      const allIds = recipes.map(recipe => recipe.id.toString());
      setIsCheckRecipe(allIds);
    } else {
      setIsCheckRecipe([]);
    }
    setIsCheckReceipeAll(!isCheckRecipeAll); 
  };
  
  const handleClickRecipe = (e) => {
    const { id, checked } = e.target;
  
    if (checked) {
      setIsCheckRecipe(prev => [...prev, id]);
    } else {
      setIsCheckRecipe(prev => prev.filter(item => item !== id));
    }
  };
  



  return (
    <PageContainer>
      <StyledH1>Admin</StyledH1>
      <div>
        <Tab onClick={() => setTabUsers(true)}><StyledH2>Users</StyledH2></Tab>
        <Tab onClick={() => setTabUsers(false)}><StyledH2>Recipes </StyledH2></Tab>
      </div>




      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
        {tabUsers ? (
          <>
            <div style={{padding:"20px" }}>
              <Button onClick={() => openModal('update')}>Update</Button>
              <Button onClick={addNewUser}>+</Button>
              <Button onClick={deleteNewUser}>-</Button>
              <Button onClick={() => openModal('create')}>Create</Button>
              <Button onClick={() => openModal('delete')}>Delete</Button>
            </div>
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
            {showModal && (
              <AdminModal
                actionType={modalActionType} // 'delete', 'update' ou 'create'
                onConfirm={handleConfirmAction}
                onClose={() => setShowModal(false)}
              />
      )}  
          </>   
        ) : (
            <>
            <div>
              <Button onClick={updateRecipe}>Update</Button>
              <Button onClick={deleteRecipe}>Delete</Button>
            </div>
            <Table>
              <thead>
                <tr>
                  <TableHeader><input type="checkbox" onChange={handleSelectRecipeAll} checked={isCheckRecipeAll}/> </TableHeader>
                  <TableHeader>id</TableHeader>
                  <TableHeader>user id</TableHeader>
                  <TableHeader>name</TableHeader>
                  <TableHeader>Ingredients</TableHeader>
                  <TableHeader>instructions</TableHeader>
                </tr>
              </thead>
              <tbody>
              {recipes.map(( recipe, index) => (
                <tr key={recipe.id}>
                    <TableCell>
                      <input
                        type="checkbox"
                        id={recipe.id}
                        onChange={handleClickRecipe}
                        checked={isCheckRecipe.includes(recipe.id.toString())}
                      />
                    </TableCell>                    
                    <TableCell>
                      <p>{recipe.id}</p>
                    </TableCell>
                    <TableCell>
                      <p>{recipe.user_id}</p>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="text"
                        value={recipe.name}
                        onChange={(e) => {
                          const updatedRecipes = [...recipes];
                          updatedRecipes[index].name = e.target.value;
                          setRecipes(updatedRecipes);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextArea
                        value={recipe.ingredients}
                        onChange={(e) => {
                          const updatedRecipes = [...recipes];
                          updatedRecipes[index].ingredients = e.target.value;
                          setRecipes(updatedRecipes);
                        }}
                      />     
                    </TableCell>
                    <TableCell>
                      <TextArea
                          value={recipe.instructions}
                          onChange={(e) => {
                            const updatedRecipes = [...recipes];
                            updatedRecipes[index].instructions = e.target.value;
                            setRecipes(updatedRecipes);
                          }}
                      />
                    </TableCell>
                </tr>
                     
              ))}      
              </tbody>
            </Table>  



 
          </>
        )}
        </>

  
      )}


    </PageContainer>
  );
};

export default AdminPage;