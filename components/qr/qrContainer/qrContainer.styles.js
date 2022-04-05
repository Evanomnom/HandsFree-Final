import styled from "styled-components";

export const Container = styled.div`
  text-align: center;
  align-self: center;
  position: relative;
  height:256px;
  width:256px;
`;

export const QRDiv = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  z-index:0;
`;

export const QText = styled.h1`
  font-family: "Georgia";
  position: absolute;
  top: calc(50% - 33px);
  left: calc(50% - 70px);
  font-size: 30px;
  z-index:1;
  color: red;
  background-color:white;
`;
