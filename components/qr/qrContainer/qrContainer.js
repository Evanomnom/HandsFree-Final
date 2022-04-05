import * as Styled from "./qrContainer.styles";
import QRCode from "qrcode.react";
//import React from "react";

export default function QRContainer({qrData, qrSize}) {
  console.log('test');
  return (
    <Styled.Container>
      <Styled.QText>SCAN ME</Styled.QText>
      <Styled.QRDiv>
        <QRCode value={qrData} size={qrSize} level='H' />
      </Styled.QRDiv>
    </Styled.Container>
  );
}
