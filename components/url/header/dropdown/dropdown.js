import { useState, useEffect, useRef } from "react";

import * as Styled from "./dropdown.styles";

export default function Dropdown({ title, options, onChange }) {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  var titleFontSize = "16px";

  function handleClick(e) {
    if (!ref.current.contains(e.target)) {
      setOpen(false);
    }
  }

  console.log(title)

  if (title.length > 28){
    titleFontSize = "9px";
  } else if (title.length > 22){
    titleFontSize = "12px";
  }

  useEffect(() => {
    window.addEventListener("mousedown", handleClick, false);

    return () => window.removeEventListener("mousedown", handleClick, false);
  }, []);


  return (
    <Styled.Root ref={ref}>
      <Styled.TitleContainer onClick={toggle}>
        <Styled.Title id = 'DropdownTitleText' setsize = {titleFontSize}>{title}</Styled.Title>
        <Styled.Icon>&#9660;</Styled.Icon>
      </Styled.TitleContainer>
      {open && (
        <Styled.DropdownBody>
          <Styled.DropdownList>
            {options.map((option) => (
              <Styled.DropdownItem>
                <Styled.DropdownItemTarget
                  onClick={() => {
                    onChange(option.ref);
                    toggle();
                  }}
                >
                  {option.label}
                </Styled.DropdownItemTarget>
              </Styled.DropdownItem>
            ))}
          </Styled.DropdownList>
        </Styled.DropdownBody>
      )}
    </Styled.Root>
  );
}
