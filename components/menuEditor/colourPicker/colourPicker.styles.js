import styled from "styled-components";

export const circleButton = styled.button`
border: 1px solid black;
border-radius: 12.5px;
width: 25px;
height: 25px;
margin-left: 3px;
margin-bottom: 2px;
${props => `
background-color: ${props.col};
`}
`;

export const cont = styled.div`
    max-width:120px;
    margin-top: 5px;
`;