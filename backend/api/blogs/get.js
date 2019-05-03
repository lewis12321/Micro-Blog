const AWS = require('aws-sdk');
const utils = require('./utils');

AWS.config.update({ region: 'eu-west-2' });

const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.handler = (event, ctx, callback) => {
    getBlog(event, callback)
};

const getBlog = (event, callback) => {

    console.log(`get blog for id=${event.pathParameters.id}`)
    if (!event.pathParameters || !event.pathParameters.id) {
        console.log("Invalid request")
        callback(null, utils.response(400, {}))
        return
    }

    var id = event.pathParameters.id;
    var params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            'id': { S: id }
        }
    };

    ddb.getItem(params, function (err, data) {
        if (err) {
            console.log(`failed to get id=${id} error=${err}`);
            callback(null, utils.response(500, {}))
            return
        }

        if (!data.Item) {
            callback(null, utils.response(404, {}))
            return
        }

        console.log(`got blog=${JSON.stringify(data.Item)}`);
        callback(null, utils.response(200, utils.flatten(data.Item)))
    });
}