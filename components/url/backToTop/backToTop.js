import * as Styled from "./backToTop.styles";
import { useEffect } from "react";
//import React from "react";

export default function BackToTop() {
  var visibilityCheck = false;

  //ScrollTop is how far the user has scrolled vertically
  var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

  //Scrolls back to top if the button is pressed (in the onClick) and visible
  function goBackToTop() {
    if (visibilityCheck){
      window.scrollTo(0, 0);
    }
  }

  //If user is scrolled over 3000 pixels, make the button visible
  visibilityCheck = (scrollTop > 3000);

  return (
    <Styled.Button src = 'uparrow.svg' onClick={() => goBackToTop()} visibilityCheck = {visibilityCheck}>
    </Styled.Button>
  );
}
