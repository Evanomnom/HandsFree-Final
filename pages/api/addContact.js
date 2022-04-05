import nextConnect from 'next-connect';
import middleware from '../../middleware/mongodb';

const handler = nextConnect();
//let the handler use the connection made in ../middleware/mongodb.js
handler.use(middleware);

//post call to create a collection and add the menu to said collection
handler.post(async (req, res) => {
    //parse the body of the post request
    let data = req.body;
    data = JSON.parse(data)
    //just add a new document with the name email and phone of the restaurant
    let docTwo = await req.db.collection(data.collection).insertOne({name: data.name, email: data.email, phone: data.phone})
    res.send({message: 'ok'});
});

export default (req, res) => handler.apply(req, res) 