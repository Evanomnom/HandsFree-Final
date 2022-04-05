import styled from "styled-components";
// using styles from menuitem component
export const Card = styled.div`
  display: flex;
  width: 46%;
  justify-content: space-between;
  border-radius: 3px;
  border-size: 100px;
  border: 2px solid;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  margin-bottom: 0.3rem;
  border-color: rgba(200,200,200,0.5); 
  @media only screen and (max-width: 800px) {
    width: 100vw;
  }
  ${props => `
    background-color: ${props.col};
  `}
`;
//#fdfdfd
export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  width: 75%;
  height: 100%;
  margin: 1rem;
  text-align: left;
`;

export const Name = styled.h3`
  font-weight: 500;
  font-size: 18px;
  text-align: left;
  align-self: flex-start;
  margin: 0;
  padding: 0;
  letter-spacing: 1px;
  text-transform: uppercase;
  ${props => `
    color: ${props.col};
    font-family: ${props.family} , sans-serif;
  `}

`;
//"Oswald", sans-serif; #000
export const Description = styled.p`
  font-weight: 400;
  font-size: 14px;
  text-align: left;
  align-self: flex-start;
  padding-left: 10px;
  text-transform: lowercase;
  ${props => `
  color: ${props.col};
  font-family: ${props.family} , sans-serif;
`}
`;
// "Inter", sans-serif; #777;
export const Price = styled.p`
  font-weight: 600;
  font-size: 18px;
  align-self: flex-start;
  text-align: right;
  padding-right: 1.2rem;
  ${props => `
  color: ${props.col};
  font-family: ${props.family} , sans-serif;
`}
`;
// "Oswald", sans-serif #000
export const CardPrice = styled.div`
  width: 25%;
  display: flex;
  height: 100%;
  justify-content: flex-start;
  flex-direction:column;
`;

export const DeleteButton = styled.button`
font-size: 24px;
color: red;
font-family: "Impact", "Arial", bold;
align-self: flex-end;
text-align: center;
margin-right: 5px;
margin-bottom: 3px;
float:right;
border: 1px solid black;
padding: 0px 12px;
padding-bottom: 3px;  
`;

export const DeleteButtonTop = styled.button`
font-size: 24px;
color: red;
font-family: "Impact", "Arial", bold;
align-self: flex-end;
text-align: center;
margin-left: 5px; 
margin-top: 3px;
border: 1px solid black;
padding: 0px 12px;
padding-bottom: 3px;  
`;