import styled from "styled-components";

export const Container = styled.div`
  min-width: 100vw;
  overflow: hidden;

  animation: Slide 0.5s ease-in-out;

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  
  #wrapper_input{
    display: flex;
    justify-content: center;

    width: 100%;
    padding-top: 30px;
    
    Input{
        min-width: 90%;
        height: 100%;
    }
  }

  @keyframes Slide{
    0%{transform: translateX(-100%)}
    100%{transform: translateX(0)}
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  animation: Slide 0.5s ease-in-out;

  padding: 45px 35px;  

  a{
    text-decoration: none;

    margin-bottom: 20px;
    border-bottom: ${({ theme }) => theme.COLORS.BACKGROUND_LINE} solid 1px;

    color: ${({ theme }) => theme.COLORS.WHITE_900};
  }
  
  span{
    border-bottom: ${({ theme }) => theme.COLORS.BACKGROUND_LINE} solid 1px;

    font-weight: 300;
    cursor: pointer;
    font-size: 2.4rem;
  }
`;