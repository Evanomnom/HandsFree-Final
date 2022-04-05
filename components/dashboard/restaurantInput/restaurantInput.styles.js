import styled from "styled-components";
import tw from "tailwind.macro";

export const Main = styled.div `
    ${tw`ml-2 mt-2`}
    font-family:Inter
`;

export const SettingsTitle = styled.div`
    ${tw`mb-1 text-2xl font-bold`}
`;

export const SettingDiv = styled.div`
    ${tw`flex flex-col items-center justify-start my-6 text-md`}
`;

export const SettingLabelDiv = styled.div`
    ${tw`flex flex-row content-start items-center w-full mb-1`}
`;

export const SettingMainLabel = styled.label`
    ${tw`text-md font-medium mr-2`}
`;

export const SettingDescLabel = styled.label`
    ${tw`text-sm`}
`;

export const InputDiv = styled.div`
    ${tw`flex flex-row content-start text-md w-full`}
`;

export const SettingInput = styled.input`
    ${tw`py-1 px-2 mr-4 text-sm text-gray-800 border-solid border-gray-600 border rounded-sm`}
`;

export const SettingButton = styled.button`
    ${tw`appearance-none border-0 bg-gray-500 text-md text-white font-medium py-2 px-3 text-center rounded-md hover:bg-gray-400`}
    font-family:Inter
`;





