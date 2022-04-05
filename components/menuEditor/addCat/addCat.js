import React from "react";
import * as Styled from "../addItem/addItem.styles";

//simple component for an add button
function addCat({catName, addFunc, id}) {
    return ( 
        <Styled.CenterDiv>
            <Styled.AddButton onClick={(e) => addFunc(e,id)}>+</Styled.AddButton>
        </Styled.CenterDiv>
    );
}

export default addCat;