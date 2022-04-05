import React, { useState, useEffect } from "react";
import * as Styled from "../editableCategory/editableCategory.styles";

const EditableFont = ({
  childRef,
  text,
  type,
  onOff,
  hider,
  children,
  setter,
  offInput,
  updater,
  ...props
}) => {
  
  // Manage the state to show button or inputs, by default the button
  const [isEditing, setEditing] = useState(false);

// Event handler while pressing any key while editing
const handleKeyDown = (event, type) => {
    const { key } = event;
    //using this editable font thing for the edit button so dont want to receive input under that
    if (type === "edit") {
      return
    }
    //these keys are for exiting (defocusing) the text fields
    const keys = ["Escape", "Tab"];
    const enterKey = "Enter";
    const allKeys = [...keys, enterKey]; // All keys array

    //the keys that are valid for input in hex color
    const temp = "abcdefABCDEF1234567890BackspaceShift";
    //dont allow typing when length >= 7 (and it's not backspace) and don't allow if not a valid key
    if ((text.length >= 7 && key != "Backspace") ||
        !temp.includes(key)) {
        setter(true)
    } else {
        setter(false)
    }

  /* 
    defocus is any of allkeys is pressed, and call the updater
  */
    if (allKeys.indexOf(key) > -1) {
      if(updater) {
        updater()
      }
      //on off is the way to bring the other buttons back after set editing becomes false 
      if(onOff) {
        onOff(false)
      }
      setEditing(false);
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
          onKeyDown={(e) => handleKeyDown(e, type)}
        >
          <Styled.FlexDiv>
            {(type === "edit" && !hider)? <Styled.SaveChangesWhole onClick={(e) => {
              if(updater) {
                  updater()
              }
              setEditing(false)
              if(onOff) {
                onOff(false)
              }
            }}>Save ALL</Styled.SaveChangesWhole> : <div></div>}
          {children}
          {(type === "edit")?  <div></div>: <Styled.SaveChanges onClick={(e) => {
              if(updater) {
                  updater()
              }
              setEditing(false)
              if(onOff) {
                onOff(false)
              }
            }}> Save Changes </Styled.SaveChanges>}
          </Styled.FlexDiv>
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

export default EditableFont;