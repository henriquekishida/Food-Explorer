import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_100};
  border-radius: 8px;

  >svg{
    margin-left: 1rem;
    color: ${({ theme }) => theme.COLORS.WHITE_900};
  }

  >input{
    height: 5rem;
    width: 100%;
    padding: 1.2rem;

    color: ${({ theme }) => theme.COLORS.WHITE_900};

    background: transparent;
    border: 0;

    &:placeholder{
        color: ${({ theme }) => theme.COLORS.PLACEHOLDER};
    }
  }

  @media (min-width: 1200px){
      min-width: 34rem;
  }
`;