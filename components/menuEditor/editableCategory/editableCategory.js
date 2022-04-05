import * as Styled from "./editableCategory.styles";
import MenuItem from "../../url/menuItem";
import EditableCard from "../editableCard"
import React, { useRef, useState, useEffect } from "react";
import nextId from 'react-id-generator';
import AddItem from '../addItem'
import Editable from "../editableCard/editable"
import DeleteItem from "../deleteItem"
import EditableFont from "../editableFont"
import EditButton from "../editButton"
import DeleteCat from "../deleteCat"
import ColourPicker from "../colourPicker/container"
//to change the available font families use a different file
import { families, colors } from "../varr"



//Editable category header and encapsulates the editable cards
export default React.forwardRef(({ name, menuItems, out, id, updateDis, clfam, del}, ref) => {

  const inputRef = useRef();
  const [newName, setNewName] = useState(name);
  const [items, setItems] = useState(menuItems);
  //this state variable is used to update the display (menu items) as they are added
  const [display, setDisplay] = useState();
  //this state variable is used to get the data from the children components
  const [newInfo, setnewInfo] = useState([]);

  //variables for setting category colour and font family, followed by item title and description
  const [col, setCol] = useState(clfam.col || "#D81A01");
  const [valid, setValid] = useState(false);
  const [family, setFamily] = useState(clfam.fam || "Inter")

  const [itemTCol, setItemTCol] = useState(clfam.tCol || "#000")
  const [itemTFam, setItemTFam] = useState(clfam.tFam || "Oswald")
  const [tValid, setTValid] = useState(false);

  const [itemDCol, setItemDCol] = useState(clfam.dCol || "#777")
  const [itemDFam, setItemDFam] = useState(clfam.dFam || "Inter")
  const [dValid, setDValid] = useState(false);

  const [itemPCol, setItemPCol] = useState(clfam.pCol || "#000")
  const [itemPFam, setItemPFam] = useState(clfam.pFam || "Oswald")
  const [pValid, setPValid] = useState(false);

  //variable to keep track if another thing is being edited right now
  const [anotherEditing, setAnotherEditing] = useState(false);

  //do when the app loads
  useEffect(() => {
    //give an id to each item so they know which item to replace when child is updated (any card info)
    setItems(items.map((item, index) => {
      item.id = nextId()
      return item
    }))
    //copy the "items" array over to the newInfo array 
    let i = 0;
    for (i; i<items.length; i++) {
        newInfo.push(items[i])
    }
    //set to display to display the current items
    updateDisplay()
  }, [])

  //trigger an update whenever one of the item titles/description colours/font families are updated
  useEffect(() => {
    updateDisplay()
  }, [col, itemTCol, itemDCol, itemTFam, itemDFam, itemPCol, itemPFam])

  useEffect(() => {
    updateArr()
  }, [display])

  //updates the display (used on adding and deleting items)
  function updateDisplay(type, thing) {
    setDisplay(newInfo.map((item,index) => {
      return <EditableCard 
      del={del}
      key={item.id}
      id={item.id} 
      name={item.name} 
      price={item.price}
      description={item.description}
      out={newInfo}
      par={id}
      clfam={{tCol:itemTCol, tFam:itemTFam, dCol:itemDCol, dFam:itemDFam, backCol:clfam.backCol, pCol:itemPCol, pFam: itemPFam}}
      updateDis={updateDisplay}></EditableCard>
    }))
    
  }

  //function for handling deleting a category
  function handleDeleteCat(e) {
    e.preventDefault()
    const ind = out.findIndex((element) => element.id === id)
    if (ind > -1) {
      //save the item in the delete stack before removing
      del.push({pos:ind, removed:out[ind], type:"cat"})
      out.splice(ind, 1)
      console.log(out)
    } else {
      console.log("not found")
    }
    updateDis()
  }

  //handler for adding a new menu item
  async function handleAdd(e){
    e.preventDefault()
    //as of right now, adding a new menu item does not inform the parent, the parent
    //will only be informed if that new item is modified 
    const newItem = {id:nextId(), name:"", price:"", description:""}
    newInfo.push(newItem);

    //update the display to show the new item
    updateDisplay()
  };

  //function for updating the parent when something in the category is updated
  function updateArr() {
    //again find the index of the item to replace and if it doesn't exist add it instead
    const ind = out.findIndex((element) => element.id === id)
    
    const toPush = {
      name: newName,
      menuItems: newInfo,
      id: id,
      col: col,
      family: family,
      tCol: itemTCol,
      tFam: itemTFam,
      dCol: itemDCol,
      dFam: itemDFam,
      backCol: clfam.backCol,
      pCol: itemPCol,
      pFam: itemPFam
    }
    if (ind > -1) {
      out[ind] = toPush
    } else {
      out.push(toPush)
    }
  }

  //if enter, tab or escape is pressed, also inform the parent of any changes
  function handleKeyDown(e) {
    const { key } = e;
    if (key === "Enter" || key === "Escape" || key === "Tab") {
      updateArr()
    } 
  }

  return (
    <Styled.Category onBlur={(e) => updateArr()} onKeyDown={(e) => handleKeyDown(e)}>
      {/*Displays title of the category above the items*/}
      <Styled.FlexDiv>
        <Editable
          type="input"
          childRef={inputRef}
          offInput={<Styled.CategoryTitle col={col} family={family} id = "CategoryTitle">
          {newName || "Enter a category title"}
            </Styled.CategoryTitle>}
          >
          <Styled.MovedInput
          type="text"
          name="itemName"
          placeholder="Enter a category title"
          value={newName}
          ref={inputRef}
          onChange={e => setNewName(e.target.value)}
        />
        </Editable>

        {/*4 buttons to change the category, item name, item description, 
        and price colours and fonts (hidden under an edit button)*/}

        <EditableFont
        type="input"
        type="edit"
        onOff={setAnotherEditing}
        hider={anotherEditing}
        offInput={<EditButton></EditButton>}>

          <Styled.FlexDiv>

          <EditableFont
          childRef={inputRef}
          setter={setValid}
          onOff={setAnotherEditing}
          offInput={anotherEditing ? <p></p>:<Styled.ColFamButton onClick={(e) => setAnotherEditing(true)}>Change <b>title</b> font family/colour</Styled.ColFamButton>}
          text={col}
        >
          <div>
          <Styled.ColorInput ref={inputRef} onChange={(e) => {if (!valid) setCol(e.target.value)}} value={col || "#"}/>
          <ColourPicker col={colors} func={setCol}></ColourPicker>
          </div>
          <Styled.Selector onChange={(e) => setFamily(e.target.value)}>
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
          offInput={anotherEditing ? <p></p>:<Styled.ColFamButton onClick={(e) => setAnotherEditing(true)}>Change <b>item title</b> font family/colour</Styled.ColFamButton>}
          text={itemTCol}
        > 
          <div>
          <Styled.ColorInput ref={inputRef} onChange={(e) => {if (!tValid) setItemTCol(e.target.value)}} value={itemTCol || "#"}/>
          <ColourPicker col={colors} func={setItemTCol}></ColourPicker>
          </div>
          <Styled.Selector onChange={(e) => setItemTFam(e.target.value)}>
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
          offInput={anotherEditing ? <p></p>:<Styled.ColFamButton onClick={(e) => setAnotherEditing(true)}>Change <b>item description</b> font family/colour</Styled.ColFamButton>}
          text={itemDCol}
        > 
          <div>
          <Styled.ColorInput ref={inputRef} onChange={(e) => {if (!dValid) setItemDCol(e.target.value)}} value={itemDCol || "#"}/>
          <ColourPicker col={colors} func={setItemDCol}></ColourPicker>
          </div>
          <Styled.Selector onChange={(e) => setItemDFam(e.target.value)}>
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
          offInput={anotherEditing ? <p></p>:<Styled.ColFamButton onClick={(e) => setAnotherEditing(true)}>Change <b>price</b> font family/colour</Styled.ColFamButton>}
          text={itemPCol}
        > <div>
          <Styled.ColorInput ref={inputRef} onChange={(e) => {if (!pValid) setItemPCol(e.target.value)}} value={itemPCol || "#"}/>
          <ColourPicker col={colors} func={setItemPCol}></ColourPicker>
          </div>
          <Styled.Selector onChange={(e) => setItemPFam(e.target.value)}>
          {families.map((fami, index) => {
          return <option>{fami}</option>
            }
          )}
          </Styled.Selector>
        </EditableFont>
        </Styled.FlexDiv>

        </EditableFont>
      </Styled.FlexDiv>
      {/*Container that stores all the menu items, which are created by mapping each item to a MenuItem component
      In order to display the nice add item button gotta put it in the container*/}
      <Styled.MenuItemsContainer>
        {display}
        <Styled.Card col={clfam.backCol}>
        <Styled.CardInfo>
          <AddItem addFunc={handleAdd} catName={newName}></AddItem>
        </Styled.CardInfo>
        </Styled.Card>
      </Styled.MenuItemsContainer>
      <DeleteCat itemName={newName} id={id} deleteFunc={handleDeleteCat}/>
    </Styled.Category>
  );
});