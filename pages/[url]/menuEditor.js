import { withRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import React from 'react';
import EditableCategory from "../../components/menuEditor/editableCategory"
import nextId from 'react-id-generator';
import Head from "next/head";
import * as Styled from "../../styles/root";
import Header from "../../components/url/header";
import AddCat from "../../components/menuEditor/addCat"
import EditableFont from "../../components/menuEditor/editableFont"
import { families, colors } from "../../components/menuEditor/varr"
import ColourPicker from "../../components/menuEditor/colourPicker/container"
import Sidebar from "../../components/dashboard/sidebar"

//page for menu editor
function menuEditor(props) {
  
  //used to focus on input fields (of changing all fonts/colours)
  const inputRef = useRef();

  const [display, setDisplay] = useState();

  const [location, setLocation] = useState("");
  //similar to editablecategory, this is the array in which menueditor is 
  //"informed of the changes" made by editable category
  const [destination, setDestination] = useState([]);
  const [image, setImage] = useState(null);
  const [cats, setCats] = useState([]);
  const [currentlyVisible, setCurrentlyVisible] = useState("loading");

  const [pass, setPass] = useState("")
  const [toHide, setToHide] = useState(false)

  //state variables for the colour/font family of category titles, item titles, item descriptions, and prices
  const [cl, setCl] = useState("");
  const [fam, setFam] = useState("");
  const [valid, setValid] = useState(false);

  const [tCl, setTCl] = useState("");
  const [tFam, setTFam] = useState("");
  const [tValid, setTValid] = useState(false);

  const [dCl, setDCl] = useState("");
  const [dFam, setDFam] = useState("");
  const [dValid, setDValid] = useState(false);

  const [pCl, setPCl] = useState("");
  const [pFam, setPFam] = useState("");
  const [pValid, setPValid] = useState(false);

  //for the background colour
  const [backCol, setBackCol] = useState("");
  const [bValid, setBValid] = useState(false);

  //track deletes for undos
  const [deleteStack, setDeleteStack] = useState([]);

  const [anotherEditing, setAnotherEditing] = useState(false);

  //format the menu in the json to use
  function formatRestaurant(raw) {
    return Object.keys(raw).map((key) => ({ ...raw[key] }));
  }

  //find the restaurant url and set it
  useEffect(() => {
    //getData takes the overall data set from storyblok and filters out the necessary information to display the menu for the current restaurant
    async function getData() {
      
      //use a get call on the mongodb to read menu based off the url
      const res = await fetch("/api/readMenu/"+props.router.query.url );
      const json = await res.json();
      //console.log(json);
      if (json) {
        //console.log(json)
        //check the document found is a menu
        if (json.menuCheck) {

          //load the data in and then assign it to destination
          const temp = formatRestaurant(json.Menu)
          const tempArr = temp.map((category, index) => {
            category.id = nextId()
            //set the back colour on load
            if(json.backCol) {
              category.backCol = json.backCol
            }            
            return category
          })
          let i = 0;
          for(i; i<tempArr.length;i++) {
            destination.push(tempArr[i])
          }
          //update the display
          updateDisplay()
          if (json.name) {
            setLocation(json.name)
          }
          //load in background colour
          if(json.backCol) {
            setBackCol(json.backCol)
          }
        } 
      }
      
    }
    //Running the getData function itself
    getData();
  }, [props]);
  

  //function for updating the display (called on adding and removing categories)
  function updateDisplay() {
    //addcat is used for adding categories
    //because the add cat is here not sure how to put on same line without moving addcat into a category
    //clfam has all the color and family info
    setDisplay(destination.map((category,index) => {
      return <div>
      <EditableCategory 
      key={category.idd || category.id}
      id={category.id} 
      name={category.name} 
      menuItems={category.menuItems}
      out={destination}
      updateDis={updateDisplay}
      del={deleteStack}
      clfam={{col:category.col, fam: category.family, 
        tCol: category.tCol, tFam: category.tFam, dCol: category.dCol,
         dFam: category.dFam, backCol:category.backCol,
        pCol: category.pCol, pFam: category.pFam}}
      />
      <Styled.CategoryContainer>
        <AddCat id={category.id} item={false} addFunc={handleAddCategory}/>
      </Styled.CategoryContainer>
        </div>
    }))
  }

  //currently due to a key issue using a temp function to re render the categories
  function temp() {
  setDisplay(<p>{cl || "hi"}</p>)
  }

  //the 8 below copy pasted codes are for updating the all category titles/item titles/item descriptions/price
  //when the colour/font family updates (could not think of a more elegant way to do this)
  //update id when something is updated so it can be replaced in display
  useEffect(() => {
    let i = 0;
    let k = "";
    for (i; i<destination.length; i++) {
      destination[i].col = cl
      k = nextId();
      destination[i].idd = k;
    }
    updateDisplay()
  }, [cl])

  useEffect(() => {
    let i = 0;
    let k = "";
    for (i; i<destination.length; i++) {
      destination[i].family = fam
      k = nextId();
      destination[i].idd = k;
    }
    updateDisplay()
  }, [fam])

  useEffect(() => {
    let i = 0;
    let k = "";
    for (i; i<destination.length; i++) {
      destination[i].tCol = tCl
      k = nextId();
      destination[i].idd = k;
    }
    updateDisplay()
  }, [tCl])

  useEffect(() => {
    let i = 0;
    let k = "";
    for (i; i<destination.length; i++) {
      destination[i].tFam = tFam
      k = nextId();
      destination[i].idd = k;
    }
    updateDisplay()
  }, [tFam])

  useEffect(() => {
    let i = 0;
    let k = "";
    for (i; i<destination.length; i++) {
      destination[i].dCol = dCl
      k = nextId();
      destination[i].idd = k;
    }
    updateDisplay()
  }, [dCl])

  useEffect(() => {
    let i = 0;
    let k = "";
    for (i; i<destination.length; i++) {
      destination[i].dFam = dFam
      k = nextId();
      destination[i].idd = k;
    }
    updateDisplay()
  }, [dFam])

  useEffect(() => {
    let i = 0;
    let k = "";
    for (i; i<destination.length; i++) {
      destination[i].pCol = pCl
      k = nextId();
      destination[i].idd = k;
    }
    updateDisplay()
  }, [pCl])

  useEffect(() => {
    let i = 0;
    let k = "";
    for (i; i<destination.length; i++) {
      destination[i].pFam = pFam
      k = nextId();
      destination[i].idd = k;
    }
    updateDisplay()
  }, [pFam])

  //this is so the the background colour updates when inputted
  useEffect(() => {
    let i = 0;
    let k = "";
    for (i; i < destination.length; i++) {
      destination[i].backCol = backCol;
      k = nextId();
      destination[i].idd = k;
    }
    updateDisplay()
  }, [backCol])  

  //testing function to find out what destination is
  async function logDest(e){
    e.preventDefault()
    console.log(destination)
  };

  //call the temp so that the update actually works
  //removed the temp but keeping here in case it breaks
  function updateColFam(e, which) {
    //temp()
    which(e.target.value)
  }

  //undo delete method
  function undoDelete(e) {
    e.preventDefault()
    //don't do anything if stack is empty
    if (deleteStack.length === 0) {
      return
    }

    //if it's an item you have to find the category it belonged to
    if(deleteStack[deleteStack.length - 1].type === "item") {
      const toInsert = deleteStack.pop()
      let i = 0;
      let k = "";
      for (i; i<destination.length; i++) {
        if (toInsert.id === destination[i].id) {
          destination[i].menuItems.splice(toInsert.pos, 0, toInsert.removed);
          k=nextId();
          destination[i].idd = k;
          updateDisplay()
          return;
        }
      }
    }

    //if it's a category just add it back in with position
    if(deleteStack[deleteStack.length - 1].type === "cat") {
      const toInsert = deleteStack.pop()
      destination.splice(toInsert.pos, 0, toInsert.removed);
      updateDisplay();
    }
  }

  //add a category
  async function handleAddCategory(e, id){
    if (e) {
      e.preventDefault()
    }

    //add a new category
    //if it's the top button add it to the bottom, but if it's called from a category add it above the category
    const newCat = {name:"", col:cl, family:fam, 
    tCol:tCl, tFam:tFam, dCol:dCl, dFam:dFam, backCol:backCol,
    id:nextId(), menuItems:[{id:nextId(), name:"", price:"", description:""}]}
    if (id) {
      const ind = destination.findIndex((element) => element.id === id)
      destination.splice(ind + 1, 0, newCat)
    } else {
      destination.push(newCat)
    }
    console.log(destination)

    //update the display with the new category
    updateDisplay()
  };

  //post request to api to update the menu
  async function sendData(e) {
    e.preventDefault()
    if (!toHide) {
      return
    }
    const result = await fetch("/api/menuEditor/updateMenu", {
      method: "POST",
      body: JSON.stringify({ url:props.router.query.url, Menu:destination, backCol: backCol}),
    }); 
    const json = await result.json()
    console.log(json)
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
      <div>
        <div className="afterPass">
        <input value={pass} onChange={(e) => {setPass(e.target.value) }}></input>
      <button onClick={(e) => checkPass(e)}>Submit</button>
        {/*<button onClick={(e) => setToHide(true)}>kekw</button>*/}
      </div>
      <div className="toHide">
        <Styled.Body >
        {/*taken from url js */}

        <Header
          title={"hi"}
          locationInfo={location}
          options={cats}
          image={image}
          drop={false}
        />
        {/*Head: to set necessary title and links*/}
        <Head>
          <title>{props.router.query.url} Hands Free Restaurant Menu</title>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          ></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <div>
          {/*<button onClick={(e) => logDest(e)}>log destination</button>*/}
          <button onClick={(e) => handleAddCategory(e)}>Add a category to the bottom</button>
          <button onClick={(e) => sendData(e)}>Save changes</button>
          <button onClick={(e) => undoDelete(e)}>Undo last delete</button>
          {/*<button onClick={(e) => console.log(deleteStack)}>log the delete stack</button>*/}


          <div className="topButtons">
          <EditableFont 
          childRef={inputRef}
          setter={setValid}
          onOff={setAnotherEditing}
          offInput={anotherEditing ? <p></p>:<Styled.ColFamButton onClick={(e) => setAnotherEditing(true)}>Change ALL title font family/colour</Styled.ColFamButton>}
          text={cl}
        > 
          <div>
          <Styled.ColorInput ref={inputRef} onChange={(e) => {if (!valid) updateColFam(e, setCl)}} value={cl || "#"}/>
          <ColourPicker col={colors} func={setCl}></ColourPicker>
          </div>
          <Styled.Selector onChange={(e) => updateColFam(e, setFam)}>
          {families.map((fami, index) => {
          return <option>{fami}</option>
            }
          )}
          </Styled.Selector>
          </EditableFont>

        <EditableFont 
          childRef={inputRef}
          setter={setTValid}
          onOff={setAnotherEditing}
          offInput={anotherEditing ? <p></p>:<Styled.ColFamButton onClick={(e) => setAnotherEditing(true)}>Change ALL item title font family/colour</Styled.ColFamButton>}
          text={tCl}
        >
          <div>
          <Styled.ColorInput ref={inputRef} onChange={(e) => {if (!tValid) updateColFam(e, setTCl)}} value={tCl || "#"}/>
          <ColourPicker col={colors} func={setTCl}></ColourPicker>
          </div>
          <Styled.Selector onChange={(e) => updateColFam(e, setTFam)}>
          {families.map((fami, index) => {
          return <option>{fami}</option>
            }
          )}
          </Styled.Selector>
        </EditableFont>

        <EditableFont 
          childRef={inputRef}
          setter={setDValid}
          onOff={setAnotherEditing}
          offInput={anotherEditing? <p></p>:<Styled.ColFamButton onClick={(e) => setAnotherEditing(true)}>Change ALL item description font family/colour</Styled.ColFamButton>}
          text={dCl}
        >
          <div>
          <Styled.ColorInput ref={inputRef} onChange={(e) => {if (!dValid) updateColFam(e, setDCl)}} value={dCl || "#"}/>
          <ColourPicker col={colors} func={setDCl}></ColourPicker>
          </div>
          <Styled.Selector onChange={(e) => updateColFam(e, setDFam)}>
          {families.map((fami, index) => {
          return <option>{fami}</option>
            }
          )}
          </Styled.Selector>
        </EditableFont>

        <EditableFont 
          childRef={inputRef}
          setter={setPValid}
          onOff={setAnotherEditing}
          offInput={anotherEditing? <p></p>:<Styled.ColFamButton onClick={(e) => setAnotherEditing(true)}>Change ALL price font family/colour</Styled.ColFamButton>}
          text={pCl}
        >
          <div>
          <Styled.ColorInput ref={inputRef} onChange={(e) => {if (!pValid) updateColFam(e, setPCl)}} value={pCl || "#"}/>
          <ColourPicker col={colors} func={setPCl}></ColourPicker>
          </div>
          <Styled.Selector onChange={(e) => updateColFam(e, setPFam)}>
          {families.map((fami, index) => {
          return <option>{fami}</option>
            }
          )}
          </Styled.Selector>
        </EditableFont>

        <EditableFont 
          childRef={inputRef}
          setter={setBValid}
          onOff={setAnotherEditing}
          offInput={anotherEditing? <p></p>:<Styled.ColFamButton onClick={(e) => setAnotherEditing(true)}>Change Background Colour</Styled.ColFamButton>}
          text={backCol}
        >
          <div>
          <Styled.ColorInput ref={inputRef} onChange={(e) => {if (!bValid) setBackCol(e.target.value)}} value={backCol || "#"}/>
          <ColourPicker col={colors} func={setBackCol}></ColourPicker>
          </div>
        </EditableFont>
        </div>
        </div>
        {/*This container is basically the menu itself (displays all the menu items)*/}
        <Styled.Container col={backCol || "#fff"}>
        {display}
        </Styled.Container>
        
      </Styled.Body>
      </div>
      </div>
      <style jsx>{`
      .toHide {
        visibility: ${toHide? 'visible':'hidden'}
      }
      .afterPass {
        visibility ${toHide? 'hidden':'visible'}
      }
      .topButtons {
        display:flex;
      }
      `}</style>
      </>
    );

}

export default withRouter(menuEditor);
