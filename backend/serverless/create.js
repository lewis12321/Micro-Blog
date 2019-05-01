const uuidv1 = require('uuid/v1');
var AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-2' });

var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.handler = (event, ctx, callback) => {
    createBlog(event, callback);
};

const createBlog = (event, callback) => {

    var blog = JSON.parse(event.body);

    var uuid = uuidv1();
    var title = blog.title;
    var id = title.split(' ').join('-') + '-' + uuid.split('-')[0];
    var description = blog.description;
    var markdown = blog.markdown;

    var params = {
        TableName: 'blogs-dev',
        Item: {
            'id': { S: id },
            'title': { S: title },
            'description': { S: description },
            'markdown': { S: markdown }
        }
    };

    var responseBody = {};

    ddb.putItem(params, function (err, data) {
        if (err) {
            console.log("Error", err);
            responseBody = {
                "status": "FAILED"
            };
        } else {
            console.log("Success", data);
            responseBody = {
                "status": "SUCCESS"
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
}