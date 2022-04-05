import nextConnect from 'next-connect';
import middleware from '../../../middleware/mongodb';

const handler = nextConnect();
//let the handler use the connection made in ../middleware/mongodb.js
handler.use(middleware);

//post call to create a collection and add the menu to said collection
handler.post(async (req, res) => {
    //parse the body of the post request
    let data = req.body;
    data = JSON.parse(data)
    //create the collection, then add document to said collection, variables are not used
    let doc = await req.db.createCollection(data.url)
    //let docTwo = await req.db.collection(data.url).insertOne({Menu : data.menu, name: data.name, menuCheck: true})
    await req.db.collection(data.url).updateOne({menuCheck: true},{$set: {name: data.name, menuCheck: true}}, {upsert: true})
    res.send({message: "ok"});
});

export default (req, res) => handler.apply(req, res) 