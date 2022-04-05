import React from "react";
import * as Styled from "./sidebar.styles"
import Header from "../header"

//component for sidebar
//func is the handling function to be called when an item is clicked
function Sidebar({urls, func, options, user}) {
    function handleLogin(){
        if (user){
            window.location.href = "/api/auth0/logout";
        } else {
            window.location.href = "/api/auth0/login";
        }
    }

    return ( 
        <Styled.Bar>
            <Styled.Logo src='logobig.png' alt='handsFree' />
            <Header urls={urls} func={func} options={options}></Header>
            <Styled.Login onClick={handleLogin}>{user ? "Sign Out" : "Sign In"}</Styled.Login>
        </Styled.Bar>
    );
}

export default Sidebar;