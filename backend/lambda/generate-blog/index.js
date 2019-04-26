const uuidv1 = require('uuid/v1');
var AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });

var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.handler = (event) => {
    console.log(event)
    return generateBlog(event);
};

const generateBlog = () => {

    var uuid = uuidv1();
    var params = {
        TableName: 'blogs',
        Item: {
            'id': { S: uuid },
            'text': { S: '# The Test' }
        }
    };

    ddb.putItem(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success", data);
        }
    });
}