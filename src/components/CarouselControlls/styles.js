import styled from 'styled-components'

export const Container = styled.section`

  #hidden{
    display: none;
  }

  .wrappper_dishes{
    position: relative;

    .wrapper_btn{
      button{
        background: none;
        border: none;

        width: 40px;
        height: 40px;

        svg{
          font-size: 32px;
          color: ${({ theme }) => theme.COLORS.WHITE_900};
        }
      }
    }
    .wrapper_btn{
      display: flex;
      align-items: center;
      justify-content: center;

      position: absolute;
      top: 0;
      z-index: 1;

      height: 100%;
      width: 200px;
    }
    .back{
      background: linear-gradient(90deg, #000A0F 0%, rgba(0, 10, 15, 0.472541) 100%);
    }
    .forward{
      background: linear-gradient(90deg, rgba(0, 10, 15, 0.472541) 0%, #000A0F 100%);
      right: 0;
    }
  }

  .rec.rec-arrow{
    display: none;
  }

  @media (max-width: 832px){
    #addMargin{
      margin-left: 0;
    }
  }

  @media (max-width: 1300px){
    .back, .forward{
      width: 50px !important;
    }
  }
`;