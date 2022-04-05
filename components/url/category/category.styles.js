import styled from "styled-components";

export const CategoryBar = styled.div`
  width: 100%;
  display: flex;
  background-color: #001;
  height: 64px;
  box-shadow: 10px 10px 12px 0px rgba(0, 0, 0, 0.15);
`;

export const CategoryTitle = styled.h2`
  font-weight: 700;
  ${props => `
    color: ${props.col};
    font-family: ${props.family} , sans-serif;
  `}
  margin: 1rem auto;
`;

export const MenuItemsContainer = styled.div`
  padding-top: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
`;
