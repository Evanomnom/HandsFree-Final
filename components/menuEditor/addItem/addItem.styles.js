import styled from "styled-components";
import tw from "tailwind.macro";
// using styles from menuitem component
export const AddButton = styled.button`
${tw`appearance-none border-0 bg-green-500 text-2xl text-white font-medium py-0 px-2 text-center rounded-md hover:bg-green-400`}
font-family:Inter;
text-align: center;
`;

export const CenterDiv = styled.div`
text-align: center;
justify-content: center;
align-items: center;
display: flex;
width: 100%;
margin: 5px;
margin-right: 1.5vw;
`;