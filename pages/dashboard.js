import { useRouter, withRouter } from "next/router";
import Sidebar from "../components/dashboard/sidebar"
import * as Styled from "../components/dashboard/dashboard.styles"
import Head from "next/head";
import { useEffect, useState } from "react";
import MenuEditor from "../components/menuEditor/editor"
import nextId from 'react-id-generator';
import Qr from "../components/qr/qr";
import Menu from "../components/dashboard/menu";
import Home from "../components/dashboard/home";
import RestaurantInput from "../components/dashboard/restaurantInput"

import { useFetchUser } from '../lib/user';

//you can use this as the dashboard too
function Dashboard(props) {
  //just list the types in options
  const [options, setOptions] = useState([{ type: "Home" }, { type: "Menu Settings" }, {type:"Menu Editor"}, {type:"Menu Preview"}, {type:"QR"},  ])
  const [urls, setUrls] = useState([""])
  const [url, setUrl] = useState("")
  const [type, setType] = useState("Home")
  const {user, loading} = useFetchUser();

  var home = <Home user={user} loading={loading} />;

  //pulls URLs from database based on logged in user ID
  async function getURLs() {
    const res = await fetch('/api/auth0/findUserInfo', {
      method: 'post',
      body: JSON.stringify({
        userId: user.sub,
      }),
    });

    const info = await res.json();
    if (info.id && info.urls) {
      setUrls(info.urls);
    }

    return;
  }

  //checks if URLs are empty
  function checkUrlsEmpty(urls) {
    for (var i = 0; i < urls.length; i++) {
      if (urls[i] != "") {
        return false;
      }
    }
    return true;
  }

  //if the user is logged in and URLs are empty, get the URLs from the database
  useEffect(() => {
    if (checkUrlsEmpty(urls) && user) {
      getURLs();
    }
  });

  //change the view based on sidebar
  function changeView(type, which) {
    if (user)
      //depending on what is clicked (a url or page) set differently
      if (which === "page") {
        if(url != ""){
          setType(type)
        }
      } else if (which === "url") {
        setUrl(type)
      }
    }

  return (
    <Styled.FullDiv>
      <Head>
        <title>HandsFree Dashboard</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <Styled.FlexDiv>
        <Sidebar urls={urls} func={changeView} options={options} user={user}></Sidebar>
        <Styled.MarginLeftDiv>
        </Styled.MarginLeftDiv>
        {(type === "Home") && (home)}
        {(type === "Menu Editor") && (<MenuEditor key={nextId()} url={url}></MenuEditor>)}
        {(type === "Menu Preview") && (<Menu prop={props} url={url}></Menu>)}
        {(type === "QR") && <Qr url={url}></Qr>}
        {(type === "Menu Settings") && <RestaurantInput handsUrl={url}></RestaurantInput>}
      </Styled.FlexDiv>
    </Styled.FullDiv>
  );
}

export default withRouter(Dashboard);
