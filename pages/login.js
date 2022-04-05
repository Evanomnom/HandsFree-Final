import { useEffect } from "react";
import '@stripe/stripe-js';

export default function Login() {
  useEffect(() => {
    if (window) {
      window.location.replace("/api/auth0/login");
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
