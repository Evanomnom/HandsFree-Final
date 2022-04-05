import { useState } from "react";
import { insertMenu, checkPass } from "../functions/restFunctions"

export default function restaurantInput() {
  //required variables
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [handsUrl, setHandsUrl] = useState("");
  const [errorText, setErrorText] = useState("Please fill in all the above fields and hit submit.");
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

  async function handleSubmit(e) {
    e.preventDefault();
    if(!toHide) {
      return
    }
    //one of the fields is not filled
    if (!url || !name || !handsUrl) {
      setErrorText("One of the above fields is empty")
      console.log(url.slice(0,20) )
      return
    }

    //check if the menu already exists in the collection named handsUrl
    //currently this only works if you press submit multiple times, the if doesn't wait for getdata to finish
    const handler = async (toFetch) => {
      const waitFor = await getData();
      if(waitFor) {
        return
      }

      const result = await fetch(toFetch, {
        method: "POST",
        body: JSON.stringify({ url }),
      });

      const json = await result.json();
      console.log(json);

      if (json.result) {
        setError("");
        insertMenu(json.result, handsUrl, name);
      }
    }

    //figure out which link it is and call the correct api
    if (url.slice(0,20) == "https://www.grubhub.") {
      handler("/api/menuSettings/getGrubHubData")
    } else if (url.slice(0,20) == "https://www.doordash") {
      handler("/api/menuSettings/getDoorDashData")
    } else if (url.slice(0,20) == "https://postmates.co") {
      handler("/api/menuSettings/getPostMatesData")
    }
  }

  //only called on the update logo button
  async function updateLogo(e) {
    e.preventDefault();
    if(!toHide) {
      return
    }
    //return early if the handsurl or path is not filled
    if(!handsUrl || !path) {
      return
    }

    //call to api using path and handsurl
    const res = await fetch("/api/menuSettings/cloudinaryFunc", {
      method: "POST",
      body: JSON.stringify({imageUrl:path, url:handsUrl})
    })

    console.log(res)
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

      <div className="afterPass">
        <input value={pass} onChange={(e) => {setPass(e.target.value) }}></input>
        <button onClick={(e) => checkPass(e)}>Submit</button>
      </div>
    
      <div className="toHide">
      <form>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          id="url"
        />
        <label htmlFor="url">Enter the restaurant's GrubHub OR DoorDash OR PostMates URL.</label>
        <br></br>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="url"
        />
        <label htmlFor="url">Enter the restaurant's name.</label>
        <br></br>
        <input
          type="text"
          value={handsUrl}
          onChange={(e) => setHandsUrl(e.target.value)}
          id="url"
        />
        <label htmlFor="url">Enter the desired HandsFree url.</label>
      </form>
      <button onClick={handleSubmit}>hello</button>
      
      <p id="error">
        {errorText}
      </p>
      
      <br></br>

      <form onSubmit={(e) => {
            e.preventDefault();
        updateLogo(e)}}>
        <input
          type="text"
          value={path}
          onChange={(e) => {setPath(e.target.value)
          console.log(path)}}
          id="url"
        /> 
        <button>Update logo</button>
      </form>
      <p>Note that logo updating is separate from menu adding, and the HandsFree URL must be non empty for image uploading to work.</p>
      </div>


      <style jsx>{`
      .toHide {
        visibility: ${toHide? 'visible':'hidden'}
      }
      .afterPass {
        visibility ${toHide? 'hidden':'visible'}
      }
      `}</style>
    </>
  );
}


