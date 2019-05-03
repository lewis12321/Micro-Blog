module.exports.response = (status, data) => {
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

module.exports.flatten = (o) => {

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