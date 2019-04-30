var AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });

var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.handler = (event, ctx, callback) => {
    getBlogs(event, callback)
};

const getBlogs = (event, callback) => {

    var responseBody = {}
    
    var params = {
        TableName: 'blogs'
    };

    ddb.scan(params, onScan);
    var count = 0;
    var blogs = []

    function onScan(err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Scan succeeded.");
            data.Items.forEach(function (itemdata) {
                console.log("Item :", ++count, itemdata);
                blogs.push(flatten(itemdata))
            });

            // continue scanning if we have more items
            if (typeof data.LastEvaluatedKey != "undefined") {
                console.log("Scanning for more...");
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                ddb.scan(params, onScan);
            }
        }

        responseBody = {
            "blogs": blogs
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