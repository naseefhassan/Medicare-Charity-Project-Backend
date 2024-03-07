const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({message: 'No token provided'});
  }
  token = token.split(' ')[1];
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({message: 'Invalid token'});
    }
    req.user = decoded;
    next();
  });
};

module.exports=verifyToken;
