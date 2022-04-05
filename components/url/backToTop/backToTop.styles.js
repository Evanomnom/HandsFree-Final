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

export const Button = styled.img`
  position:fixed;
  width:75px;
  height:75px;
  bottom:10px;
  right:10px;
  opacity:${props => props.visibilityCheck ? ".3" : "0"};
`
