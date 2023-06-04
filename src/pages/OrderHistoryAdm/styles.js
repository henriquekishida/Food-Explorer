import styled from 'styled-components'

export const Container = styled.div`
  animation: 0.5s screenScale;

  height: 100vh;
  
  >h1{
    padding:  15rem 12rem 5rem;
    font-size: 3.2rem;
  }
  
>section{
  padding: 0 12rem;
  overflow: auto;
  height: 60vh;
    
    >table{
      width: 100%;

      >thead{
        tr{
          th{
            text-align: start;
          }
        }
      }

      tbody tr td img{
        width: 1rem;
        margin-right: 8px; 
      }

      #tdStatus{
        width: 18rem;
      }

      #wrapper_status{
        padding: 15px;
        background: ${({theme})=>theme.COLORS.BACKGROUND_100};
        width: 17rem;

        select{
          background: none;
          border: none;
          color: white;
          font-size: 18px;

          option{
            background: ${({theme})=>theme.COLORS.BACKGROUND_100};
          }
        }
      }
    }

    table, td, th{
      border-collapse: collapse;
      border: 1px solid ${({theme})=>theme.COLORS.BACKGROUND_LINE};
      padding: 1.5rem;
    }
  }

  .wrapper_mobile{
    height: 70vh;
    overflow: auto;
  }

  @media (max-width: 832px){
    >h1{
      padding:  12rem 2rem 2rem;
      font-size: 2.2rem;
    }
  }

  @media (max-width: 450px){
    .wrapper_mobile{
      height: 60vh;
    }
  }
`;

export const SectionMobile = styled.div`
  border: 1px solid ${({theme})=>theme.COLORS.BACKGROUND_LINE};
  border-radius: 8px;
  padding: 2rem;
  margin: 0 1rem 1rem;

  overflow: auto;
  max-width: 100%;

  display: flex;
  flex-direction: column;

  color: ${({theme})=>theme.COLORS.WHITE_100};

  .wrapper_header{
    display: flex;
    gap: 2.5rem;
    justify-content: center;
    margin-bottom: 1rem;
    color: ${({theme})=>theme.COLORS.WHITE_500};

    .wrapper_status{
      display: flex;
      gap: 1rem;
      align-items: center;

      img{
        width: 1rem;
      }
    }
  }

  .wrapper_select{
    display: flex;
    justify-content: center;
  }

  select{
    margin-top: 1rem;
    width: 30rem;
    height: 4rem;
    
    background-color: ${({theme})=>theme.COLORS.BACKGROUND_500};
    border: none;
    color: ${({theme})=>theme.COLORS.WHITE_500};
    padding-left: 5px;
  }

  @media (max-width: 450px){
    font-size: 1.1rem;
  }
`;