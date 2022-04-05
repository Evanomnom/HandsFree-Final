import nextConnect from 'next-connect';
import middleware from '../../../middleware/mongodb';

const handler = nextConnect();
//let the handler use the connection made in ../middleware/mongodb.js
handler.use(middleware);

//post call to add id info to the _users collection
handler.post(async (req, res) => {
    //parse the body of the post request
    let data = req.body;
    data = JSON.parse(data)
    //adds a document with the ID if such a document doesn't already exist
    let collection = await req.db.collection("_users")
    collection.findOne({id:{$eq: data.id}}, (error, result) =>{
        if (error){
            console.log(error);
            res.json({ exists: false })
            res.status(error.status || 500).end(error.message);
            return;
        } else if (!result){
            collection.insertOne({id: data.id});
            res.json({exists:false})
        } else {
            console.log(result)
            res.json({exists:true})
        }
    });
});

export default (req, res) => handler.apply(req, res) 