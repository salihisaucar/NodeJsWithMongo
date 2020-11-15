const moment = require("moment");

exports.checkRequest = (request) => {
  if (!request.body.hasOwnProperty("startDate")) {
    return {
      code: "-1",
      msg: "request must have startDate",
    };
  }
  if (!dateFieldControl(request.body.startDate)) {
    return {
      code: "-1",
      msg: "Check your date format, The format must be (YYYY-MM-DD)",
    };
  }

  if (!request.body.hasOwnProperty("endDate")) {
    return {
      code: "-1",
      msg: "request must have endDate",
      records: [],
    };
  }
  if (!dateFieldControl(request.body.endDate)) {
    return {
      code: "-1",
      msg: "Check your date format, The format must be (YYYY-MM-DD)",
    };
  }

  if (!request.body.hasOwnProperty("minCount")) {
    return {
      code: "-1",
      msg: "request must have minCount",
    };
  }
  if (!countControl(request.body.minCount)) {
    return {
      code: "-1",
      msg: "minCount must be integer type",
    };
  }
  if (!request.body.hasOwnProperty("maxCount")) {
    return {
      code: "-1",
      msg: "request must have maxCount",
    };
  }
  if (!countControl(request.body.maxCount)) {
    return {
      code: "-1",
      msg: "maxcount must be integer type",
    };
  }

  return {
    code: "0",
  };
};

function dateFieldControl(dateInfo) {
  const result = moment(dateInfo, "YYYY-MM-DD", true).isValid();

  return result;
}

function countControl(countInfo) {
  return Number.isInteger(countInfo);
}
