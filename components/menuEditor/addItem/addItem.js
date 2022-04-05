import React from "react";
import * as Styled from "./addItem.styles";

//simple component for an add button
function addItem({catName, addFunc}) {
    return ( 
        <div>
            <Styled.AddButton onClick={(e) => addFunc(e)}>+</Styled.AddButton>
        </div>
    );
}

export default addItem;