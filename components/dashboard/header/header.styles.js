import styled, { keyframes } from "styled-components";
// using styles from menuitem component
export const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    color: black;
    height: 42px;
    width: 100%;
    font-family: Inter;
    padding-left: 6px;
`;
/*
    max-width: fit-content(90%);
    min-width: 100px;
*/

export const Container = styled.div`
    max-width: 100%;
    width: 100%;
`;

export const GrowAnimation = keyframes`
    0% {
        height: 0px;
    }


    100% {
        height: 80vh;
    }

`;

export const DropdownBody = styled.div`
  position: relative;
  max-height: 80vh;
  overflow: auto;
  animation: ${GrowAnimation} 500ms ease-in-out;

  ::-webkit-scrollbar {
    width: 0px; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
`;

export const DropdownList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const DropdownItem = styled.li`
  padding: 6px;
  margin: 0px;
  ${props => `
  background-color: ${props.col};
`}
  cursor: pointer;
  color:black;
  font-size: 14px;
  font-family: 'Inter'; sans-serif;
`;

export const DropdownURLItem = styled.li`
  padding: 5px 10px;
  margin: 0px;
  ${props => `
  background-color: ${props.col};
`}
  cursor: pointer;
  color:black;
  font-size: 14px;
  font-family: 'Inter'; sans-serif;
`;

export const DropdownItemBreak = styled.li`
  margin: 12px 0px;
  ${props => `
  background-color: ${props.col};
`}
  cursor: pointer;
  color:black;
  font-size: 14px;
  font-family: 'Inter'; sans-serif;
`;
