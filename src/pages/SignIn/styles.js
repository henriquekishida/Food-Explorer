import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;

  animation: 0.5s screenScale;

  .logo{
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 2rem 10rem;
    align-items: center;

    img{
      width: 32rem;
    }
  }

  p{
    font-size: 1.6rem;
    margin-bottom: 8px;
  }

  @media (max-width: 865px){
    flex-direction: column;

    .logo{
      margin: 2rem 0;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  gap: 3.2rem;
  flex-direction: column;
  width: 84rem;
  border-radius: 1.6rem;

  padding: 65px;
  margin: 20rem 13.5rem 20rem 5rem;

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_500};

  label{
    color: ${({ theme }) => theme.COLORS.WHITE_100};

    input{
    border: 1px solid ${({ theme }) => theme.COLORS.WHITE_100};
    border-radius: 5px;
    }
  }

  h1{
    text-align: center;
    font-weight: 500;
    font-size: 3.2rem;
  }

  Button{
    margin-top: 2.4rem;
  }

  >div{
    text-align: center;
  }

  @media (max-width: 865px){
    width: auto;
    margin: 4.0rem 0;
    padding: 0;
    background: none;

    >h1{
      display: none;
    }

    label{
      Input{
      }
    }
  }
`;
