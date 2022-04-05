import * as Styled from "./header.styles";
import Dropdown from "./dropdown";

export default function Header({ title, locationInfo, options, image, drop, reduce }) {
  //widths are for adjusting to smaller screen sizes
  return (
    <Styled.Root wid={reduce? "90vw" : "100vw"} 
    wid2={reduce? "90vw" : "100vw"}
    wid3={reduce? "95vw" : "100vw"}
    wid4={"100vw"}>
      <Styled.LogoContainer>
        <Styled.LogoImage src={image} />
      </Styled.LogoContainer>
      <Styled.InfoContainer>
        <Styled.LocationText>{locationInfo}</Styled.LocationText>
        {drop? <Dropdown
          onChange={(o) => {
            var categoryTitle = o.current.children[0];
            categoryTitle.scrollIntoView({block:'center'});
          }}
          title={title}
          options={options}
        /> : <p></p>}
      </Styled.InfoContainer>
    </Styled.Root>
  );
}
