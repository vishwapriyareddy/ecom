const expressJwt = require("express-jwt");
const { user } = require("../models/user");

function authJwt() {
  const secret = process.env.secret;
  const api = process.env.API_URL;
  return expressJwt({
    secret,
    algorithms: ["HS256"], //requestProperty: 'auth',
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/public\/uploads(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/categories(.*)/, methods: ["GET", "OPTIONS"] },

      `${api}/users/login`,
      `${api}/users/register`,
    ],
  });
}
async function isRevoked(req, payload, done) {
  if (!payload.isAdmin) {
    done(null, true);
  }
  done();
}
// const isAdmin = async (req, res, next) => {

//     // no need to verify token again
//     // the `req.user.isAdmin` is already available from isAuth
//     // also no need to query a database, we have all the info we need from the token
//     if (!req.User.isAdmin)
//         return res.status(401).sendStatus({ msg: "Not an admin, sorry" });

//     next();
// };
module.exports = authJwt;
