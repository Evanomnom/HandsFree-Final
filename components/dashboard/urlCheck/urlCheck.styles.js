import styled from "styled-components";
import tw from "tailwind.macro";
// using styles from menuitem component
export const Alert = styled.div `
    ${tw`text-lg ml-2 mt-4`}
    font-family:Inter
`;

export const CheckDiv = styled.div`
    ${tw`flex flex-col items-center text-lg ml-2 mt-4`}
    font-family:Inter
`;

export const CheckTitle = styled.div`
    ${tw`text-lg mb-3`}
`;

export const CheckInput = styled.input`
    ${tw`mt-2 mb-2 py-1 px-1 text-gray-700 border-solid border-gray-500 border rounded-sm w-9/12`}
`;

export const CheckButton = styled.button`
    ${tw`appearance-none border-0 bg-blue-400 text-lg text-white font-bold py-2 px-5 rounded-lg hover:bg-blue-300`}
`;
