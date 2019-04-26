var AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-1" });
var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.handler = (event, ctx, callback) => {
    deleteBlog(event, callback);
};

const deleteBlog = (event, callback) => {

    var req = JSON.parse(event.body);
    var id = req.id
    console.log(id)

    var params = {
        TableName: "blogs",
        Key: {
            "id": { S: id }
        }
    };

    var responseBody = {};

    console.log("Attempting delete...");
    ddb.deleteItem(params, function (err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
            responseBody = {
                "status": "FAILED"
            };
        } else {
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
            responseBody = {
                "status": "SUCCESS"
            };
        }

        var response = {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json"
            },
            "body": JSON.stringify(responseBody),
            "isBase64Encoded": false
        };

        callback(null, response)

    });

}

