import { useEffect } from "react";
import '@stripe/stripe-js';

import {fetchUser} from '../lib/user'

export default function NickCard() {
  useEffect(() => {
    if (window) {
      window.location.replace("/index");
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
