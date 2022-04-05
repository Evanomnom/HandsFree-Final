export default async (req, res) => {
    //parsing through req
    let data = req.body;
    data = JSON.parse(data);

    //loading stripe using environment variable
    const stripe = await require('stripe')(process.env.STRIPE_SECRET_KEY);

    try{
        //finds a user of the customerID
        await stripe.customers.retrieve(
            data.id,
            function(err, customer) {
                if (err){
                    res.json({err});
                } else {
                    console.log(customer.subscriptions.data[0].status)
                    if (customer.subscriptions.data[0].status == "active"){
                        res.json({paying:true})
                    } else {
                        res.json({paying:false})
                    }
                }
            }
        );
    }catch (error) {
        return res.status('402').send({ error: { message: error.message } });
    }
};
