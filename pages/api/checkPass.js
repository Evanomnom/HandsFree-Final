export default (req, res) => sendRequest(req, res);

async function sendRequest(req, res) {
    return new Promise(async (resolve) => {
      if (req.method === "POST") {
        const body = JSON.parse(req.body);
        if (!body.pass) {
          res.statusCode = 400;
          res.end();
          return resolve();
        }
  
        if (body.pass == process.env.REST_PASSWORD) {
            res.statusCode = 200;
            res.end(JSON.stringify({ret:true}));
            resolve();
        } else {
            res.statusCode = 200;
            res.end(JSON.stringify({ret:false}));
            resolve();
        }
  
      } else {
        res.statusCode = 400;
  
        res.end();
        return resolve();
      }
    });
  };