import styled from "styled-components";

export const Root = styled.div`
  min-width: 300px;
  min-height: 225px;
  width: 25%;
  height: 25%;
  position:fixed; 
  top: 37.5%; // half of width
  left: 37.5%;
  @media only screen and (max-width: 1100px) {
    left: 25vw;
  }
  @media only screen and (max-width: 750px) {
    left: 15vw;
  }
  @media only screen and (max-width: 479px) {
    left: 10vw;
  }
  border: solid black;
  display:flex;
  flex-direction:column;
  visibility:hidden;
  background-color: white;
`;

export const TitleText = styled.h1`
  font-family: "Oswald", sans-serif;
  font-size: 20px;
  letter-spacing: 2px;
  color: black;
  text-transform: uppercase;
  text-align: center;
  max-width: 90%;
  margin: auto;
`;

export const Input = styled.input`
  text-align:center;
  width: 90%;
  font-size: 18px;
  margin:auto;
`;

export const Close = styled.button`
  float:right;
  margin:1% 1%;
  width: fit-content;
  height: 14%;
  font-size: 18px;
  color:black;
  font-weight:bold;
  border-radius: 20%;
`;

export const Submit = styled.button`
  margin: auto;
  width: fit-content;
  font-size: 18px;
  font-family: "Oswald", sans-serif;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

export const InputContainer = styled.div`
  margin: auto;
  display: flex;
  width: 100%;
  flex-direction:column;
`;
