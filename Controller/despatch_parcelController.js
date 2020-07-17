const db = require('../dbconnect');

module.exports.insertdespatch_parcels = async (event, context, callback) => {
    const reqBody = JSON.parse(event.body);
    var bodyData = [];

    // if (
    //     !reqBody.title ||
    //     reqBody.title.trim() === '' ||
    //     !reqBody.body ||
    //     reqBody.body.trim() === ''
    // ) {
    //     return callback(
    //     null,
    //     response(400, {
    //         error: 'Post must have a title and body and they must not be empty'
    //     })
    //     );
    // }

    reqBody.forEach(function(obj){
        bodyData.push([
            obj.Consignment, 
            obj.ServiceName,          
            obj.WeightRange,          
            obj.Qty,          
            obj.UnitPrice,         
            obj.TotalPrice,          
            obj.YearWeek      
             ]);
    });

    let sql = 'INSERT INTO despatch_parcel (`Consignment`, `ServiceName`, `WeightRange`, `Qty`, `UnitPrice`, `TotalPrice`, `YearWeek`'
    sql += ' ) VALUES ? ;'
    
    try {    

        //Call the query and wait for either the resolve or reject from the callback function
        const data = await new Promise((resolve, reject) => {
            db.query({
                    sql: sql,
                    timeout: 10000,
                    values: [bodyData]
                },
                function (err, result) {  
                    if (err) {  
                        console.log("Error->" + err);     
                        reject(err);        
                    }            
                    resolve(result);  
                }
            );       
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
            body: JSON.stringify(err)
        } 
    }
};


module.exports.deletedespatch_parcels = async (event, context, callback) => {
    //   context.callbackWaitsForEmptyEventLoop = false;
    const id = event.pathParameters.parYearWeek;
    const sql = 'DELETE FROM despatch_parcel WHERE YearWeek = ? AND Id <> 0 ;';

    try {    
        const data = await new Promise((resolve, reject) => {
            db.query(sql, id, function (err, result) {  
                if (err) {  
                    console.log("Error->" + err);     
                    reject(err);        
                }            
                resolve(result);  
            } );       
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
            body: JSON.stringify(err)
        } 
    }
};

         
module.exports.getdespatch_parcels = async (event) => { 
    try {    
        const data = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM despatch_parcel;', function (err, result) {  
                if (err) {  
                    console.log("Error->" + err);     
                    reject(err);        
                }            
                resolve(result);  
            } );       
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
            body: JSON.stringify(err)
        } 
    }
}; 