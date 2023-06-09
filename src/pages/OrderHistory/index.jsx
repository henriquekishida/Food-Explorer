import statusOrange from '../../assets/statusOrange.svg';
import statusGreen from '../../assets/statusGreen.svg';
import statusRed from '../../assets/statusRed.svg';

import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import { api } from '../../services/api';

import { useEffect, useState } from 'react';

import { Container, SectionMobile } from './styles';

function formattingDateAndTime(datetime) {
  const [date, time] = datetime.split(" ");
  const [yyyy, mm, dd] = date.split("-");
  const [hour, minutes] = time.split(":");
  const newHour = hour - 3;
  const hourFormatted = `${newHour}:${minutes}`;
  const dateFormatted = `${dd}/${mm}/${yyyy} às ${hourFormatted}`;

  return { dateFormatted };
}

export function OrderHistory() {
  const [orderHistory, setOrderHistory] = useState([]);

  const user = JSON.parse(localStorage.getItem("@rocketfood:user"));

  useEffect(() => {
    try {
      async function getOrderHistory() {
        const response = await api.get(`/orderHistory/${user.id}`);
        setOrderHistory(response.data);
      }
      getOrderHistory();
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message)
      } else {
        alert('Não foi possível carregar o histórico de pedido, tente novamente mais tarde.');
      }
    };
  }, [orderHistory]);

  return (
    <Container>
      <Header />

      <h1>Histórico de Pedidos</h1>

      {window.innerWidth < 832 ?
        <div className='wrapper_mobile'>
          {orderHistory &&
            orderHistory.map((item, index) => {
              return (
                <SectionMobile key={String(index)}>
                  <div className='wrapper_header'>

                    <span>Cod {item.id}</span>


                    <div className='wrapper_status'>
                      {
                        item.status === 'pendente' ?
                          <img id='imgStatus' src={statusRed} alt='ball status indicator' />
                          :
                          item.status === 'preparando' ?
                            <img src={statusOrange} alt='ball status indicator' />
                            :
                            <img src={statusGreen} alt='ball status indicator' />
                      }
                      {item.status}
                    </div>
                    {formattingDateAndTime(item.created_at).dateFormatted}
                  </div>

                  {item.details}
                </SectionMobile>
              )
            })}
        </div>
        :
        <section>
          <table>
            <thead>
              <tr>
                <th>Status</th>
                <th>Código</th>
                <th>Detalhamento</th>
                <th>Data e hora</th>
              </tr>
            </thead>

            <tbody>
              {orderHistory &&
                orderHistory.map((item, index) => {
                  return (
                    <tr key={String(index)}>
                      <td>
                        {
                          item.status === 'pendente' ?
                            <img id='imgStatus' src={statusRed} alt='ball status indicator' />
                            :
                            item.status === 'preparando' ?
                              <img src={statusOrange} alt='ball status indicator' />
                              :
                              <img src={statusGreen} alt='ball status indicator' />
                        }

                        {item.status}
                      </td>
                      <td>{item.id}</td>
                      <td>{item.details}</td>
                      <td>{formattingDateAndTime(item.created_at).dateFormatted}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </section >
      }

      <Footer />
    </Container>
  )
}