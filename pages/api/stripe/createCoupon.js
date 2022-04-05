export default async (req, res) => {
    //loading stripe using environment variable
    const stripe = await require('stripe')(process.env.STRIPE_SECRET_KEY);

    const coupon = await stripe.coupons.create(
    {
        percent_off: 100,
        duration: 'once',
        id: 'HANDSFREE100OFF',
        max_redemptions: "20"
    });
    
    console.log(coupon)
};
