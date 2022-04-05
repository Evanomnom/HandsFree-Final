import styled from "styled-components";

export const CategoryBar = styled.div`
  width: 100%;
  display: flex;
  background-color: #001;
  height: 64px;
  box-shadow: 10px 10px 12px 0px rgba(0, 0, 0, 0.15);
`;

export const CategoryTitle = styled.h2`
  font-weight: 700;
  margin: 1rem auto;
  ${props => `
    color: ${props.col};
    font-family: ${props.family} , sans-serif;
  `}
`;
//D81A01   font-family: "Inter", sans-serif;

export const MenuItemsContainer = styled.div`
  padding-top: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
`;

export const ButtonsDiv = styled.div`
  display: flex;
`;

export const FlexDiv = styled.div`
  display: flex;
`;

export const ColorInput = styled.input`
  height: 12px;
  justify-content: center;
  margin-top: 1.3rem;
  margin-left: 10px; 
  width: 60px; `;

export const Category = styled.div`
  border: 3px solid;
  border-radius: 3px;
  border-color: #f0f0f0;
`; 

export const Selector = styled.select`
border: none;
border-radius: 4px;
background-color: #f1f1f1;
height: 16px;
width: auto; 
margin-top: 1.3rem;
margin-left: 10px; 
`;
export const ColFamButton = styled.button`
justify-content: center;
margin-top: 1rem;
margin-left: 10px; 
padding: 5px 0px;
height: auto;
width: auto;`
;

export const TopColFamButton = styled.button`
justify-content: center;
margin-left: 10px; 
padding: 5px 5px`
;

export const MovedInput = styled.input`
height: 12px;
justify-content: center;
margin-top: 1.3rem;
margin-left: 10px; 
width: auto;
`;

export const Card = styled.div`
  display: flex;
  width: 46%;
  justify-content: center;
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
  height: 100px;
  text-align: center;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const SaveChanges = styled.button`
  width:auto;
  height: 20px;
  border: 1px solid;
  margin-top: 1.2rem;
  margin-left: 10px;
`;

export const SaveChangesWhole = styled.button`
  width: auto;
  height: auto;
  border: 1px solid red;
  margin-top: 1.0rem;
  margin-left: 10px;
`;