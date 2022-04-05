import { withRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import React from 'react';
import ReactToPrint from 'react-to-print';
import QRArray from "../../components/qr/qrArray/qrArray"
import * as Styled from "../../components/qr/qr.styles";
import QRContainer from "../../components/qr/qrContainer";

function QR() {
  //Declaring necessary state variables
  const [data, setData] = useState("");
  const [amount, setAmount] = useState("");
  const componentRef = useRef();

  //Sets the URL for the QR code to use to this url minus qr (Ex. handsfree.restaurant/csp/qr -> handsfree.restaurant/csp)
  useEffect(() => {
    setData(window.location.href.replace("/qr", ""));
  }, []);

  return (
    <Styled.Root>
      {/*The QR Code that is displayed to the page: uses link found above*/}
      <Styled.QRContainerAdjust>
        <QRContainer
          qrData={data}
          qrSize={256}
        />
      </Styled.QRContainerAdjust>

      {/*The Input Form: sets the amount of QR codes to print, whenever the input value changes, the amount to print changes*/}
      <Styled.SetAmountContainer>
        <Styled.SetAmountTitle>Amount of QR Codes to Print: </Styled.SetAmountTitle>
        <Styled.SetAmountInput onChange={e => setAmount(e.target.value)}></Styled.SetAmountInput>
      </Styled.SetAmountContainer>

      {/*The ReactToPrint Component: When this button is clicked, it prints out the referenced component, in this case the QRArray*/}
      <ReactToPrint
        trigger={() => <Styled.PrintButton>Print!</Styled.PrintButton>}
        content={() => componentRef.current}
      />

      {/*The Hidden Array of QR Codes: Number of QR Codes = amount set above, this component will print when referenced by ReactToPrint*/}
      <div style={{ display: "none" }}>
        <QRArray
          qrData={data}
          qrSize={256}
          qrAmount={amount||1}
          ref={componentRef} 
        />
      </div>
    </Styled.Root>
  );
}

//Runs the QR function to the page
export default withRouter(QR);
