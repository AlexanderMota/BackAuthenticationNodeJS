module.exports = function(req, res, next) {
  const queryStrings = req.query;
  for (const key in queryStrings) {
    const isValid = queryStrings[key].length > 20 ? 
      false : !isNaN(parseInt(queryStrings[key]));

    if (isValid) {
      queryStrings[key] = parseInt(queryStrings[key]);
    }
  }

  req.query = queryStrings;
  next();
};
