import nextConnect from 'next-connect';
import middleware from '../../middleware/mongodb';

const handler = nextConnect();
//let the handler use the connection made in ../middleware/mongodb.js
handler.use(middleware);

//post call to add id info to the _users collection
handler.post(async (req, res) => {
    //parse the body of the post request
    let data = req.body;
    data = JSON.parse(data)
    //adds customer ID field and number of locations to document with matching user ID field
    let collection = await req.db.collection("_users")

    collection.updateOne({id:{$eq: data.userId}},{$set:{urls:data.urls}}, (error, result) =>{
        if (error){
            console.log(error);
            res.status(error.status || 500).end(error.message);
            return;
        } else {
            res.json({status: 'ok'});
        }
    });
});

export default (req, res) => handler.apply(req, res) 