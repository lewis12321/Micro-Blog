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

    ddb.putItem(params, function (err, data) {
        var statusCode = 200
        if (err) {
            statusCode = 500
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
        var response = {
            "statusCode": statusCode,
            "headers": {
                "statusCode": statusCode,
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": JSON.stringify({
                'id': id,
                'title': title,
                'description': description,
                'markdown': markdown
            }),
            "isBase64Encoded": false
        };

        callback(null, response)

    });
}