// VERIFY BEARER TOKEN
module.exports = (req, res, next) => {
  const bearerToken = req.body.token;
  if (typeof bearerToken !== 'undefined') {
    const bearer = bearerToken.split(' ');
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.status(403);
  }
};
