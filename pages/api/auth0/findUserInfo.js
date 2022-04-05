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

    //finds userInfo tied to this userID
    let collection = await req.db.collection("_users")
    collection.findOne({id:{$eq: data.userId}}, (error, result) =>{
        if (error){
            console.log(error);
            res.json({id:null})
            //res.status(error.status || 500).end(error.message);
            return;
        } else if (!result){
            res.json({id:null})
        } else {
            res.json(result)
        }
    });
});

export default (req, res) => handler.apply(req, res) 