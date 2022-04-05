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
    //find the collection
    let doc = await req.db.createCollection(data.url)
    //use replace one to update the whole document
    //reason I do this is because using update one and updating a price wont work since
    //it's stored with a $ and mongo uses that for syntax (e.g. $set)
    await doc.updateOne({menuCheck:true}, {$set: {Menu:data.Menu, name: data.name, menuCheck:true, backCol:data.backCol}}, {upsert: true})
    res.send({message: data.Menu});
});

export default (req, res) => handler.apply(req, res) 