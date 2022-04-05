import styled from "styled-components";

export const Root = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: black;
  ${props => `

  width: ${props.wid};

  @media only screen and (max-width: 1100px) {
    width: ${props.wid2};
  }
  @media only screen and (max-width: 750px) {
    width: ${props.wid3};
  }
  @media only screen and (max-width: 479px) {
    width: ${props.wid4};
  }
`}
    
`;

export const LogoContainer = styled.div`
  margin: 10px;
`;

export const InfoContainer = styled.div`
  padding-left: 12px;
  position: relative;
`;

export const LocationText = styled.p`
    font-family: 'Inter'; sans-serif;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 1.5px;
    color: white;
`;

export const LogoImage = styled.img`
  height: 100px;
  width: 100px;
`;
