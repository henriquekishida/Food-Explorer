import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { CgBorderStyleSolid } from 'react-icons/cg';
import { GoPlus } from 'react-icons/go';

import { Popover } from '../../components/Popover';
import { api } from "../../services/api";
import { Button } from '../Button';

import { useNavigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import { Container } from './styles';

export function Dishes({ date, ...rest }) {
  const [amount, setAmount] = useState(1);
  const [loading, setLoading] = useState(false);

  const [event, setEvent] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("@rocketfood:user"));

  function AddAmount() {
    setAmount(prevState => prevState + 1)
  };

  function removeAmount() {
    if (amount > 1) {
      setAmount(prevState => prevState - 1);
    } else {
      return
    };
  };

  async function addDishInList() {
    await api.post("/requests", {
      title: date.title,
      description: date.description,
      price: date.price,
      category: date.category,
      amount,
      dish_id: date.id,
      user_id: user.id
    });
    setForList();
    setEvent(true);
  };

  async function setForList() {
    const response = await api.get(`/requests/${user.id}`)
    const applicationLength = response.data.length;
    localStorage.setItem("@rocketfood:applicationLength", applicationLength)
  };

  async function addFavorite() {
    await api.post(`favorites/${date.id}`, {
      title: date.title,
      imagem: date.imagem,
      category: date.category,
      description: date.description,
      price: date.price,
      dish_id: date.id,
      user_id: user.id,
    });
  };

  async function actionCheck() {
    addFavorite();
  };

  function admEdit() {
    navigate(`/AdminEdit/${date.id}`);
  };

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [])

  return (
    <Container {...rest}>

      <Popover
        title={`${date.title}, incluido na lista de pedidos!`}
        event={event}
      />

      {loading ?
        <MoonLoader
          size={window.innerWidth < 830 ? 30 : 50}
          color={'#ffffff'}
          loading={loading}
        />
        :
        <div>
          {user.id == 1 ?
            <div className='wrapper_favorite'>
              <Button
                onClick={admEdit}
                id='buttonFavorite'
              />
              {/* pencil svg */}
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M13.7518 4.81056L21.1901 12.2489M8.00046 25.0002H2.06311C1.78129 25.0002 1.51101 24.8883 1.31173 24.689C1.11245 24.4897 1.00049 24.2194 1.00049 23.9376V18.0003C1.00001 17.8623 1.02675 17.7256 1.07917 17.5979C1.13159 17.4703 1.20867 17.3542 1.306 17.2564L17.2452 1.31724C17.3441 1.21684 17.4619 1.1371 17.5919 1.08268C17.7219 1.02826 17.8614 1.00023 18.0023 1.00023C18.1432 1.00023 18.2827 1.02826 18.4127 1.08268C18.5427 1.1371 18.6605 1.21684 18.7594 1.31724L24.6835 7.2413C24.7839 7.34018 24.8636 7.45804 24.918 7.58802C24.9725 7.718 25.0005 7.8575 25.0005 7.99842C25.0005 8.13933 24.9725 8.27883 24.918 8.40881C24.8636 8.53879 24.7839 8.65665 24.6835 8.75553L8.74429 24.6947C8.64648 24.792 8.53043 24.8691 8.4028 24.9216C8.27516 24.974 8.13844 25.0007 8.00046 25.0002Z" stroke="#E1E1E6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            :
            <div className='wrapper_favorite'>
              <Button
                onClick={actionCheck}
                id='buttonFavorite'
              />

              {date.user_id == user.id ?
                <AiFillHeart id='fillHeart' /> : <AiOutlineHeart />}
            </div>
          }

          <div className={window.innerWidth < 832 ? 'wrapper_dish_mobile' : ''}>
            <Link to={`/Details/${date.id}`}>

              <div className='wrapper_img'>
                <img src={`${api.defaults.baseURL}/files/${date.imagem}`} alt="imagem do prato" />
              </div>

              <div className='wrapper_title'>
                <h1>{date.title}</h1>
                <RiArrowDropRightLine />
              </div>

              <div className='wrapper_description'>
                <p>{date.description}</p>
              </div>

              <div className='wrapper_price'>
                <span>{Number(date.price).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</span>
              </div>

            </Link>
          </div>

          {
            user.id == 1 ?
              null
              :
              <div className='wrapper_buttons' id={window.innerWidth < 832 ? 'wrapper_buttons_mobile' : ''}>
                <div className='wrapper_controll'>
                  <button onClick={removeAmount} id='buttonLess'><CgBorderStyleSolid /></button>
                  <span>{String(amount).padStart(2, "0")}</span>
                  <button onClick={AddAmount} id='buttonMore'><GoPlus /></button>
                </div>

                <Button
                  onClick={addDishInList}
                  title='Incluir'
                />
              </div>
          }
        </div>}

    </Container>
  )
}
