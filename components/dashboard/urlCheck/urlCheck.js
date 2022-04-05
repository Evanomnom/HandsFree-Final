import React, { useEffect, useState } from "react";
import * as Styled from "./urlCheck.styles"

function URLCheck({user}) {
    const [paying, setPaying] = useState(false);
    const [checkPaid, setCheckPaid] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [submitted, setSubmitted] = useState(false);

    //pulling user info from the database
    async function getUserInfo(){
        const res = await fetch('/api/auth0/findUserInfo', {
            method: 'post',
            body: JSON.stringify({
                userId: user.sub,
            }),
        });

        const info = await res.json();
        if (info.id){
            setUserInfo(info);
        }
        
        return;
    }

    //checks if the user is paying, if so set paying to true, if not set paying to false, either way set checkPaid to true
    //this is often basically commented out in test mode, since devs may not have access to stripe key
    async function checkPaying(){
        await getUserInfo();
        if(userInfo.customerId){
            const res = await fetch('/api/stripe/checkSubscription', {
                method: 'post',
                body: JSON.stringify({
                    id: userInfo.customerId,
                }),
            });
            const res2 = await res.json()
            setPaying(res2.paying)
        } else {
            setPaying(false);
        }
        setCheckPaid(true);
    }

    //sets the inputted URLs to the appropriate document in the db; unless any of the URLs are already taken or if any of the fields are blank, in which case we alert the user about that.
    //if the URLs get submitted, we change submitted to true
    async function setUrlsInDb(){
        var urlsList = []
        for (var i = 0; i < userInfo.urls.length; i++){
            if (document.getElementsByName("urlInput")[i].value != ""){
                urlsList.push(document.getElementsByName("urlInput")[i].value);
            } else {
                alert("Please enter a value for all URL fields")
                return;
            }
        }

        const check = await fetch('/api/database/checkUrls', {
            method: 'post',
            body: JSON.stringify({
                urls: urlsList
            }),
        });

        const checkStatus = await check.json();

        if(checkStatus.exists){
            var takenUrls = checkStatus.taken.toString()
            alert("The inputted url(s): " + takenUrls + " are already taken. Please choose different url(s)")
            return;
        } else {
            const res = await fetch('/api/addUrls', {
                method: 'post',
                body: JSON.stringify({
                    urls: urlsList,
                    userId: userInfo.id
                }),
            });
        }

        setSubmitted(true);
    }

    //checks if the users urls are empty (used to show the appropriate things)
    function checkUrlsEmpty(){
        if (userInfo && userInfo.urls){
            for (var i = 0; i < userInfo.urls.length; i++){
                if (userInfo.urls[i] != ""){
                    return false;
                }
            }
        }
        return true;
    }

    useEffect(() => {
        if(!checkPaid){
            checkPaying();
        }
    });

    return ( 
        <div>
            {(!checkPaid) && (<Styled.Alert>Loading Account Info...</Styled.Alert>)}
            {(checkPaid && !paying) && (<Styled.Alert>Please purchase a subscription</Styled.Alert>)}
            {(checkPaid && paying && !submitted && checkUrlsEmpty()) && (
                <Styled.CheckDiv>
                    <Styled.CheckTitle>Please Enter Your Desired URLs Below</Styled.CheckTitle>
                    {userInfo.urls.map((value, index) => {
                        return <Styled.CheckInput key={index} name="urlInput"></Styled.CheckInput>
                    })}
                    <Styled.CheckButton onClick={setUrlsInDb}>Submit</Styled.CheckButton>
                </Styled.CheckDiv>
            )}
            {(checkPaid && paying && (!checkUrlsEmpty()||submitted)) && (
                <Styled.Alert>Welcome to the HandsFree Dashboard! Choose a Menu URL in the dropdown on the left</Styled.Alert>
            )}
        </div>
    );
}

export default URLCheck;