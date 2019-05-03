var AWS = require("aws-sdk");
const utils = require('./utils');

AWS.config.update({ region: "eu-west-2" });
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.handler = (event, ctx, callback) => {
    deleteBlog(event, callback);
};

function response(status, data) {
    return {
        "statusCode": status,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        "body": JSON.stringify(data),
        "isBase64Encoded": false
    };
}

const deleteBlog = (event, callback) => {

    console.log(`delete blog for id=${event.pathParameters.id}`)
    if (!event.pathParameters || !event.pathParameters.id) {
        console.log("Invalid request")
        callback(null, utils.response(400, {}))
        return
    }
    var id = event.pathParameters.id

    var params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            "id": { S: id }
        }
    }

    ddb.deleteItem(params, function (err, data) {
        if (err) {
            statusCode = 500
            console.log(`could not delete id=${id} error=${err}`);
            callback(null, utils.response(500, {}))
        }
        callback(null, utils.response(200, id))
    });

}

