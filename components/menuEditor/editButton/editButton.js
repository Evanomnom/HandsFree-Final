import React from "react";
import * as Styled from "./editButton.styles";

//simple component for an edit button using hard coded location of thing in public
function EditButton({}) {
    return ( 
        <div>
            <Styled.ImageButton type="image" src={"/edit.png"}></Styled.ImageButton>
        </div>
    );
}

export default EditButton;