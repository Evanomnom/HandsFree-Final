import styled from "styled-components";
import tw from "tailwind.macro";
// using styles from menuitem component
export const Bar = styled.div `
    ${tw`flex flex-col items-center`}
    width:10vw;
    background-color: #F0F0F0;
    display: absolute;
    position: fixed;
    top: 0;
    height: 100%;
    @media only screen and (max-width: 1100px) {
        width: 10vw;
      }
      @media only screen and (max-width: 750px) {
        width: 10vw;
      }
      @media only screen and (max-width: 479px) {
        width: 10vw;
      }
`;

export const Login = styled.button`
      ${tw`appearance-none border-0 bg-gray-500 text-md text-white font-bold mt-5 py-2 px-2 text-center rounded-lg hover:bg-gray-400`}
`;

export const Logo = styled.img`
  ${tw`mb-5`}
  max-width: 10vw;
`;