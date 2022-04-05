import { useRouter, withRouter } from "next/router";
import Sidebar from "../../components/dashboard/sidebar"
import * as Styled from "../../components/dashboard/dashboard.styles"
import Head from "next/head";
import { useEffect, useState } from "react";
import MenuEditor from "../../components/menuEditor/editor"

function Dashboard(props) {
    const [dis, setDis] = useState(<p>this is the home</p>)
    const [options, setOptions] = useState([{name:"Menu Editor", func:changeView}, {name:"garbage",func:changeView}, {name:"other", func:changeView}])
    const [menuEd, setMenuEd] = useState();
    const [show, setShow] = useState(false)
    useEffect (() => {
        console.log(props.router.query.url)
        if (props.router.query.url) {
            //setUrl(props.router.query.url)
            const temp = props.router.query.url
            setMenuEd(<MenuEditor url={temp}></MenuEditor>)
            //setDis(<MenuEditor url={temp}></MenuEditor>)
        }
    }, [props])
    
    function changeView(type) {
        if (type === "Menu Editor") {
            console.log()
            setShow(true)
            return
        } else if (type === "garbage") {
            setDis(<p>literal garbage</p>)
        } else {
            setDis(<p>this is the home</p>)
        }
        setShow(false)
    }

  return (
      <Styled.FullDiv>
        <Head>
          <title>Dashboard</title>
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

    <Sidebar options={options}></Sidebar>
    <Styled.MarginLeftDiv>
    {show? menuEd: dis}
    </Styled.MarginLeftDiv>
    </Styled.FlexDiv>
    </Styled.FullDiv>
  );
}

export default withRouter(Dashboard);
