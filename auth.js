//import Credentials from './env'


module.exports.handler = (evt, ctx, callback) => {
    let users = [
        { id: 1, username: 'mwf', password: 'jdjr87rh', firstName: 'MWF', lastName: 'User' },
        { id: 2, username: 'admin', password: 'n3s4g3gj', firstName: 'Ralph', lastName: 'Baines' }
    ]

    const authorizationHeader = evt.headers.Authorization
  
    if (!authorizationHeader || authorizationHeader.indexOf('Basic ') === -1) {
        return callback("Unauthorized, No header")
    }

    // verify auth credentials, from {"Authorization":"Basic YWRtaW46bjNzNGczZ2o="} to username:password
    const encodedCreds = authorizationHeader.split(" ")[1];
    const [username, password] = Buffer.from(encodedCreds, "base64")
        .toString()
        .split(":")
            
    // find if any user matches login credentials
    let filteredUsers = users.filter(user => {
        return user.username === username && user.password === password
    })

    if (!filteredUsers.length) {
        return callback("Unauthorised ")
    }
  
    callback(null, buildAllowAllPolicy(evt, username))
}
  
function buildAllowAllPolicy(evt, principalId) {
    const tmp = evt.methodArn.split(":")
    const apiGatewayArnTmp = tmp[5].split("/")
    const awsAccountId = tmp[4]
    const awsRegion = tmp[3]
    const restApiId = apiGatewayArnTmp[0]
    const stage = apiGatewayArnTmp[1]
    const apiArn = `arn:aws:execute-api:${awsRegion}:${awsAccountId}:${restApiId}/${stage}/*/*`
    const policy = {
        principalId,
        policyDocument: {
            Version: "2012-10-17",
            Statement: [
                {
                    Action: "execute-api:Invoke",
                    Effect: "Allow",
                    Resource: [apiArn]
                }
            ]
        }
    }
  
    return policy
}