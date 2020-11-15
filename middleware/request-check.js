const helper = require("../utility/request-helper");
exports.checkRequest = (req, res, next) => {
  var result = helper.checkRequest(req);
  if (result.code == "0") next();
  else res.send(result);
};
