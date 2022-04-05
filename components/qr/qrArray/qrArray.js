import * as Styled from "./qrArray.styles";
import QRContainer from "../qrContainer"
import React, { useRef } from 'react';
//import React from "react";

function createQRArray(qrData, qrSize, qrAmount){
  var qrList = [];
  for (let i = 0; i < qrAmount; i++){
    qrList.push({data: qrData, size: qrSize, key:i});
  }
  return qrList;
}

export default class QRArray extends React.Component {
  render() {
    return (
      <Styled.Root>
        {createQRArray(this.props.qrData, this.props.qrSize, this.props.qrAmount).map((qrEl) => (
          <Styled.QRContainerAdjust key={qrEl.key}>
            <QRContainer
              qrData={qrEl.data}
              qrSize={qrEl.size}
              key={qrEl.key}
            />
          </Styled.QRContainerAdjust>
        ))}
      </Styled.Root>
    );
  }
}

