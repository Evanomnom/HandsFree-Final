import styled, { keyframes } from "styled-components";

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h2`

font-family: 'Inter'; sans-serif;,
font-size: 32px;
color: white;
cursor: pointer;
text-align: center;
`;

export const GrowAnimation = keyframes`
    0% {
        max-height: 0px;
    }


    100% {
        max-height: 100vh;
    }

`;

export const DropdownBody = styled.div`
  position: relative;
  top: -10px;
  max-height: 100vh;
  overflow: auto;
  animation: ${GrowAnimation} 250ms ease-in-out;

  ::-webkit-scrollbar {
    width: 0px; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }

  @media only screen and (max-width: 900px) {
    width: 100vw;
  }
`;

export const DropdownList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: black;
`;

export const DropdownItem = styled.li`
  padding: 10px 8px;
  margin: 10px 8px;
  background-color: white;
  border: 2px solid black;
  cursor: pointer;
  font-family: 'Inter'; sans-serif;
`;

export const DropdownItemTarget = styled.a`
  color: black;
  font-size: 24px;
  text-decoration: none;
`;

export const Root = styled.div``;

export const Icon = styled.h4`
  color: white;
  font-size: 12px;
  padding: 0 8px;
  cursor: pointer;
`;
