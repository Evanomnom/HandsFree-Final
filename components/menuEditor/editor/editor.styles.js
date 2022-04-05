import styled from "styled-components";
import tw from "tailwind.macro";

export const MenuEditorTitle = styled.div`
    ${tw`mb-6 ml-2 mt-2 text-2xl font-bold`}
`;

export const Top3ButtonsDiv = styled.div`
    ${tw`flex flex-row justify-around w-full`}
`;

export const AddButton = styled.button`
    ${tw`appearance-none border-0 bg-green-500 text-base text-white font-medium py-2 px-3 text-center rounded-md hover:bg-green-400`}
    font-family:Inter
`;

export const SaveButton = styled.button`
    ${tw`appearance-none border-0 bg-blue-500 text-base text-white font-medium py-2 px-3 text-center rounded-md hover:bg-blue-400`}
    font-family:Inter
`;

export const UndoButton = styled.button`
    ${tw`appearance-none border-0 bg-red-500 text-base text-white font-medium py-2 px-3 text-center rounded-md hover:bg-red-400`}
    font-family:Inter
`;

export const StyledButton = styled.button`
    ${tw`appearance-none border-0 bg-gray-500 text-white font-medium py-2 px-3 text-center rounded-md hover:bg-gray-400`}
    font-family:Inter
`;

export const TopChangeButtonsDiv = styled.div`
    ${tw`flex flex-row justify-around w-full mt-4 mb-6`}
`;



export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 16px 8px;
  padding: 0 12px;
  ${props => `
  background-color: ${props.col};
`}
`;

export const Body = styled.div`
  width: 100vw;
  background-color: #fafafa;
`;

//some divs for use with the sidebar
export const BodyEditor = styled.div`
  width: 90vw;
  background-color: #fafafa;
  @media only screen and (max-width: 1100px) {
    width: 90vw;
  }
  @media only screen and (max-width: 750px) {
    width: 95vw;
  }
  @media only screen and (max-width: 479px) {
    width: 100vw;
  }
`;

//im aware of this duplicate i just dont remember which is used where
export const FlexDiv = styled.div`
  display:flex; 
`;

export const CategoryContainer = styled.div`
  display:flex;
`;


export const teste = styled.p`
  ${props => `
  color: ${props.col};
  `}
`;

export const ColorInput = styled.input`
  height: 12px;
  justify-content: center;
  margin-top: 0.5rem;
  margin-left: 10px; 
  width: 60px; `;

export const Selector = styled.select`
border: none;
border-radius: 4px;
background-color: #f1f1f1;
height: 16px;
width: auto; 
margin-top: 0.5rem;
margin-left: 10px; 
`;
export const ColFamButton = styled.button`
justify-content: center;
margin-top: 0.5rem;
margin-left: 10px; 
padding: 5px 5px`
;

export const MenuTitle = styled.h2`
  font-weight: 700;
  margin-left: 1rem;
  margin-top:5px;
  margin-bottom:5px;
  font-family: Inter;
  width: auto;
  `;

export const MovedInput = styled.input`
height: 12px;
justify-content: center;
margin-left: 10px; 
margin-top: 5px;
margin-bottom: 5px;
width: auto;
`;