const express = require("express");
const controller = require("../controllers/getir-some-data");
const middleware = require("../middleware/request-check");

const router = express.Router();

router.post(
  "/getSomeData",
  middleware.checkRequest,
  controller.getSomeDataFromMongoDb
);

module.exports = router;
