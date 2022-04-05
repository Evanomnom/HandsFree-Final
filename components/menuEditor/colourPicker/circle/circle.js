import React from "react";
import * as Styled from "../colourPicker.styles";

//circles for the colour picker
function circle({color, func}) {
    return ( 
            <Styled.circleButton col={color || "#b00"} onClick={(e) => func(color)}></Styled.circleButton>
    );
}

export default circle;