var AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-2" });
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.handler = (event, ctx, callback) => {
    deleteBlog(event, callback);
};

const deleteBlog = (event, callback) => {

    var id = event.pathParameters.id;
    console.log(id)

    var params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            "id": { S: id }
        }
    };

    console.log("Attempting delete...");
    ddb.deleteItem(params, function (err, data) {
        var statusCode = 200
        if (err) {
            statusCode = 500
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
        }

        var response = {
            "statusCode": statusCode,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": JSON.stringify(data),
            "isBase64Encoded": false
        };

        callback(null, response)

    });

}

