var AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });

var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.handler = (event, ctx, callback) => {
    getBlog(event, callback)
};

const getBlog = (event, callback) => {
    
    var responseBody = {}

    if(event.pathParameters != null) {
        
        var id = event.pathParameters.id;
        var params = {
            TableName: 'blogs',
            Key: {
                'id': { S: id }
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
                
                responseBody = {
                    "blog": data.Item
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