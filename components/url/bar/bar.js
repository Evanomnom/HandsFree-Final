import * as Styled from "./bar.styles";
import Dropdown from "./dropdown";

export default function Bar({ name, options }) {
  return (
    <Styled.Root>
      <Dropdown
        onChange={(o) => {
          o.current.scrollIntoView({block: 'center'});
        }}
        title={name}
        options={options}
      />
    </Styled.Root>
  );
}
