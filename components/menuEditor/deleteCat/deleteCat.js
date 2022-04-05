import React from "react";
import * as Styled from "./deleteCat.styles";

//simple component for an delete button (category)
function deleteCat({itemName, id, deleteFunc}) {
    return ( 
        <div>
            <Styled.DeleteCat onClick={(e) => deleteFunc(e)}>Delete {itemName}</Styled.DeleteCat>
        </div>
    );
}

export default deleteCat;