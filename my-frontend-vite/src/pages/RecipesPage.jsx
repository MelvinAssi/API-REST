import styled from "styled-components";
import axios from '../services/axios.jsx'
import { useState, useEffect ,useRef} from "react";

const PageContainer = styled.main`
    min-height: 100vh;
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    background-color: #F6F4F4;
`;
const GridRecipes =styled.div`
    width:100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    margin: 40px;
    justify-items: center;
    align-items: start;
`;
const Recipes =styled.div` 
    display: flex; 
    flex-direction: column;  
    border: 2px solid #2C2727;
    border-radius: 10px;
    padding : 10px;
    gap: 10px;
`;

const StyledH1 = styled.h1`
  color: #FF7517;  
`;
const StyledH2 = styled.h2`
 
`;
const StyledH3 = styled.h3`
 
`;
//#FF7517#3E3939#2C2727#F6F4F4
const RecipesPage = () => {
    const [loading, setLoading] = useState(true);
    const [all, setAll] = useState(true);
    const [recipes, setRecipes] = useState([]);
    const [myRecipes, setMyRecipes] = useState([]);
    const [newRecipes, setNewRecipes] = useState([]);
    const [isCheck, setIsCheck] = useState([]);
    useEffect(() => {
        getRecipes();
        getMyRecipes();
      }, []);
      
    
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
      const getMyRecipes = async () => {
        try {
          setMyRecipes([]);
          const response = await axios.get("/recipes/me");
          setMyRecipes(response.data.recipes);
          setLoading(false);
        } catch (error) {
          console.error('Error fetch recipes :', error);
          setLoading(false); 
        }
      };
      const createRecipe =async() => {
        setLoading(true); 
        try {
          await Promise.all(
            newRecipes.map(newRecipe => {
              return axios.post("/recipes/me", {
                name: newRecipe.name,
                ingredients: newRecipe.ingredients,
                instructions: newRecipe.instructions,
              });
            })
          );
          setNewRecipes([]);
          getMyRecipes();
          setLoading(false); 
        } catch (error) {
          console.error('Error Create recipes :', error);
          setLoading(false); 
        }
      }
      const updateRecipe =async() => {
        setLoading(true); 
        try {
              await Promise.all(
                isCheck.map(id => {
                  const myRecipe = myRecipes.find(r => r.id.toString() === id);
                  return axios.put("/recipes/me/"+id, {
                    name: myRecipe.name,
                    ingredients: myRecipe.ingredients,
                    instructions: myRecipe.instructions,
                  });
                })
              );
              setIsCheck([]);
              getMyRecipes();
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
            isCheck.map(id =>  {
              const response =  axios.delete("/recipes/me/"+id);
            })              
          );
            setIsCheck([]);
            getMyRecipes();
            setLoading(false);
          } catch (error) {
            console.error('Error Delete recipes :', error);
            setLoading(false); 
          }
      }

      
      const addNewRecipe = () => {
        const newRecipe = {
          id: Date.now(), 
          name: "",
          ingredients: "",
          instructions: "",
        };
        setNewRecipes(prev => [...prev, newRecipe]);
      };

      const deleteNewRecipe = () => {
        setNewRecipes(prev => prev.slice(0, -1));
      };

        
    const handleClick = (e) => {
      const { id, checked } = e.target;
      if (checked) {
        setIsCheck(prev => [...prev, id]);
      } else {
        setIsCheck(prev => prev.filter(item => item !== id));
      }
    };

      
    return (      
      <PageContainer>
        <StyledH1>Recipes</StyledH1>
        <div>
            <button onClick={()=>setAll(true)}><StyledH2>All</StyledH2></button>
            <button onClick={()=>setAll(false)}><StyledH2>Your</StyledH2></button>
        </div>
        {loading ? 
        (
            <p>Loading...</p>
        ) : (
            <>
            {all ?(
                <GridRecipes>
                    {recipes.map(( recipe) => (
                        <Recipes key={recipe.id}>
                            <StyledH3>{recipe.name}</StyledH3>
                            <p>Ingredients : {recipe.ingredients}</p>
                            <p>instructions : {recipe.instructions}</p>
                        </Recipes>                        
                    ))}
                </GridRecipes>
            ):(
                <>
                    <div>
                        <button onClick={addNewRecipe}>+</button>
                        <button onClick={deleteNewRecipe}>-</button>
                        <button onClick={createRecipe}>Create</button>
                        <button onClick={updateRecipe}>Update</button>
                        <button onClick={deleteRecipe}>Delete</button>
                    </div>

                    <GridRecipes>
                      {myRecipes.map((recipe, index) => (
                        <Recipes key={recipe.id}>
                          <input
                            type="checkbox"
                            id={recipe.id}
                            onChange={handleClick}
                            checked={isCheck.includes(recipe.id.toString())}
                          />
                          <input
                            type="text"
                            value={recipe.name}
                            onChange={(e) => {
                              const updatedRecipes = [...myRecipes];
                              updatedRecipes[index].name = e.target.value;
                              setMyRecipes(updatedRecipes);
                            }}
                          />
                          <textarea
                            value={recipe.ingredients}
                            onChange={(e) => {
                              const updatedRecipes = [...myRecipes];
                              updatedRecipes[index].ingredients = e.target.value;
                              setMyRecipes(updatedRecipes);
                            }}
                          />
                          <textarea
                            value={recipe.instructions}
                            onChange={(e) => {
                              const updatedRecipes = [...myRecipes];
                              updatedRecipes[index].instructions = e.target.value;
                              setMyRecipes(updatedRecipes);
                            }}
                          />
                        </Recipes>
                      ))}
                      {newRecipes.map((recipe, index) => (
                        <Recipes key={recipe.id}>
                          <input
                            type="text"
                            value={recipe.name}
                            onChange={(e) => {
                              const updatedRecipes = [...newRecipes];
                              updatedRecipes[index].name = e.target.value;
                              setNewRecipes(updatedRecipes);
                            }}
                          />
                          <textarea
                            value={recipe.ingredients}
                            onChange={(e) => {
                              const updatedRecipes = [...newRecipes];
                              updatedRecipes[index].ingredients = e.target.value;
                              setNewRecipes(updatedRecipes);
                            }}
                          />
                          <textarea
                            value={recipe.instructions}
                            onChange={(e) => {
                              const updatedRecipes = [...newRecipes];
                              updatedRecipes[index].instructions = e.target.value;
                              setNewRecipes(updatedRecipes);
                            }}
                          />
                        </Recipes>
                      ))}

                    </GridRecipes>                
                </>

            )}
                  

            </>
      )}
      </PageContainer>
    );
  };

  export default RecipesPage;