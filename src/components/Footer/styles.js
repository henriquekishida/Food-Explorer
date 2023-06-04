import styled from 'styled-components'

export const Container = styled.div`
  grid-area: Footer;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  height: 7rem;
  width: 100%;
  bottom: 0;
    
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_100};

  >span{
    display: flex;
    justify-content: center;
    
    font-weight: 400;
    font-size: 1.2rem;
  }

  >img{
      width: 14rem;
      height: 1.8rem;
    }

  @media (min-width: 768px){
    flex-direction: row;
    justify-content: space-evenly;

    >span{
      font-size: 1.4rem;
    }

    >img{
      width: 18rem;
      height: 3rem;
    }
  }
`;