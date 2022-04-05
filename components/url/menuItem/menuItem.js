import * as Styled from "./menuItem.styles";

export default function MenuItem({ name, description, price, clFam }) {
  return (
    <Styled.Card col={clFam.backCol || "#fdfdfd"}>
      <Styled.CardInfo>
        <Styled.Name col={clFam.tCol || "#000"} family={clFam.tFam || "Oswald, sans-serif"}>{name}</Styled.Name>
        <Styled.Description col={clFam.dCol || "#777"} family={clFam.dFam || "Inter, sans-serif"}>{description}</Styled.Description>
      </Styled.CardInfo>
      <Styled.CardPrice>
        <Styled.Price col={clFam.pCol || "#000"} family={clFam.pFam || "Oswald"}> {price}</Styled.Price>
      </Styled.CardPrice>
    </Styled.Card>
  );
}
