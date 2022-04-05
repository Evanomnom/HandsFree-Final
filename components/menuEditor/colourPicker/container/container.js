import React, { useRef, useState, useEffect } from "react";
import * as Styled from "../colourPicker.styles";
import Circle from "../circle"

//container for the circles
//change the width of the container in styles
function container({col, func}) {
    const [colors, setColors] = useState(col || ["#b00", "#fff", "#0bb", "#000", "#369"]);
    return ( 
        <Styled.cont>
            {colors.map((color, index) => {
                return <Circle color={color} func={func}></Circle>
            }
            )}
        </Styled.cont>
    );
}

export default container;