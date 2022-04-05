import { useEffect } from "react";
import '@stripe/stripe-js';

export default function SudsCard() {
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
