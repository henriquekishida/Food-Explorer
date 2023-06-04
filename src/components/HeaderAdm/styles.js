import styled from 'styled-components';

export const Container = styled.div`
  grid-area: Header;
  position: fixed;
  z-index: 3;
  
  display: flex;
  justify-content: space-between;
  gap: 3rem;
  
  width: 100%;
  padding: 2.4rem 12rem;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_500};

  span{
    font-size: 2.4rem;
  }

  .wrapper_button_logo{
    display: flex;
    flex-direction: column;
    align-items: end;

    >span{
      padding-right: 5px;
      margin-top: -5px;
      font-size: 1.2rem;
      color: ${({ theme }) => theme.COLORS.PRICE_$};
    }

    button{
      background: none;
      border: none;
    }
  }

  .wrapper_menu{
    display: flex;
    align-items: center;

    .menu{
      svg{
        font-size: 3rem;
        margin-top: 2px;
      }
    }
  }

  .wrapper_input{
    width: 65%;
  }

  .logOut{
    background: none;
    border: none;

    >svg{
      min-height: 25px;
      min-width: 25px;
      
      opacity: .8;
      color: ${({ theme }) => theme.COLORS.WHITE_900};
    }
  }

  >svg:hover{
    opacity: 1;
  }

  .favorites{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3rem;

    width: 50%;
    
    h2{
      font-weight: 400;
      font-size: 1.6rem;
      color: ${({ theme }) => theme.COLORS.WHITE_500};
    }
  }

  .wrapper_buttons{
    display: flex;
    align-items: center;
    gap: 2.4rem;
  }

  @media (max-width: 1200px){
    padding: 35px 2vw;
    gap: 10px;
    
    .wrapper_menu button{
      margin: 0;
    }

    .wrapper_buttons{
      gap: 0;
      >button{
        width: 100px;
      }
    }
    
    .favorites a h2{
      text-align: center;
    }
  }

  @media (max-width: 950px){
    flex-direction: row-reverse;
    padding: 35px 10px;

    .wrapper_button_logo{
      justify-content: center;
      flex-direction: row;
      align-items: center;
      gap: 10px;

      width: 100%;
    }

    .wrapper_menu{
      .sidebar{
        position: absolute;
        left: 20px;
        
        display: flex;
        align-content: center;

        svg{
          margin-right: 10px;
        }
      }
    }
    .favorites, .wrapper_input, .logOut, #buttonAddDish{
      display: none;
    }        
  }
`;

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  width: clamp(10rem, 21rem, 21rem);
  height: 4.8rem;

  padding: 15px;
  border-radius: 5px;

  border: none;
  color: ${({ theme }) => theme.COLORS.WHITE_900};
  background-color: ${({ theme }) => theme.COLORS.RED_900};

  >span{
    font-size: 1.4rem;
  }
`;
