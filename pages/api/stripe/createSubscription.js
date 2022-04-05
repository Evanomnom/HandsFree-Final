export default async (req, res) => {
    //parsing through req
    let data = req.body;
    data = JSON.parse(data);

    //loading stripe using environment variable
    const stripe = await require('stripe')(process.env.STRIPE_SECRET_KEY);

    /*
    const coupon = await stripe.coupons.create(
    {
        percent_off: 100,
        duration: 'once',
        id: 'HANDSFREE100OFF',
        max_redemptions: "20"
    });
    
    console.log(coupon)
    */

    try{
        //creates the customer using email, name, and payment method from req data
        const customer = await stripe.customers.create({
            email: data.email,
            name: data.name,
            payment_method: data.paymentMethodId,
            invoice_settings: {
                default_payment_method: data.paymentMethodId,
            }
        });
        console.log(customer)
        
        //pays for subscription using customer we just created
        //number of $10.60 fees for sub = number of locations
        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [
                { price: 'price_1H6oZRCQaQoh4hobOtCxk4yL', quantity: data.locations }
            ],
            add_invoice_items:[
                { price: 'price_1H6oZQCQaQoh4hobKd01wvgG'}
            ],
            coupon: data.coupon,
            expand: ['latest_invoice.payment_intent']
        });
        res.send(subscription);

    }catch (error) {
        return res.status('402').send({ error: { message: error.message } });
    }
};
