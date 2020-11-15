var MongoClient = require("mongodb").MongoClient;
var config = require("../config/config");

exports.getData = async function getData(params) {
  var data = {};
  const client = await MongoClient.connect(config.conString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).catch((err) => {
    data = {
      code: -1,
      msg: `Fail error : ${err}`,
    };
  });

  try {
    const db = client.db(config.dbName);
    let collection = db.collection(config.collectionName);

    data = await collection
      .aggregate([
        {
          $project: {
            _id: 0,
            key: 1,
            created: 1,
            totalCount: { $sum: "$counts" },
          },
        },
        {
          $match: {
            $and: [
              {
                totalCount: { $gt: params.minCount, $lt: params.maxCount },
                created: {
                  $gte: new Date(params.startDate),
                  $lt: new Date(params.endDate),
                },
              },
            ],
          },
        },
      ])
      .toArray();
    return setModel(data);
  } catch (err) {
    data = {
      code: -1,
      msg: `Fail error : ${err}`,
    };
  }
};

function setModel(resultData) {
  return {
    code: 0,
    msg: "Success",
    records: resultData,
  };
}
