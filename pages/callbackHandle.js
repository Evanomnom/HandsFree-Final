import { useEffect } from "react";
import { fetchUser } from '../lib/user';
import '@stripe/stripe-js';

export default function callbackHandle() {
  //Adds the userID to the database (if not already there), then redirects to checkout if its the first time signing in
  async function addUserToDB(){
    const user = await fetchUser();

    const res = await fetch('/api/auth0/addToDatabase', {
      method: 'post',
      body: JSON.stringify({ id: user.sub })
    });

    const data = await res.json()

    if (data.exists){
      window.location.replace("/dashboard");
    } else {
      window.location.replace("/checkout");
    }
  }

  useEffect(() => {
    if (window){
      addUserToDB();
    }
  });
  
  return (
    <h1
      style={{
        textAlign: "center",
        paddingTop: "calc(50vh - 16px)",
        fontSize: 32,
        fontFamily: "'Oswald', sans-serif",
      }}
    >
      Loading...
    </h1>
  );
}
