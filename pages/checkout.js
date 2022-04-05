import { useEffect, useState } from "react";
import '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import {fetchUser} from '../lib/user';

import * as Styled from "../styles/checkout/checkout.styles";

//Loading stripe using public key
const stripePromise = loadStripe("pk_live_mYPsh9ZhjMGxb87w4vwoH0Gk00Mx83iw2k");

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  //Global variable for user (from auth0)
  let user;

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [locations, setLocations] = useState("1");
  const [coupon, setCoupon] = useState("");
  const [code, setCode] = useState("");

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    }
  };

  function handlePaymentThatRequiresCustomerAction({
    subscription,
    invoice,
    paymentMethodId,
    isRetry,
  }) {
    if (subscription && subscription.status === 'active') {
      // Subscription is active, no customer actions required.
      return { subscription: subscription, paymentMethoodId: paymentMethodId };
    }

    // If it's a first payment attempt, the payment intent is on the subscription latest invoice.
    // If it's a retry, the payment intent will be on the invoice itself.
    let paymentIntent = invoice ? invoice.payment_intent : subscription.latest_invoice.payment_intent;

    if (
      paymentIntent.status === 'requires_action' ||
      (isRetry === true && paymentIntent.status === 'requires_payment_method')
    ) {
      return stripe
        .confirmCardPayment(paymentIntent.client_secret, {
          payment_method: paymentMethodId,
        })
        .then((result) => {
          if (result.error) {
            // Start code flow to handle updating the payment details.
            // Display error message in your UI.
            // The card was declined (i.e. insufficient funds, card has expired, etc).
            throw result;
          } else {
            if (result.paymentIntent.status === 'succeeded') {
              // Show a success message to your customer.
              // There's a risk of the customer closing the window before the callback.
              // We recommend setting up webhook endpoints later in this guide.
              return {
                subscription: subscription,
                invoice: invoice,
                paymentMethodId: paymentMethodId,
              };
            }
          }
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      // No customer action needed.
      return { subscription: subscription, paymentMethodId: paymentMethodId };
    }
  }

  //Uses the information from the form to process the subscription payment, then links the Stripe Customer ID to Auth0 User ID in the database if successful
  async function createSubscription({ paymentMethodId }) {
    const res = await fetch('/api/stripe/createSubscription', {
        method: 'post',
        body: JSON.stringify({
          paymentMethodId: paymentMethodId,
          email: email,
          name: name,
          locations: locations,
          coupon: coupon
        }),
      });

     const subscription = await res.json();
     
     /*
     var res2 = await handlePaymentThatRequiresCustomerAction({paymentMethodId: paymentMethodId, subscription: subscription});
     console.log(res2.subscription);
     */

     if (subscription.error){
       alert("Payment wasn't successful, please try again");
       throw subscription;     
     }

     if (subscription.status === "active"){
       const dbRes = await fetch('/api/stripe/addCustomerIdToDatabase', {
         method: 'post',
         body: JSON.stringify({
           userId: user.sub,
           customerId: subscription.customer,
           locations: locations
         }),
       });

       showSuccessPopup();

       return;
     } else {
       alert("Payment wasn't successful, please try again");
       return;
     }
  
  }

  //Establishes if the user is logged in, if they are we create the payment method using the card info from the form
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    user = await fetchUser();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    if(!user){
      alert("Please signup/login prior to purchasing a subscription")
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
      console.log(user);
      await createSubscription({ paymentMethodId: paymentMethod.id });
    }
  };

  const createCoupon = async(event) =>{
    const res = await fetch('/api/stripe/createCoupon', {
      method: 'post'
    });
  }

  function showSuccessPopup(){
    console.log('test');
    document.getElementById('popup').style.visibility = "visible";
    document.getElementById('main').style.opacity = ".2";
  }


  return (
    <Styled.RootDiv>
      <Styled.MainDiv id='main'>
        <Styled.CheckoutDiv>
          <form>
            <Styled.CheckoutLabel htmlFor="email">Email</Styled.CheckoutLabel><br/>
            <Styled.CheckoutInput type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}required/><br/>
            <Styled.CheckoutLabel htmlFor="name">Name on card</Styled.CheckoutLabel><br />
            <Styled.CheckoutInput type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}required/><br />
            <Styled.CheckoutLabel>
              Card details
              <CardElement
              options={CARD_ELEMENT_OPTIONS}
              />
            </Styled.CheckoutLabel>
            <Styled.CheckoutLabel htmlFor="locations">Number of locations</Styled.CheckoutLabel><br />
            <Styled.CheckoutInput type="text" id="locations" name="locations" value={locations} onChange={(e) => setLocations(e.target.value)} required/><br />
            <Styled.CheckoutLabel htmlFor="coupon">Discount/coupon code</Styled.CheckoutLabel><br />
            <Styled.CheckoutInput type="text" id="coupon" name="coupon" value={coupon} onChange={(e) => setCoupon(e.target.value)} /><br />
            <Styled.SubmitDiv>
              <Styled.SubmitButton onClick={handleSubmit}>Pay</Styled.SubmitButton>
            </Styled.SubmitDiv>
          </form>
        </Styled.CheckoutDiv>
        <Styled.CartDiv>
          <Styled.CartTitle>Cart</Styled.CartTitle>
          <Styled.ItemDiv>
            <Styled.Item>Setup Fee (one-time)</Styled.Item>
            <Styled.Cost>$50</Styled.Cost>
          </Styled.ItemDiv>
          <Styled.ItemDiv>
            <Styled.Item>Subscription (monthly)</Styled.Item>
            <Styled.Cost>${20*locations}</Styled.Cost>
          </Styled.ItemDiv>
          <Styled.ItemDiv>
            <Styled.Item>Tax (monthly)</Styled.Item>
            <Styled.Cost>${1*locations}</Styled.Cost>
          </Styled.ItemDiv>
          <Styled.TotalItemDiv>
            <Styled.TotalItem>Total</Styled.TotalItem>
            <Styled.TotalCost>${50+ (20*locations) + (1*locations)}</Styled.TotalCost>
          </Styled.TotalItemDiv>
        </Styled.CartDiv>
      </Styled.MainDiv>
      <Styled.PopupDiv id='popup'>
        <Styled.PopupTitle>Payment Successful!</Styled.PopupTitle>
        <Styled.PopupButton onClick={()=>(window.location.replace("/dashboard"))}>Go to Dashboard</Styled.PopupButton>
      </Styled.PopupDiv>
    </Styled.RootDiv>
  );
}

export default function Checkout(){
  //need this so we can wrap payment from with stripePromise (just how you gotta do it)
  return(
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}
