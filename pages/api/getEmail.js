import nextConnect from 'next-connect';
import middleware from '../../middleware/mongodb';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
    let data = req.body;
    data = JSON.parse(data);
    let collection = await req.db.collection(data.url)
    if (collection != null){
        collection.updateOne({emails:{ $exists: true }}, { $addToSet: { emails: data.email } }, {upsert:true});
    }
    res.send({ message: "ok" });
});


export default (req, res) => handler.apply(req, res) 