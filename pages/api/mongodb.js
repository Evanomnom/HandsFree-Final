
import {MongoClient} from 'mongodb';
import nextConnect from 'next-connect';

//connect to the db, keep in mind the ip address needs to be whitelisted on atlas (right now all ip addresses are whitelisted)
//need to put into environment variable in api folder to hide
const client = new MongoClient("mongodb+srv://admin:LlE5voEYysKVO68W@cluster0-sujxw.mongodb.net/<dbname>?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//connect to the restaurants database
async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db('Restaurants');
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;