
import {MongoClient} from 'mongodb';
import nextConnect from 'next-connect';

//connect to the db, keep in mind the ip address needs to be whitelisted on atlas (right now all ip addresses are whitelisted)
//need to put into environment variable in api folder to hide
const client = new MongoClient(process.env.MONGO_KEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let cachedDb = null;

//connect to the restaurants database
async function database(req, res, next) {
  if (cachedDb) {
    req.dbClient = cachedDb;
    req.db = cachedDb.db('Restaurants')
    return next();
  }

  if (!client.isConnected()) {
    await client.connect();
    req.dbClient = client;
    req.db = client.db('Restaurants');
    cachedDb = client;
    return next();
  } else {
    req.dbClient = cachedDb;
    req.db = cachedDb.db('Restaurants')
    return next();
  }
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;