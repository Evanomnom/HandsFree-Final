export default async (req, res) => {
    let data = req.body;
    data = JSON.parse(data);

    const stripe = await require('stripe')(process.env.STRIPE_SECRET_KEY_TEST);

    /*
    stripe.coupons.create(
        {
            currency: 'usd',
            amount_off: 5000,
            duration: 'once',
            name: 'Wwelcome5iftys',
            max_redemptions:10
        },
        function (err, coupon) {
            if (err){
                console.log(err)
            }else if (coupon){
                console.log(coupon)
            }
        }
    );
    

    stripe.coupons.create(
        {
            percent_off: 100,
            duration: 'once',
            name: 'Wwelcomem1nth',
            max_redemptions: 10
        },
        function (err, coupon) {
            if (err) {
                console.log(err)
            } else if (coupon) {
                console.log(coupon)
            }
        }
    );
    */

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price: 'price_1H0M6zCQaQoh4hobgiEBRux8',
                quantity: data.locations,
            },
            {
                price: 'price_1H0M7nCQaQoh4hobCHSOeJyi',
                quantity: 1,
            }
        ],
        mode: 'subscription',
        success_url: 'https://handsfree.restaurant/success',
        cancel_url: 'https://handsfree.restaurant/pricing'
    });

    res.json(session);
};
