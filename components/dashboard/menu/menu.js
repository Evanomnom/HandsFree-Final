import Head from "next/head";
import { useRouter, withRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Styled from "./menu.styles";
import Category from "../../url/category/category";
import get from "lodash/get";
import VizSensor from "react-visibility-sensor";
import { useRef, createRef, useMemo } from "react";
import Header from "../../url/header";
import EmailPopUp from "../../url/emailPopup"
import BackToTop from "../../url/backToTop"
//import { insertMenu } from "../functions/menuFunctions"

function Home({url, prop}) {
  //const { url } = router.query;

  //Declaring necessary state variables
  const [restaurant, setRestaurant] = useState(null);
  const [currentlyVisible, setCurrentlyVisible] = useState("loading");
  const [cats, setCats] = useState([]);
  const [hasBeenFiveSeconds, setHasBeenFiveSeconds] = useState(false);
  const [hasBeenTwelveSeconds, setHasBeenTwelveSeconds] = useState(false);
  const [popUpOpened, setPopUpOpened] = useState(false);
  const [locationInfo, setLocationInfo] = useState("");
  const [image, setImage] = useState(null);
  const [base, setBase] = useState("");

  const [backCol, setBackCol] = useState("");

  //Maps the restaurant data to a new object
  function formatRestaurant(raw) {
    return Object.keys(raw).map((key) => ({ ...raw[key] }));
  }

  //5 second timer
  useEffect(() => {
    const t = setTimeout(() => setHasBeenFiveSeconds(true), 5000);

    return () => clearTimeout(t);
  }, []);

  //12 second timer
  useEffect(() => {
    const t = setTimeout(() => setHasBeenTwelveSeconds(true), 12000);

    return () => clearTimeout(t);
  }, []);

  //Getting and filtering data here
  useEffect(() => {
    //getData takes the overall data set from storyblok and filters out the necessary information to display the menu for the current restaurant
    async function getData() {
      
      //use a get call on the mongodb to read menu based off the url
      const res = await fetch("/api/readMenu/"+url );
      const json = await res.json();
      //console.log(json);
      if (json) {
        console.log(json)
        //check the document found is a menu
        if (json.menuCheck) {
          setRestaurant(formatRestaurant(json.Menu))
          setLocationInfo(json.name)
          if (json.imageUrl) {
            setImage(json.imageUrl)
          } else {
              setImage(null)
          }

          if (json.backCol) {
            setBackCol(json.backCol)
          } else {
            setBackCol("#fff")
          }
        }
        //otherwise the site times out
      }
      
    }

    //Running the getData function itself
    getData();
  }, [url]);

  //Filter through the 'restaurant' variable to create the list of categories with references to divs
  useEffect(() => {
    if (restaurant) {
      const categories = restaurant.map((r, index) => ({
        label: r.name,
        ref: cats[index] || createRef(),
      }));
      setCats(categories);
    }
  }, [restaurant]);

  //Push a 404 error if the menu is not correctly created after the 5 second timer
  //might wanna get rid of this since it's part of the menu editor
  /*if (!restaurant || !cats.length) {
    if (hasBeenFiveSeconds) {
      prop.router.push("/404");
      return null;
    }

    return null;
  }*/

  //Open the email pop-up if its been twelve seconds and it hasn't been opened before
  if (hasBeenTwelveSeconds && !popUpOpened) {
    document.getElementById("popup").style.visibility = "visible";
    setPopUpOpened(true);
  }

  return (
    <Styled.Body col={backCol || "#fafafa"}>
      {/*Email PopUp Component: uses the database and restaurantName parameters to run the popup*/}

      <EmailPopUp
        url = {url}
        restaurantName = {locationInfo}
      />

      {/*BackToTop Component: displays a button that scrolls back to top of page once the user has scrolled down a bit*/}
      <BackToTop/>

      {/*Head: to set necessary title and links*/}
      <Head>
        <title>Hands Free Restaurant Menu</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      {/*Header Component: the bar on the top of the menu that displays restaurant name (locationInfo) and image. 
        Also passes the title of the currently visible category and all category options 
        to the 'Dropdown' component to create and update the dropdown menu.*/}
      {cats && <Header
        title={get(currentlyVisible, ["name"], "loading...")}
        locationInfo={locationInfo}
        options={cats}
        image={image}
        drop={true}
        reduce={true}
      />}

      {/*This container is basically the menu itself (displays all the menu items)*/}
      <Styled.Container col={backCol || "#fff"}>
        { //Mapping the restaurant variable to access the necessary category information to display all categories (and items) in the menu and correctly apply the div references
          restaurant &&
          backCol &&
          cats &&
          restaurant.length &&
          restaurant.map((category, index) => {
            return (
              /*VizSensor Component: updates the currentlyVisible variable to the category that 'isVisible' 
                Offset set so the component should be roughly in the center of the screen to be considered visible*/
              <VizSensor
                onChange={(isVisible) => {
                  if (isVisible){
                    setCurrentlyVisible(category);
                  }
                }}
                partialVisibility
                offset={{top:350, bottom:300}}
              >
                {/*Category Component: Contains the category name and all menu items that fall under that category
                  Also assigns the div references (which is necessary for VizSensor)*/}
                {cats[index] && <Category
                  ref={cats[index].ref  }
                  name={category.name}
                  menuItems={category.menuItems}
                  clFam={{col:category.col, fam: category.family, 
                    tCol: category.tCol, tFam: category.tFam, 
                    dCol: category.dCol, dFam: category.dFam, 
                    backCol: backCol, pCol: category.pCol, pFam:category.pFam}}
                />}
              </VizSensor>
            );
          })}
      </Styled.Container>
      
    </Styled.Body>
  );
}

export default withRouter(Home);
