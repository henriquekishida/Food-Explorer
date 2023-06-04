import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
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
        width: 27rem;
      }
  }

  p{
    font-size: 1.6rem;
    margin-bottom: 8px;
  }

  @media (min-width: 992px){
    flex-direction: row;

    .logo{
        margin: 2rem 0;

      img{
      width: 32rem;
      }
    }
  }
`;

export const Form = styled.form`
  display: flex;
  gap: 3.2rem;
  flex-direction: column;
  border-radius: 1.6rem;

  width: auto;
  padding: 0;
  margin: 0 3rem;

  background: none;

  label{
    color: ${({ theme }) => theme.COLORS.WHITE_100};
  }

  h1{
    display: none;
  }

  Button{
    margin-top: 2.4rem;
  }

  >div{
    text-align: center;
  }

  @media (min-width: 992px){
    width: 84rem;
    height: 66rem;
    margin: 20rem 10rem;
    padding: 6.5rem;

    background: ${({ theme }) => theme.COLORS.BACKGROUND_500};

    >h1{
      display: block;
      text-align: center;
      font-weight: 500;
      font-size: 3.2rem;
    }
  }
`;
