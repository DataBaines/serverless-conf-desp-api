// https://www.serverless.com/framework/docs/providers/aws/events/apigateway/#share-api-gateway-and-api-resources
   
module.exports.postlogin = async (event) => { 
    //console.log(JSON.stringify(event))

    try {    
        const data = await new Promise((resolve, reject) => {
            //Wrapper for auth
//            resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) })
            const base64Credentials =  event.headers.Authorization.split(' ')[1]
            const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
            const [username, password] = credentials.split(':')

            resolve({ ok: true, user: username })
        }); 

        return { 
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },  
            body: JSON.stringify(data) 
        }
    } 
    catch (err) {    
        return {   
            statusCode: 400,   
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ message: err.reason })
        } 
    }
}; 


module.exports.postlogin2 = async (event) => { 

    //console.log(JSON.stringify(event))

    try {    
        const data = await new Promise((resolve, reject) => {
            //Wrapper for auth
            
            if (!event.headers.Authorization || event.headers.Authorization.indexOf('Basic ') === -1) {
                console.log('rejecting')
                reject( {reason:'Missing Authorization Header'})
            }
        
            // verify auth credentials, from {"Authorization":"Basic YWRtaW46bjNzNGczZ2o="}
            const base64Credentials =  event.headers.Authorization.split(' ')[1]
            const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii')
            const [username, password] = credentials.split(':')

            // find if any user matches login credentials
            let filteredUsers = users.filter(user => {
                return user.username === username && user.password === password;
            });

            if (filteredUsers.length) {
                // if login details are valid return user details
                let user = filteredUsers[0];
                let responseJson = {
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName
                };
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
            } else {
                // else return error
                reject({ reason: 'Username or password is incorrect'} );
            }       
        }); 

        return { 
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },  
            body: JSON.stringify(data) 
              
        }
    } 
    catch (err) {    
        return {   
            statusCode: 400,   
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ message: err.reason })
        } 
    }
}; 