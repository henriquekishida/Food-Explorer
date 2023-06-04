import { RiArrowDropLeftLine } from 'react-icons/ri';
import { MdOutlineFileUpload } from 'react-icons/md';

import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { useParams, useNavigate } from 'react-router-dom';

import { Ingredient } from '../../components/Ingredient';
import { HeaderAdm } from '../../components/HeaderAdm';
import { Footer } from '../../components/Footer';

import { Container, Form } from './styles';

export function AdminEdit() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [ingredientsRegistered, setIngredientsRegistered] = useState([]);

  const navigate = useNavigate();
  const params = useParams();

  function handleAddIngredient() {
    if (!newIngredient.trim()) {
      return;
    }
    
    setIngredients(prevState => [...prevState, newIngredient.trim()]);
    setNewIngredient("");
  }

  function handleRemoveIngredient(ingredientDeleted) {
    setIngredients(prevState => prevState.filter(ingredient => ingredient !== ingredientDeleted));
  }

  useEffect(() => {
    async function getIngredients() {
      const response = await api.get(`/ingredients/${params.id}`);
      setIngredientsRegistered(response.data);
    }
    getIngredients();
  }, []);

  async function updateDish(e) {
    if (ingredients.length === 0) {
      e.preventDefault();
      return alert("Campo de ingredientes está vazio!");
    }

    alert("Prato alterado com sucesso!");
    navigate("/");

    await api.put(`dishes/${params.id}`, {
      title,
      category,
      price,
      description,
      ingredients,
    });

    await api.put(`/ingredients/${params.id}`, {
      ingredients,
    });
  }

  async function deleteDish() {
    alert("Prato excluído com sucesso.");
    navigate("/");
    await api.delete(`dishes/${params.id}`);
  }

  function handleBack() {
    navigate(`/Details/${params.id}`);
  }

  useEffect(() => {
    try {
      async function fetchDish() {
        const response = await api.get(`dishes/${params.id}`);
        setTitle(response.data[0].title);
        setCategory(response.data[0].category);
        setPrice(response.data[0].price);
        setDescription(response.data[0].description);
      }
      fetchDish();
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Não foi possível carregar os dados do prato.");
      }
    }
  }, []);

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddIngredient();
    }
  }

  return (
    <Container>
      <HeaderAdm />

      <Form>
        <div className="wrapper_title_and_button">
          <button onClick={handleBack}>
            <RiArrowDropLeftLine />
            <span>voltar</span>
          </button>
          <h1>Editar prato</h1>
        </div>

        <div className="wrapper_inpunts">
          <div className="wrapper_dish">
            <div>
              <label>
                Imagem do prato
                <div id="wrapper_file">
                  <MdOutlineFileUpload />
                  Selecione imagem
                </div>
              </label>

              <div className="wrapper_name_category">
                <label>
                  Nome
                  <input
                    maxLength={25}
                    value={title}
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </label>

                <label>
                  Categoria
                  <select onChange={(e) => setCategory(e.target.value)} id="select">
                    <option value="">{category}</option>
                    <option value="Refeições">Refeições</option>
                    <option value="Sobremesas">Sobremesas</option>
                    <option value="Bebidas">Bebidas</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="wrapper_ingredients_and_price">
              <div>
                <label htmlFor="ingredients">
                  Ingredientes
                </label>
                <div className="ingredients">
                  <Ingredient
                    isNew
                    placeholder="ingrediente"
                    onChange={e => setNewIngredient(e.target.value)}
                    value={newIngredient}
                    onKeyPress={handleKeyPress}
                    onClick={handleAddIngredient}
                  />

                  <div className="ingredients_registered">
                    {ingredientsRegistered &&
                      ingredientsRegistered.map((ingredient, index) => (
                        <Ingredient
                          shadow
                          value={ingredient.name}
                          key={String(index)}
                        />
                      ))}
                  </div>

                  {ingredients.map((ingredient, index) => (
                    <Ingredient
                      key={String(index)}
                      value={ingredient}
                      onClick={() => handleRemoveIngredient(ingredient)}
                    />
                  ))}
                </div>
              </div>

              <label>
                Preço
                <input
                  value={price}
                  type="number"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
            </div>
          </div>

          <label>
            Descrição
            <textarea
              maxLength={150}
              value={description}
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>

        <div className="buttons">
          <button onClick={deleteDish}>Excluir prato</button>
          <button onClick={updateDish}>Salvar alterações</button>
        </div>
      </Form>

      <div className="wrapper_footer">
        <Footer />
      </div>
    </Container>
  );
}
