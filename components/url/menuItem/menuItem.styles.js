import styled from "styled-components";

export const Card = styled.div`
  display: flex;
  width: 46%;
  justify-content: space-between;
  border-radius: 3px;
  @media only screen and (max-width: 800px) {
    width: 100vw;
  }
  ${props => `
  background-color: ${props.col};
`}
`;
//
export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: center;
  width: 75%;
  height: 100%;
  margin: 1rem;
  text-align: left;
`;

export const Name = styled.h3`
  font-weight: 500;
  font-size: 18px;
  text-align: left;
  align-self: flex-start;
  margin: 0;
  padding: 0;
  letter-spacing: 1px;
  text-transform: uppercase;
  ${props => `
  color: ${props.col};
  font-family: ${props.family} , sans-serif;
`}
`;

export const Description = styled.p`
  font-weight: 400;
  ${props => `
  color: ${props.col};
  font-family: ${props.family} , sans-serif;
`}
  font-size: 14px;
  text-align: left;
  align-self: flex-start;
  padding-left: 10px;
  text-transform: lowercase;
`;

export const Price = styled.p`
  font-weight: 600;
  font-size: 18px;
  align-self: flex-start;
  text-align: right;
  ${props => `
  color: ${props.col};
  font-family: ${props.family} , sans-serif;
`}
`;

export const CardPrice = styled.div`
  width: 25%;
  display: flex;
  padding-right: 1.2rem;
  height: 100%;
  justify-content: flex-end;
`;
