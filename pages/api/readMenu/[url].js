import nextConnect from 'next-connect';
import middleware from '../../../middleware/mongodb';

const handler = nextConnect();
//let the handler use the connection made in ../middleware/mongodb.js
handler.use(middleware);

handler.get(async (req, res) => {
    //get the url to find the collection
    const url = req.query.url;
    
    //placeholder is used when nothing is found
    let placeholder = { "menuCheck": false };
    
    //find a document where menucheck is true
    let doc = await req.db.collection(url).findOne({menuCheck : true});

    //nothing is found use the placeholder
    if (!doc) {
        doc = placeholder
    }
    res.json(JSON.stringify(doc))
});
export default (req, res) => handler.apply(req, res) 