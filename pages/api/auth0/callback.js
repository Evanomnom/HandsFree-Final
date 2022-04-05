import auth0 from '../../../middleware/auth0';

export default async function callback(req, res) {
  try {
    await auth0.handleCallback(req, res, {redirectTo: '/callbackHandle'});
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end(error.message);
  }
}