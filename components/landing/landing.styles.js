import styled from "styled-components";
import tw from 'tailwind.macro';

export const Root = styled.div`
 ${tw`bg-white`}
`;

export const Body = styled.div`
  margin-top:88px;
`;

//Title/Subtitle styles
export const TitleDiv = styled.div`
 ${tw`flex flex-col justify-center items-center`}
 font-family:'Seravek';
`;

export const TitleText = styled.h1`
  ${tw`mb-0 text-5xl text-blue-600 text-center`}
`;

export const SubtitleText = styled.h3`
  ${tw`mt-0 text-xl text-blue-500 font-semibold text-center italic`}
`;


//Holds larger components
export const ItemsDiv = styled.div`
 ${tw`flex flex-col flex-wrap flex-shrink-0 flex-grow-0 justify-around items-center content-center self-center max-w-screen-xl m-auto lg:flex-row lg:items-center`}
 font-family:'Seravek';
 flex-shrink:0;
`;


//Why handsFree box styles
export const WhyDiv = styled.div`
 ${tw`flex flex-col border-dotted border-black border-0 mb-8`}
 width:500px;
 @media only screen and (max-width: 700px) {
    width: 90vw;
  }
 height:250px;
`;

export const WhyTitleDiv = styled.div`
  ${tw`text-3xl text-blue-900 font-bold flex justify-center items-center`}
  height:20%;
`;

export const SquaresDiv = styled.div`
  ${tw`flex flex-row flex-wrap justify-around items-center`}
  height:80%
`;

export const Square = styled.div`
  ${tw`flex justify-around items-center border-solid border-gray-400 border-0`}
  width:45%;
  height:45%;
`;

export const NumberDiv = styled.div`
  ${tw`flex justify-center items-center text-6xl font-extrabold`}
  width:20%
`;

export const ContentDiv = styled.div`
  ${tw`flex flex-col justify-center items-center text-center`}
  width:80%
`;

export const ContentTitleDiv = styled.div`
  ${tw`flex justify-center items-center text-sm font-semibold lg:text-lg`}
  height:35%
`;

export const ContentBodyDiv = styled.div`
  ${tw`flex justify-center items-center text-xs lg:text-sm`}
  height:65%
`;


//Form Styles
export const FormDiv = styled.div`
 ${tw`flex flex-col border-dotted border-black border-0 mb-8`}
  width:500px;
  @media only screen and (max-width: 700px) {
    width: 90vw;
  }
  height:250px;
  @media only screen and (max-width: 700px) {
    height: 325px;
  }
`;

export const FormTitleDiv = styled.div`
  ${tw`text-3xl text-blue-900 font-bold flex justify-center items-center`}
  height:20%;
`;

export const Form = styled.form`
  ${tw`w-full flex items-center justify-center flex-wrap flex-col`}
`;

export const FormElementDiv = styled.div`
  ${tw`flex items-center justify-center self-center mb-4`}
  width:90%
`;

export const FormLabelDiv = styled.div`
   ${tw`w-2/5`}
`;

export const FormLabel = styled.label`
  ${tw`block text-blue-900 text-lg font-medium md:text-right mb-1 md:mb-0 pr-4`}
`;

export const FormInputDiv = styled.div`
   ${tw`w-3/5`}
`;

export const FormInput = styled.input`
  ${tw`appearance-none bg-white border-1 border-gray-200 rounded py-1 w-full text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-600`}
  border:.1rem solid #D3D3D3;
`;

export const FormSubmit = styled.button`
  ${tw`appearance-none bg-white text-blue-900 border-2 border-black-200 px-3 rounded text-lg font-medium tracking-wider hover:bg-gray-200`}
  font-family:'Seravek';
  border:.1rem solid #A0AEC0;
`;


//How Styles
export const HowDiv = styled.div`
  ${tw`flex flex-col border-dotted border-black border-0 mb-5`}
  width: 550px;
  @media only screen and (max-width: 700px) {
    width: 90vw;
  }
  height: 250px;
  @media only screen and (max-width: 700px) {
    height: 200px;
  }
`;

export const HowTitleDiv = styled.div`
  ${tw`text-3xl text-blue-900 font-bold flex justify-center items-center`}
  height:20%;
`;

export const HowPictureDiv = styled.div`
  ${tw`flex justify-center items-center`}
  height:80%
`;

export const HowPicture = styled.img`
  ${tw``}
  height:80%;
  width:90%;
`;


//Demo Styles
export const DemoDiv = styled.div`
 ${tw`flex flex-col border-dotted border-black border-0 mb-5`}
 width:500px;
 @media only screen and (max-width: 700px) {
    width: 90vw;
  }
 height:300px;
 @media only screen and (max-width: 700px) {
    height: 300px;
  }
`;

export const DemoTitleDiv = styled.div`
  ${tw`text-3xl text-blue-900 font-bold flex justify-center items-center`}
  height:13%;
`;

export const DemoVideoDiv = styled.div`
  ${tw`flex justify-center items-center`}
  height:87%;
`;

export const Demo = styled.iframe`
  width=95%;
  height=95%
`;

//Get Started Button Styles
export const GetStartedDiv = styled.div`
 ${tw`flex self-center items-center justify-center my-5 w-full`}
`;

export const GetStartedButton = styled.button`
  ${tw`appearance-none bg-blue-400 text-white text-2xl p-2 font-extrabold tracking-wider hover:bg-blue-300 lg:p-3 lg:text-3xl`}
  font-family:'Seravek';
  border-radius: .6rem;
  border: .15rem solid black;
  border-color: #2d3748;
`;

