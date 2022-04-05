import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 16px 8px;
  padding: 0 12px;
  ${props => `
  background-color: ${props.col};
`}
    
`;

export const Body = styled.div`
  width: 90vw;
  background-color: #fafafa;
`;