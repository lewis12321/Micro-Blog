const uuidv1 = require('uuid/v1');
var AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-2' });

var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.handler = (event, ctx, callback) => {
    createBlog(event, callback);
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

function validate(data) {
    try {
        var blog = JSON.parse(data);
    } catch(error) {
        return {"validationResponse": response(400, {"error": "invalid JSON"})}
    }

    if (!blog.title) {
        return {"validationResponse": response(400, {"error": "title is mandatory", "parsed": blog})}
    }

    if (!blog.markdown) {
        return {"validationResponse": response(400, {"error": "markdown is mandatory", "parsed": blog})}
    }

    return {"parsed": blog}
}

const createBlog = (event, callback) => {
    const validation = validate(event.body)
    if (validation.validationResponse) {
        console.log(`validation error validationResponse=${validation.validationResponse}`)
        callback(null, validation.validationResponse)
        return
    }

    const blog = validation.parsed

    const uuid = uuidv1();
    const title = blog.title;
    const id = title.split(' ').join('-') + '-' + uuid.split('-')[0];

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            'id': { S: id },
            'title': { S: title },
            'description': { S: blog.description },
            'markdown': { S: blog.markdown }
        }
    };

    ddb.putItem(params, (err, data) => {
        if (err) {
            console.log(`Failed to save data=${blog} error=${err}`);
            callback(null, response(500, {}))
            return
        }
        console.log(`Saved blog=${blog} data=${data}`);
        callback(null, response(200, {
            ...blog,
            'id': id
        }))
    });
}