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
    //checks to see if the any of the URLs the user submitted are already in the database
    let collection = await req.db.collection("_users")
    collection.find({urls:{$exists:true}}).toArray(await function (err, docs) {
        if (err){
            console.log(error);
            res.status(error.status || 500).end(error.message);
            return;
        }

        var exists = false;
        const entries = Object.values(docs)
        var urlList = [];
        var takenUrls = [];
        for (var entry of entries){
            urlList = urlList.concat(entry.urls);
        }
        for(var url of data.urls){
            if (urlList.includes(url)){
                exists = true;
                takenUrls.push(url);
            }
        }
        res.json({exists: exists, taken: takenUrls})
    });

});

export default (req, res) => handler.apply(req, res) 