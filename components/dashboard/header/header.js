import React from "react";
import * as Styled from "./header.styles"
import { useState, useEffect, useRef } from "react";

//component for drop down
function Header({func, urls, options}) {
    const [open, setOpen] = useState(false);
    const toggle = () => setOpen(!open);
    //focused element coloured different
    const [focus, setFocus] = useState(null);
    const [urll, setUrll] = useState("")

    //separated the header into the persistent menu and the dropdown
    return ( 
        <Styled.Container>
            <Styled.LogoContainer onClick={toggle}>Menu URL: {urll}&#9660;</Styled.LogoContainer>
            <Styled.DropdownBody>
                <Styled.DropdownList>
                    {(open) && urls.map((url) => (
                        <Styled.DropdownURLItem col={(focus === url) ? "#DCDCDC" : "#F0F0F0"} 
                        onClick={(e) => {
                            setFocus(url)
                            func(url, "url")
                            setUrll(url)
                            }}>
                            {url}
                        </Styled.DropdownURLItem>
                        ))
                    }
                    <Styled.DropdownItemBreak/>
                    {options.map((option) => (
                        <Styled.DropdownItem col={(focus === option.type) ? "#DCDCDC" :"#F0F0F0"} 
                        onClick={(e) => {
                            setFocus(option.type)
                            func(option.type, "page")

                            }}>
                            {option.type}
                        </Styled.DropdownItem>
                        ))}
                </Styled.DropdownList>
            </Styled.DropdownBody>
        </Styled.Container>
    );
}

export default Header;