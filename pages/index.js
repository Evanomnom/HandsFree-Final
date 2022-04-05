import { useEffect } from "react";
import '@stripe/stripe-js';

export default function Home() {
  useEffect(() => {
    if (window) {
      window.location.replace("/dashboard");
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
