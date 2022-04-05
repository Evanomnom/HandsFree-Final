import * as Styled from "./category.styles";
import MenuItem from "../menuItem";
import React from "react";

export default React.forwardRef(({ name, menuItems, clFam }, ref) => {
  return (
    <div ref={ref}>

      {/*Displays title of the category above the items*/}
      <Styled.CategoryTitle col={clFam.col || "#D81A01"} family={clFam.fam || "Inter, sans-serif"} id = "CategoryTitle">
        {name}
      </Styled.CategoryTitle>

      {/*Container that stores all the menu items, which are created by mapping each item to a MenuItem component*/}
      <Styled.MenuItemsContainer>
        {menuItems.map((item) => (
          <MenuItem
            name={item.name}
            description={item.description}
            price={item.price}
            clFam = {clFam}
          />
        ))}
      </Styled.MenuItemsContainer>
    </div>
  );
});
