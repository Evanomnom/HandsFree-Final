import styled from "styled-components";
import tw from "tailwind.macro";

export const QRTitle = styled.div`
    ${tw`mb-2 ml-2 mt-3 text-2xl font-bold`}
`;

export const Root = styled.div`
  display:flex;
  flex-direction:column;
  text-align: center;
  align-items: center;
`;

export const QRContainerAdjust = styled.div`
  margin-top: 15px;
`;

export const SetAmountContainer = styled.div`
  margin-top: 30px;
  display:flex;
  flex-direction:row;
  justify-content:center;
  min-width:400px;
  width:20%;
  min-height:16px;
  height:16px;
`;

export const SetAmountTitle = styled.p`
  margin:0;
  margin-right:5px;
`;

export const SetAmountInput = styled.input`
  max-width:30px;
`;

export const PrintButton = styled.button`
${tw`appearance-none border-0 bg-green-500 text-base text-white font-semibold py-2 px-4 mt-10 text-center rounded-md hover:bg-green-400`}
  font-family:Inter;
  margin-top: 30px;
`;

