import { useState, useEffect, useRef } from "react";

import * as Styled from "./dropdown.styles";

export default function Dropdown({ title, options, onChange }) {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);


  function handleClick(e) {
    if (!ref.current.contains(e.target)) {
      setOpen(false);
    }
  }

  useEffect(() => {
    window.addEventListener("mousedown", handleClick, false);

    return () => window.removeEventListener("mousedown", handleClick, false);
  }, []);

  return (
    <Styled.Root ref={ref}>
      <Styled.TitleContainer onClick={toggle}>
        <Styled.Title>{title}</Styled.Title>
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
