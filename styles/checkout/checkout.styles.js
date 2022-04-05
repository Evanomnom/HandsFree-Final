import styled from "styled-components";
import tw from 'tailwind.macro';

export const RootDiv = styled.div`
    ${tw`w-screen h-screen`}
    font-family: Verdana;
`;

export const MainDiv = styled.div`
    ${tw`flex justify-center flex-wrap mt-10 w-full h-full`}
`;

export const TitleDiv = styled.div`
    ${tw`flex w-full justify-center items-center text-3xl my-5`}
    font-family: Verdana;
`;

export const CheckoutDiv = styled.div`
    ${tw`mr-10`}
    min-width: 330px;
`;

export const CheckoutLabel = styled.label`
    ${tw`text-sm`}
`;

export const CheckoutInput = styled.input`
    ${tw`mt-2 mb-3 py-2 px-2 text-gray-600 border-solid border-gray-400 border rounded-sm w-11/12`}
`;

export const SubmitDiv = styled.div`
    ${tw`flex justify-center items-center mt-2`}
`;

export const SubmitButton = styled.button`
    ${tw`appearance-none border-0 bg-green-400 text-lg text-white font-bold py-2 px-5 rounded-lg hover:bg-green-300`}
`;

export const CartDiv = styled.div`
    ${tw`flex flex-col`}
    min-width: 330px;
`;

export const CartTitle = styled.div`
    ${tw`flex w-full text-3xl mb-4 text-gray-700`}
`;

export const ItemDiv = styled.div`
    ${tw`flex flex-row w-full my-2 justify-between`}
`;

export const Item = styled.div`
    ${tw``}
`;

export const Cost = styled.div`
    ${tw`text-gray-700`}
`;

export const TotalItemDiv = styled.div`
    ${tw`flex flex-row w-full my-4 justify-between`}
`;

export const TotalItem = styled.div`
    ${tw`font-bold`}
`;

export const TotalCost = styled.div`
    ${tw`font-bold text-gray-700`}
`;

export const PopupDiv = styled.div`
    ${tw`flex flex-col items-center justify-center border-solid border-gray-700 rounded-lg bg-white`}
    width:300px;
    height:200px;
    position:absolute;
    left: calc(50vw - 150px);
    top: calc(50vh - 100px);
    visibility:hidden;
`;

export const PopupTitle = styled.div`
    ${tw`text-xl font-bold mb-5`}
`;

export const PopupButton = styled.div`
    ${tw`appearance-none border-0 bg-green-400 text-lg text-white font-bold py-2 px-5 rounded-lg hover:bg-green-300`}
`;
