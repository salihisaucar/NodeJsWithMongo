const services = require("../services/getir");

exports.getSomeDataFromMongoDb = async function (req, res) {
  var params = req.body;
  var data = await services.getData(params);
  res.send(data);
};
