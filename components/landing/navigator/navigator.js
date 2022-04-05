import * as Styled from "./navigator.styles";
//import React from "react";

export default function Navigator() {
  return (
    <Styled.Navigator>
      <div>
        <Styled.Logo src='logobig.png' alt='handsFree'/>
      </div>
      <Styled.LinksDiv>
        <Styled.TextDiv>
          <Styled.Link href="/index">Home</Styled.Link>
          <Styled.Link href="/pricing">Pricing</Styled.Link>
          <Styled.Link href="/api/auth0/login">Login</Styled.Link>
          <Styled.Link href="/api/auth0/logout">Logout</Styled.Link>
        </Styled.TextDiv>
      </Styled.LinksDiv>
    </Styled.Navigator>
  );
}
