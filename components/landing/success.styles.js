import styled from "styled-components";
import tw from 'tailwind.macro';

export const Root = styled.div`
 ${tw`flex justify-center items-center content-center bg-white w-screen h-screen`}
`;

export const Box = styled.div`
  ${tw`flex flex-col justify-center items-center content-center bg-white w-11/12 border-solid border-gray-400 border-3`}
  max-width:600px;
`;

//Title/Subtitle styles
export const TitleDiv = styled.div`
 ${tw`flex flex-col justify-center items-center mb-1`}
 font-family:'Seravek';
`;

export const TitleText = styled.h1`
  ${tw`mb-0 mt-2 text-3xl text-blue-600 text-center`}
`;

export const SubtitleText = styled.h3`
  ${tw`mt-2 text-xl text-blue-500 font-medium text-center`}
`;

export const BackToHomeButton = styled.button`
  ${tw`appearance-none mb-2 border-0 bg-green-400 text-xl text-white font-bold py-2 px-6 rounded-lg hover:bg-green-300`}
`;
