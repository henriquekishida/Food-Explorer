import logoHeaderFoodExplorer from '../../assets/logoHeaderFoodExplorer.svg';
import lista from '../../assets/piceOfPaper.svg';
import { AiOutlineMenu } from 'react-icons/ai';
import { VscClose } from 'react-icons/vsc';
import { FiSearch } from 'react-icons/fi';
import { FiLogOut } from 'react-icons/fi';

import { Input } from '../../components/Input';
import { api } from "../../services/api";
import { Sidebar } from '../Sidebar';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/auth';
import { Link } from 'react-router-dom';

import { Container, Button, MobileButton } from './styles';

export function Header({ setDish = () => { }, setFavorite = () => { }, favorite }) {
  const [orderLength, setOrderLength] = useState([]);
  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("@rocketfood:user"));

  const navigate = useNavigate();
  const { signOut } = useAuth();

  useEffect(() => {
    async function fetchDish() {
      const response = await api.get(`/dishes`);
      const filteredDishes = response.data.filter(dish => {
        const dishTitle = dish.title.toLowerCase();
        const dishIngredients = dish.ingredients || {};
        const ingredientKeys = Object.keys(dishIngredients);
        const searchTerm = search.toLowerCase();
        return dishTitle.includes(searchTerm) || ingredientKeys.some(key => dishIngredients[key].toLowerCase().includes(searchTerm));
      });
      setDish(filteredDishes);
    }
    fetchDish();
  }, [search]);
  
  

  useEffect(() => {
    async function fetchFavorite() {
      const response = await api.get(`/favorites/${user.id}?title=${search}`);
      setFavorite(response.data);
    }
    fetchFavorite();
  }, [search, favorite]);

  useEffect(() => {
    async function getOrderLength() {
      const response = await api.get(`/requests/${user.id}`);
      setOrderLength(response.data);
    }
    getOrderLength();
  }, [orderLength])

  function logOut() {
    navigate("/");
    signOut();
  };

  function turnHomePage() {
    navigate("/");
  };

  function payment() {
    navigate("/Payment");
  };

  //================Moblie===================

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar)

  useEffect(() => {
    const menu = document.querySelector('.menu');

    if (window.innerWidth < 832) {
      menu.classList.remove('hidden');
    } else {
      menu.classList.add('hidden');
    };

    if (window.innerWidth > 832) {
      setSidebar(false)
    };
  }, [window.innerWidth]);

  useEffect(() => {
    const menu = document.querySelector('.menu');

    if (sidebar === true) {
      menu.classList.add('formatSidebarMenu');
    } else {
      menu.classList.remove('formatSidebarMenu');
    };
  }, [sidebar]);

  return (
    <Container>
      <div className="wrapper_menu">

        <div className='menu hidden'>
          {sidebar === true ?
            <div className='sidebar'>
              <VscClose onClick={showSidebar} />
              <span>Menu</span>
            </div>
            :
            <AiOutlineMenu onClick={showSidebar} />
          }
          {
            sidebar
            &&
            <Sidebar
              active={setSidebar}
              setSearch={setSearch}
              search={search}
            />
          }
        </div>

        <button onClick={turnHomePage}>
          <img src={logoHeaderFoodExplorer} alt='logo food Explorer' />
        </button>
      </div>

      <div className='wrapper_input'>
        <Input
          icon={FiSearch}
          placeholder="Busque pelas opções de pratos"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className='favorites'>
        <Link
          to={'/Favorites'}>
          <h2>Meus Favoritos</h2>
        </Link>

        <Link to='/OrderHistory'><h2>Histórico de pedidos</h2></Link>
      </div>

      <div className={sidebar === true ? 'hidden' : ''}>
        {window.innerWidth < 1060 ?
          <MobileButton onClick={payment}>
            <img src={lista} alt='lista' />
            <span>{orderLength.length ?? 0}</span>
          </MobileButton>
          :
          <Button onClick={payment}>
            <img src={lista} alt='lista' />
            <span>Pedidos ({orderLength.length ?? 0})</span>
          </Button>
        }
      </div>

      <button onClick={logOut} className="logOut">
        <FiLogOut />
      </button>
    </Container>
  )
}