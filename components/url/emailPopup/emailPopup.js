import * as Styled from "./emailPopup.styles";
//import React from "react";

//Closes the popup
function close(){
  document.getElementById("popup").style.visibility = 'hidden';
}

//Checks if the email matches regular email notation
function validateEmail(email) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return (true)
  }
  alert("You have entered an invalid email address!")
  return (false)
}


//Submits the inputted email to the base, makes the input empty, and closes the popup if completed
function submit(url){
  if (validateEmail(document.getElementById('input').value)){
    const sendEmail = async () => {
      const res = await fetch('/api/getEmail', {
        method: 'post',
        body: JSON.stringify({email: document.getElementById('input').value, url: url})
      });
    }
    
    if (sendEmail()){
      close();
    }
  }

  document.getElementById("input").value = "";
}

export default function EmailPopUp({url, restaurantName}) {
  return (
    <Styled.Root id="popup">

      {/*Close Component: Closes the Popup onClick*/}
      <Styled.Close onClick={() => close()}>
        X
      </Styled.Close>

      {/*TitleText Component: Uses the restaurant name to display the message*/}
      <Styled.TitleText>
        {"Enter your email to be added to the " + restaurantName + " mailing list!"}
      </Styled.TitleText>

      {/*Input: Form to type in and submit the email*/}
      <Styled.InputContainer>
        <Styled.Input id="input"></Styled.Input>
        <Styled.Submit id="submit" onClick={() => submit(url)}>Submit</Styled.Submit>
      </Styled.InputContainer>
      
    </Styled.Root>
  );
}
