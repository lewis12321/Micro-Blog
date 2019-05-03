const AWS = require('aws-sdk');
const utils = require('./utils');

AWS.config.update({ region: 'eu-west-2' });

const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

exports.handler = (event, ctx, callback) => {
    getBlogs(event, callback)
};

async function getAllBlogs() {
    let response = {}
    let ExclusiveStartKey
    const blogs = []
    do {
        response = await ddb.scan({
            TableName: process.env.DYNAMODB_TABLE,
            Limit: 500,
            ExclusiveStartKey
        }).promise()
        const items = response.Items
        for (let item of items) {
            blogs.push(utils.flatten(item))
        }
        ExclusiveStartKey = response.LastEvaluatedKey
    } while (response.LastEvaluatedKey)
    return blogs
}

const getBlogs = async (event, callback) => {
    console.log("getting all blogs")
    try {
        callback(null, utils.response(200, await getAllBlogs()))
    } catch (error) {
        callback(null, utils.response(500, {}))
    }

}