import styled, { keyframes } from "styled-components";

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 5px;
  height: 42px;
  padding: 0 10px;
  align-items: center;
  max-width: fit-content(90%);
  min-width: 100px;
`;

export const Title = styled.h2`
  font-family: 'Oswald'; sans-serif;,
  color: black;
  cursor: pointer;
  text-align: center;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: ${props => props.setsize};
`;

export const GrowAnimation = keyframes`
    0% {
        max-height: 0px;
    }


    100% {
        max-height: 80vh;
    }

`;

export const DropdownBody = styled.div`
  position: absolute;
  top: 100px;
  max-height: 80vh;
  overflow: auto;
  animation: ${GrowAnimation} 250ms ease-in-out;

  ::-webkit-scrollbar {
    width: 0px; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
`;

export const DropdownList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: black;
`;

export const DropdownItem = styled.li`
  padding: 6px;
  margin: 6px;
  background-color: black;
  border: 2px solid black;
  cursor: pointer;
  font-family: 'Inter'; sans-serif;
`;

export const DropdownItemTarget = styled.a`
  color: white;
  font-size: 24px;
  text-decoration: none;
  font-family: 'Oswald'; sans-serif;
  font-weight: 400px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 18px;
`;

export const Root = styled.div``;

export const Icon = styled.h4`
  color: black;
  font-size: 12px;
  padding: 0 8px;
  cursor: pointer;
`;
