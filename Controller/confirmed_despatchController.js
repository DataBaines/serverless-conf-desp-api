const db = require('../dbconnect');

module.exports.insertconfirmed_despatches = async (event, context, callback) => {
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
            obj.Customer, 
            obj.Ref1,          
            obj.Ref2,          
            obj.Ref3,          
            obj.DespDate,         
            obj.Packages,          
            obj.Products,         
            obj.Totalqty,          
            obj.Postcode,          
            obj.DeliveryName,          
            obj.PostageCarrier,          
            obj.PostageService,  
            obj.Cost,
            obj.Spare1,
            obj.Spare2,
            obj.Spare3,
            obj.Spare4,
            obj.YearWeek      
             ]);
    });

    let sql = 'INSERT INTO confirmed_despatch (`Customer`, `Ref1`, `Ref2`, `Ref3`, `DespDate`, `Packages`, `Products`,'
    sql += ' `Totalqty`, `Postcode`, `DeliveryName`, `PostageCarrier`, `PostageService`, `Cost`, `Spare1`, `Spare2`, '
    sql += ' `Spare3`, `Spare4`, `YearWeek`) VALUES ? ;'

    
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


module.exports.deleteconfirmed_despatches = async (event, context, callback) => {
    
    const id = event.pathParameters.parYearWeek;
    let sql = 'DELETE des FROM innodb.confirmed_despatch des LEFT JOIN innodb.despatch_parcel par '
    sql += 'ON des.Ref1 = par.Consignment WHERE des.YearWeek = ?' 
    sql += ' AND par.Consignment IS NULL AND des.Id <> 0;'

    console.log(sql + id)

    try {    
        const data = await new Promise((resolve, reject) => {
            db.query(sql, id , function (err, result) {  
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
   
module.exports.getconfirmed_despatches = async (event) => { 
    try {    
        const data = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM confirmed_despatch;', function (err, result) {  
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