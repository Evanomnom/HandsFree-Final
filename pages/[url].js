import Head from "next/head";
import { useRouter, withRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Styled from "../styles/root";
import Category from "../components/url/category/category";
import get from "lodash/get";
import VizSensor from "react-visibility-sensor";
import { useRef, createRef, useMemo } from "react";
import Header from "../components/url/header";
import EmailPopUp from "../components/url/emailPopup"
import BackToTop from "../components/url/backToTop"
//import { insertMenu } from "../functions/menuFunctions"

function Home(props) {
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
      const res = await fetch("/api/readMenu/"+props.router.query.url );
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
      //Fetches raw data from storyblok JSON file with all restaurants
      /*const res = await fetch(
        `https://api.storyblok.com/v1/cdn/stories?token=KJr6eeHAQKf2w5bFw25Vlwtt&cv=${Math.floor(
          Date.now() / 1000
        )}`
      );

      //Sets stories object to the JSONified raw data
      const { stories } = await res.json();
      
      //Uses the url to find the data relevant to the current restaurant
      const data = stories.find(
        (s) => !!s && !!s.content && s.content.url === props.router.query.url
      );
      
      //Sets the 'body' variable equal to the 'body' information from the data; this is essentially the categories (entrees, desserts, beverages, etc) and items on the menu
      const body = get(data, ["content", "body"], null);
      
      //Finding more necessary info from the data
      const _locationInfo = get(data, ["content", "restaurantName"], "");

      const _image = get(data, ["content", "image"], null);

      const _base = get(data, ["content", "base"], "");
      
      //Parses through the body information (if it exists) and sets it to the 'restaurant' variable
      if (body) {
        setRestaurant(formatRestaurant(JSON.parse(body)));
      }

      //Setting global variables to the info found from the data (if it is found)
      if (_locationInfo) {
        setLocationInfo(_locationInfo);
      }

      if (_image) {
        setImage("https:" + _image);
      }

      if (_base) {
        setBase(_base);
      }
    }*/

    //Running the getData function itself
    getData();
  }, [props]);

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

  //used in the past to call insertMenu
  /*useEffect(() => {
    if (restaurant) {
      insertMenu(restaurant,props.router.query.url);
    }
  }, [restaurant])*/

  //console.log(props.router.query.url);
  //Push a 404 error if the menu is not correctly created after the 5 second timer
  if (!restaurant || !cats.length) {
    if (hasBeenFiveSeconds) {
      props.router.push("/404");
      return null;
    }

    return null;
  }

  //Open the email pop-up if its been twelve seconds and it hasn't been opened before
  if (hasBeenTwelveSeconds && !popUpOpened) {
    document.getElementById("popup").style.visibility = "visible";
    setPopUpOpened(true);
  }

  return (
    <Styled.Body>
      {/*Email PopUp Component: uses the database and restaurantName parameters to run the popup*/}

      <EmailPopUp
        url = {props.router.query.url}
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
      <Header
        title={get(currentlyVisible, ["name"], "loading...")}
        locationInfo={locationInfo}
        options={cats}
        image={image}
        drop={true}
      />

      {/*This container is basically the menu itself (displays all the menu items)*/}
      <Styled.Container col={backCol || "#fff"}>
        { //Mapping the restaurant variable to access the necessary category information to display all categories (and items) in the menu and correctly apply the div references
          restaurant &&
          backCol &&
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
                <Category
                  ref={cats[index].ref}
                  name={category.name}
                  menuItems={category.menuItems}
                  clFam={{col:category.col, fam: category.family, 
                    tCol: category.tCol, tFam: category.tFam, 
                    dCol: category.dCol, dFam: category.dFam, 
                    backCol: backCol, pCol: category.pCol, pFam:category.pFam}}
                />
              </VizSensor>
            );
          })}
      </Styled.Container>
      
    </Styled.Body>
  );
}

export default withRouter(Home);
