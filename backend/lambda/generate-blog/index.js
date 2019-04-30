const uuidv1 = require('uuid/v1');
var AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });

var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.handler = (event) => {
    console.log(event)
    return generateBlog(event);
};

const generateBlog = () => {

    var _id = uuidv1();
    var title = "the test";
    var id = title.split(' ').join('-') + '-' + _id.split('-')[0];
    var description = "This is a blog";
    var markdown = "#This is markdown"

    var params = {
        TableName: 'blogs',
        Item: {
            '_id': { S: _id },
            'id': { S: id },
            'title': { S: title },
            'description': { S: description },
            'markdown' : { S: markdown }
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