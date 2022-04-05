import styled from "styled-components";
// using styles from menuitem component
export const FullDiv = styled.div `
    position:sticky;
    min-height: 100vh;
    display:flex;
    font-family:Inter;
`;

export const FlexDiv = styled.div`
    position:sticky;
    display:flex;
`;
//change this for smaller screens
export const MarginLeftDiv = styled.div`
  margin-left: 10vw;
  max-width: 100vw; 
  @media only screen and (max-width: 1100px) {
    margin-left: 10vw;
  }
  @media only screen and (max-width: 750px) {
    margin-left: 10vw;
  }
  @media only screen and (max-width: 479px) {
    margin-left: 10vw;
  }
`;
