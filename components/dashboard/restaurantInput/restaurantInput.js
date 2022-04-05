import { useState } from "react";
import { insertMenu, checkPass } from "../../../functions/restFunctions"
import * as Styled from "./restaurantInput.styles"

export default function restaurantInput({handsUrl}) {
  //required variables
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [errorText, setErrorText] = useState("");
  const [error, setError] = useState("");
  const [path, setPath] = useState("");
  const [toHide, setToHide] = useState(false);
  const [pass, setPass] = useState("");

  //check if the menu already exists in the collection
  //if the collection doesnt exist, this call returns a placeholder
  async function getData() {      
    //use a get call on the mongodb to read menu based off the url
    const res = await fetch("/api/readMenu/" + handsUrl );
    console.log(res)
    const json = await res.json();
    console.log(json);
    if (json) {
      //check if a menu is found, and if so set found to true to not duplicate menus
      if (json.menuCheck) {
        return true
      }
    } else {
      console.log("some sort of error occurred")
      setErrorText("some sort of error occurred")
    }
    return false
  }

  //function for handling changing the menu name
  async function handleMenuName(e) {
    e.preventDefault();
    if (!name) {
      setErrorText("you cannot submit an empty name")
      return
    }

    const toSend = {"url":handsUrl, "name": name}
    //send the url and menu through the post call
    const res = await fetch("/api/menuSettings/changeMenuName", {
      method: 'POST',
      body: JSON.stringify(toSend),
    })

    if(res.status === 200) {
      setErrorText("successfully updated menu name")
    } else {
      setErrorText("something went wrong")
    }
  }
  
  //function for handling grubhub/doordash/postmates
  async function handleSubmitLink(e) {
    e.preventDefault();
    //one of the fields is not filled
    if (!url) {
      setErrorText("Url is empty, please enter a DoorDash, GrubHub, or PostMates link.")
      return
    }

    //check if the menu already exists in the collection named handsUrl
    //currently this only works if you press submit multiple times, the if doesn't wait for getdata to finish
    const handler = async (toFetch) => {
      const waitFor = await getData();
      //comment this out if you want users to be able to replace the current menu with an imported one
      /*
      if(waitFor) {
        return
      }
      */

      const result = await fetch(toFetch, {
        method: "POST",
        body: JSON.stringify({ url }),
      });

      const json = await result.json();
      console.log(json);

      if (json.result) {
        setError("");
        insertMenu(json.result, handsUrl, handsUrl);
      }
    }

    //figure out which link it is and call the correct api
    if (url.slice(0,20) == "https://www.grubhub.") {
      handler("/api/menuSettings/getGrubHubData")
    } else if (url.slice(0,20) == "https://www.doordash") {
      handler("/api/menuSettings/getDoorDashData")
    } else if (url.slice(0,20) == "https://postmates.co") {
      handler("/api/menuSettings/getPostMatesData")
    } else {
      setErrorText("not a valid url!")
    }
  }

  //only called on the update logo button
  async function updateLogo(e) {
    e.preventDefault();
    /*if(!toHide) {
      return
    }*/
    //return early if the handsurl or path is not filled
    if(!handsUrl || !path) {
      setErrorText("Link is empty. Please enter a link to an image.")
      return
    }
    //call to api using path and handsurl
    const res = await fetch("/api/menuSettings/cloudinaryFunc", {
      method: "POST",
      body: JSON.stringify({imageUrl:path, url:handsUrl})
    })

    console.log(res)
    if(res.status === 200) {
      setErrorText("successfully updated menu logo")
    } else {
      setErrorText("something went wrong")
    }
  }
  
  //function for checking password
  async function checkPass(e) {
    e.preventDefault()
    if (pass == "") {
      return
    }
    //need to make api call since the env variables can only be read there 
    const result = await fetch("/api/checkPass", {
      method: "POST",
      body: JSON.stringify({ pass:pass }),
    });
    const json = await result.json()
    if (json.ret) {
      setToHide(true)
    } 
  }

  return (
    <> 
      <Styled.Main>
        <Styled.SettingsTitle>Settings: {handsUrl}</Styled.SettingsTitle>
        <Styled.SettingDiv>
          <Styled.SettingLabelDiv>
            <Styled.SettingMainLabel>Auto-Insert Menu</Styled.SettingMainLabel>
            <Styled.SettingDescLabel>(Enter the menu's GrubHub OR DoorDash OR PostMates URL)</Styled.SettingDescLabel>
          </Styled.SettingLabelDiv>
          <Styled.InputDiv>
            <Styled.SettingInput
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              id="url"
            />
            <Styled.SettingButton onClick={handleSubmitLink}>Update Menu</Styled.SettingButton>
          </Styled.InputDiv>
        </Styled.SettingDiv>

        <Styled.SettingDiv>
          <Styled.SettingLabelDiv>
            <Styled.SettingMainLabel>Menu Name</Styled.SettingMainLabel>
            <Styled.SettingDescLabel>(Enter the menu's name)</Styled.SettingDescLabel>
          </Styled.SettingLabelDiv>
          <Styled.InputDiv>
            <Styled.SettingInput
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="url"
              />
            <Styled.SettingButton onClick={handleMenuName}>Update Name</Styled.SettingButton>
          </Styled.InputDiv>
        </Styled.SettingDiv>

        <Styled.SettingDiv>
          <Styled.SettingLabelDiv>
            <Styled.SettingMainLabel>Menu Logo</Styled.SettingMainLabel>
            <Styled.SettingDescLabel>(Enter a valid URL for the image)</Styled.SettingDescLabel>
          </Styled.SettingLabelDiv>
          <Styled.InputDiv>
            <Styled.SettingInput
              type="text"
              value={path}
              onChange={(e) => {setPath(e.target.value)
              console.log(path)}}
              id="url"
            /> 
            <Styled.SettingButton onClick={updateLogo}>Update Logo</Styled.SettingButton>
          </Styled.InputDiv>
        </Styled.SettingDiv>

        <p id="error">
          {errorText}
        </p>
      </Styled.Main>


      <style jsx>{`
      .toHide {
        visibility: ${toHide? 'hidden':'visible'}
      }
      .afterPass {
        visibility ${toHide? 'visible':'hidden'}
      }
      `}</style>
    </>
  );
}


