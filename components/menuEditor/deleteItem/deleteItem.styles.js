import styled from "styled-components";
import tw from "tailwind.macro";

export const DeleteButton = styled.button`
${tw`appearance-none border-0 bg-red-500 text-xl text-white font-medium text-center rounded-md hover:bg-red-400`}
font-family:Inter;
text-align: center;
font-family: "Impact", "Arial", bold;
align-self: flex-end;
text-align: center;
margin-right: 5px;
margin-bottom: 3px;
float:right;
padding: 0px 10px;
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