import styled from "styled-components";
import tw from 'tailwind.macro';

export const Navigator = styled.nav`
 ${tw`w-full fixed top-0 flex flex-row items-center justify-start flex-wrap bg-blue-300 border-solid border-b-3 border-t-0 border-r-0 border-l-0 border-black`}
 height: 85px;
`;

export const Logo = styled.img`
 ${tw`mr-3 border-solid border-b-0 border-t-0 border-r-0 border-l-0 border-black lg:mr-10`}
`;

export const LinksDiv = styled.div`
 ${tw`w-auto flex flex-grow lg:flex lg:items-center`}
`;

export const TextDiv = styled.div`
 ${tw`text-xl font-semibold w-full lg:flex-grow lg:text-2xl`}
 font-family: "Seravek";
`;

export const Link = styled.a`
 ${tw`no-underline inline-block mt-0 text-white hover:text-gray-200 mr-3 lg:mr-10`}
`;

