import nextConnect from 'next-connect';
import middleware from '../../../middleware/mongodb';

const cloudinary = require('cloudinary');
//commented out just in case but the thing should be in the env file
/*cloudinary.config({
    cloud_name:'djgr8br5u',
    api_key:'385676574695964',
    api_secret:'8qr-S38uZ0Vg5h-Uowl855ftvdk'
})*/

const handler = nextConnect();
//let the handler use the connection made in ../middleware/mongodb.js
handler.use(middleware);

//post call to create a collection and add the menu to said collection
handler.post(async (req, res) => {
    let data = req.body;
    data = JSON.parse(data)
    //even if the collection doesnt exist the image will be uploaded
    let collection = await req.db.collection(data.url)

    if (collection){
        cloudinary.uploader.upload(
            data.imageUrl,
            function (result) {
                //image data to add to the menu document
                var img = {
                    imageId: result.public_id,
                    imageUrl: result.url,
                    imageCreatedAt: new Date(),
                };
                
                collection.updateOne({menuCheck:true}, {$set: img})
                res.send(200)
            }
        )       
    } 
    //right now can only upload files based on online urls

});

export default (req, res) => handler.apply(req, res) 