import React from "react";
import * as Styled from "./home.styles"
import URLCheck from "../urlCheck"

function Home({user, loading}) {

    //loading different things depending on state of login
    return ( 
        <div>
            {(loading) && (<Styled.Alert>Loading...</Styled.Alert>)}
            {(!loading && !user) && (<Styled.Alert>Please login to access your dashboard</Styled.Alert>)}
            {(user) && (<URLCheck user={user}>Logged In</URLCheck>)}
        </div>
    );
}

export default Home;