import React from "react";
import * as Styled from "./deleteItem.styles";

//simple component for an delete button
function deleteItem({loc, itemName, id, deleteFunc}) {
    return ( 
        <div>
            <Styled.DeleteButton onClick={(e) => deleteFunc(e)}>-</Styled.DeleteButton>
        </div>
    );
}

export default deleteItem;