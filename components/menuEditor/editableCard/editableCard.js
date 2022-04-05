import React, { useRef, useState, useEffect } from "react";
import Editable from "./editable";
import * as Styled from "./editableCard.styles";
import DeleteItem from "../deleteItem"


function EditableCard({ name, description, price, id, out, updateDis, clfam , del, par}) {
  // State for the input
  //Ref is used to focus onto the editable item
  const inputRef = useRef();
  //set default values as given name description and price or otherwise empty strings
  const [newName, setNewName] = useState(name? name : "");
  const [newDesc, setNewDesc] = useState(description? description: "")
  const [newPrice, setNewPrice] = useState(price? price : "");
  //this is used to tell whether a user is inputting something invalid in the price field
  const [wrong, setWrong] = useState(false);

  // Update the array in the parent component (the category) so the changes are "saved"
  function updateArr() {
    //find the index of the item to replace by using id
    const ind = out.findIndex((element) => element.id === id)
    const toPush = {
      name: newName,
      price: newPrice,
      description: newDesc,
      id: id,
    }
    //if it's not in the array add it otherwise replace the index
    if (ind > -1) {
      out[ind] = toPush
    } else {
      out.push(toPush)
    }
  }

  //function for handling deleting an item
  function handleDeleteItem(e) {
    e.preventDefault()
    //find the index and splice it out
    const ind = out.findIndex((element) => element.id === id)
    if (ind > -1) {
      //save the item in the delete stack before removing, id is the id of the parent
      //to identify the category it was in
      del.push({pos:ind, removed:out[ind], type:"item", id:par})
      out.splice(ind, 1)
      console.log(out)
    } else {
      console.log("not found")
    }
    //call the "updatedisplay" function
    updateDis()
  }

  //update the array of the parent component on key press of the enter escape or tab
  function handleKeyDown(e) {
    const { key } = e;
    if (key === "Enter" || key === "Escape" || key === "Tab") {
      updateArr()
    } 
  }
  /*
    Enclose each editible field with the editable component.
    send the dynamic color and family from clfam prop
  */
  return (

    <Styled.Card col={clfam.backCol || "#fdfdfd"} onBlur={() => updateArr()} onKeyDown={(e) => handleKeyDown(e)}>
    <Styled.CardInfo >
        <Editable
        type="input"
        childRef={inputRef}
        offInput={<Styled.Name col={clfam.tCol} family={clfam.tFam}>{newName || "Enter a name here"}</Styled.Name>    }
        >
        <input
        type="text"
        name="itemName"
        placeholder="Enter a name here"
        value={newName}
        ref={inputRef}
        onChange={e => setNewName(e.target.value)}
      />
        </Editable>
        <Editable
        type="textarea"
        childRef={inputRef}
        offInput={   <Styled.Description col={clfam.dCol} family={clfam.dFam}>{newDesc || "Write the item description"}</Styled.Description>    }
        >
        <textarea
        type="text"
        name="itemDesc"
        rows="5"
        placeholder="Write the item description"
        value={newDesc}
        ref={inputRef}
        onChange={e => setNewDesc(e.target.value)}
      />
      </Editable>
    </Styled.CardInfo>
    <Styled.CardPrice>
        <Editable
        type="price"
        text={newPrice}
        childRef={inputRef}
        setter={setWrong}
        offInput={<Styled.Price col={clfam.pCol} family={clfam.pFam}>{newPrice || "$"}</Styled.Price>    }
        >
        <input
        type="text"
        name="itemPrice"
        placeholder="Enter a price here (only use numbers and .)"
        value={newPrice || "$"}
        ref={inputRef}
        onChange={e => {if (!wrong) setNewPrice(e.target.value)}}
      />
      </Editable>
      <DeleteItem itemName={newName} id={id} deleteFunc={handleDeleteItem}></DeleteItem>
    </Styled.CardPrice>
    </Styled.Card>
  );
}

export default EditableCard;