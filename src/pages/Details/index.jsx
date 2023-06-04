import { CgBorderStyleSolid } from 'react-icons/cg';
import { IoIosArrowBack } from 'react-icons/io';
import { GoPlus } from 'react-icons/go';

import { HeaderAdm } from '../../components/HeaderAdm';
import { Popover } from '../../components/Popover';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { api } from '../../services/api';

import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Container } from './styles';

export function Details() {
  const [adm, setAdm] = useState("");
  const [dish, setDish] = useState();
  const [ingredient, setIngredient] = useState([]);
  const [amount, setAmount] = useState(1);
  const [loading, setLoading] = useState(false);

  const [event, setEvent] = useState(false);

  const user = JSON.parse(localStorage.getItem("@rocketfood:user"));
  localStorage.setItem("@rocketfood:dishDetails", JSON.stringify(dish));

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    try {
      async function getDish() {
        const response = await api.get(`/dishes/${params.id}`);
        setDish(response.data[0])
        setIngredient(response.data[1])
      }
      getDish();
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message)
      } else {
        alert('Não foi possível carregar os dados desse prato.')
      }
    };
  }, []);

  useEffect(() => {
    return setAdm(user.admin);
  }, []);

  function handleEdit() {
    setLoading(true)
    return navigate(`/AdminEdit/${dish.id}`);
  };

  function handleBack() {
    return navigate("/");
  };

  function AddAmount() {
    setAmount(prevState => prevState + 1)
  };

  function removeAmount() {
    if (amount > 1) {
      setAmount(prevState => prevState - 1)
    } else {
      return
    };
  };

  async function addDishInList() {
    setEvent(true);
    setLoading(true);
    const dishDetails = JSON.parse(localStorage.getItem("@rocketfood:dishDetails"));

    await api.post("/requests", {
      title: dishDetails.title,
      description: dishDetails.description,
      price: dishDetails.price,
      category: dishDetails.category,
      amount,
      dish_id: dishDetails.id,
      user_id: user.id
    });
    setLoading(false);
  };

  return (
    <Container>

      {adm == 1 ? <HeaderAdm /> : <Header />}


      {dish &&
        <section className='wrapper_dish_details'>
          <Popover
            title={`${dish.title}, incluido na lista de pedidos!`}
            event={event}
          />

          <div className='turn_back'>
            <button onClick={handleBack}>
              <IoIosArrowBack />
              <span>voltar</span>
            </button>
          </div>

          <div className='wrapper_img_dish'>
            <img src={`${api.defaults.baseURL}/files/${dish.imagem}`} alt="imagem do prato" />
          </div>

          <div className='wrapper_description'>
            <div className='wrapper_title'>
              <h1>{dish.title}</h1>
              <p>{dish.description}</p>
            </div>

            <div className='wrapper_ingredients'>
              <ul>
                {
                  ingredient.map((e, index) => {
                    return (
                      <li key={String(index)}>
                        {ingredient[index].name}
                      </li>
                    )
                  })
                }
              </ul>
            </div>

            <div className='wrapper_buttons'>
              {adm == 1 ?
                null
                :
                <div>
                  <button onClick={removeAmount} id='buttonLess'><CgBorderStyleSolid /></button>
                  <span>{String(amount).padStart(2, "0")}</span>
                  <button onClick={AddAmount} id='buttonMore'><GoPlus /></button>
                </div>
              }

              {
                adm == 1 ?
                  <Button
                    onClick={handleEdit}
                    title={loading ? 'Loading...' : 'Editar prato'}
                  />
                  :
                  <button
                    onClick={addDishInList}
                    id="btnInclude">{loading ? 'Loading...' : `incluir - R$ ${dish.price * amount}`}
                  </button>
              }
            </div>
          </div>
        </section>
      }

      <Footer />
    </Container>
  )
}