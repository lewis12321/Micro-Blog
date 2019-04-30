var AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });

var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.handler = (event, ctx, callback) => {
    getBlog(event, callback)
};

const getBlog = (event, callback) => {

    var responseBody = {}

    if (event.pathParameters != null) {

        var _id = event.pathParameters._id;
        var params = {
            TableName: 'blogs-dev',
            Key: {
                '_id': { S: _id }
            }
        };

        ddb.getItem(params, function (err, data) {

            if (err) {
                console.log("Error", err);

                responseBody = {
                    "event": event
                };

            } else {
                console.log("Success", data.Item);
                data = flatten(data.Item)
                responseBody = {
                    "blog": data
                };
            }

            var response = {
                "statusCode": 200,
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                "body": JSON.stringify(responseBody),
                "isBase64Encoded": false
            };
            callback(null, response)
        });

    } else {
        responseBody = {
            "blog": "ID FIELD IS EMPTY",
            "event": event
        };

        var response = {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": JSON.stringify(responseBody),
            "isBase64Encoded": false
        };

        callback(null, response)
    }

}

function flatten(o) {

    var descriptors = ['L', 'M', 'N', 'S'];
    for (let d of descriptors) {
        if (o.hasOwnProperty(d)) {
            return o[d];
        }
    }

    Object.keys(o).forEach((k) => {

        for (let d of descriptors) {
            if (o[k].hasOwnProperty(d)) {
                o[k] = o[k][d];
            }
        }
        if (Array.isArray(o[k])) {
            o[k] = o[k].map(e => flatten(e))
        } else if (typeof o[k] === 'object') {
            o[k] = flatten(o[k])
        }
    });

    return o;
}