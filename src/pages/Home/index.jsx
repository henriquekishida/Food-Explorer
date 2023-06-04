import { CarouselControlls } from '../../components/CarouselControlls';
import { Description } from '../../components/Description';
import { HeaderAdm } from '../../components/HeaderAdm';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { Dishes } from '../../components/Dishes';

import { useState } from "react";

import { Container } from './styles';

export function Home() {
  const [dish, setDish] = useState([]);
  const [favorite, setFavorite] = useState([]);

  const user = JSON.parse(localStorage.getItem("@rocketfood:user"));

  let favoritesId = [];
  let newListDishes = [];

  favorite.map(item => {
    favoritesId.push(item.id)
  });

  for (let item of dish) {
    if (favoritesId.includes(item.id) === false) {
      newListDishes.push(item);
    }
  };

  let newListDishesWithFavorites = newListDishes.concat(favorite);

  const mainDishes = [];

  const desserts = [];

  const drinks = [];

  newListDishesWithFavorites.map(item => {
    switch (item.category) {
      case 'Refeições':
        mainDishes.push(item)

        mainDishes.sort((a, b) => {
          if (a.id < b.id) {
            return -1
          } else {
            return true
          }
        })
        break;

      case 'Sobremesas':
        desserts.push(item)

        desserts.sort((a, b) => {
          if (a.id < b.id) {
            return -1
          } else {
            return true
          }
        })
        break;

      case 'Bebidas':
        drinks.push(item)

        drinks.sort((a, b) => {
          if (a.id < b.id) {
            return -1
          } else {
            return true
          }
        })
        break;

      default:
        alert('Error')
    }
  })

  return (
    <Container>

      {
        user.admin == 1 ?
          <HeaderAdm
            setDish={setDish}
            dish={dish} />
          :
          <Header
            setDish={setDish}
            setFavorite={setFavorite}
            favorite={favorite}
          />
      }

      <Description />

      <main>

        <h2>Pratos principais</h2>
        <CarouselControlls>
          {
            mainDishes && mainDishes.map((item, index) => (
              <div key={String(index)}>
                <Dishes
                  date={item}
                />
              </div>
            ))
          }
        </CarouselControlls>

        <h2>Sobremesas</h2>
        <CarouselControlls>
          {
            desserts && desserts.map((item, index) => (
              <div key={String(index)}>
                <Dishes
                  date={item}
                />
              </div>
            ))
          }
        </CarouselControlls>

        <h2>Bebidas</h2>
        <CarouselControlls>
          {
            drinks && drinks.map((item, index) => (
              <div key={String(index)}>
                <Dishes
                  date={item}
                />
              </div>
            ))
          }
        </CarouselControlls>

      </main>

      <Footer />
    </Container>
  )
}