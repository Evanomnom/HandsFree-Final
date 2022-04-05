// Editable.js
import React, { useState, useEffect } from "react";
import * as Styled from "./editableCard.styles";


const Editable = ({
  childRef,
  text,
  type,
  placeholder,
  children,
  setter,
  offInput,
  ...props
}) => {
  
  // Manage the state whether to show the label or the input box. By default, label will be shown.
  const [isEditing, setEditing] = useState(false);

// Event handler while pressing any key while editing
const handleKeyDown = (event, type) => {
    const { key } = event;
    
    //these keys are for exiting (defocusing) the text fields
    const keys = ["Escape", "Tab"];
    const enterKey = "Enter";
    const allKeys = [...keys, enterKey]; // All keys array

    //these keys are to track whether price is being filled validly
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    const priceInput = [...numbers, ".", "Backspace"]

    //"setter" being true makes it so that the price is not changed on input
    //so if the user doesn't input a valid key don't update the input
    if (type === "price" && priceInput.indexOf(key) === -1) {
      setter(true)
    } else if (type === "price") {
      const dotPos = text.indexOf(".")
      /* Other times to not change the input
        - multiple decimals
        - more than 2 numbers after a decimal (assuming the user is typing past the decimal)
        - decimal before any numbers (this is debatable, can remove)
       */
      if((key === "." && dotPos > -1) ||
        (key != "Backspace" && dotPos > -1 && event.target.selectionStart > dotPos 
        && (dotPos + 2) < text.length) ||
        (key === "." && text.length === 0)) {
        setter(true)
      } else {
        setter(false)
      }
    }

  /* 
    check if text area or not, if textarea you want enter to move to next line
    but for everything else enter should defocus
  */
    if (
      (type === "textarea" && keys.indexOf(key) > -1) ||
      (type !== "textarea" && allKeys.indexOf(key) > -1)
    ) {
      setEditing(false);
      console.log(text)
    }
}

//used to focus the input element
useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
}, [isEditing, childRef]);

  //whether to display the "off input" element or the input element
  return (
    <section {...props}>
      {isEditing ? (
        <div
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => handleKeyDown(e, type)}
        >
          {children}
        </div>
      ) : (
        <div
          onClick={() => setEditing(true)}
        >
          {offInput}
        </div>
      )}
    </section>
  );
};

export default Editable;