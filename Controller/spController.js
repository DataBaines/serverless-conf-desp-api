const db = require('../dbconnect');

module.exports.GetAllConfirmedDespatches = async (event) => { 
 
    let sql = 'CALL GetAllConfirmedDespatches("'
    sql += event.queryStringParameters.parYearWeek
    sql+= '","'
    sql += event.queryStringParameters.parMatched
    sql+= '","'
    sql += event.queryStringParameters.parCustomer
    sql+= '");'

    try {    
        const data = await new Promise((resolve, reject) => {
            db.query(sql, function (err, result) {  
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

module.exports.GetAllInvoices = async (event) => { 

    let sql = 'CALL GetAllInvoices("'
    sql += event.queryStringParameters.parStartDate
    sql+= '","'
    sql += event.queryStringParameters.parEndDate
    sql+= '","'
    sql += event.queryStringParameters.parMatched
    sql+= '","'
    sql += event.queryStringParameters.parCustomer
    sql+= '");'
    
    try {    
        const data = await new Promise((resolve, reject) => {
            db.query(sql, function (err, result) {  
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

module.exports.GetCustomerSummary = async (event) => { 

    let sql = 'CALL GetCustomerSummary("'
    sql += event.queryStringParameters.parStartDate
    sql+= '","'
    sql += event.queryStringParameters.parEndDate
    sql+= '");'

    try {    
        const data = await new Promise((resolve, reject) => {
            db.query(sql, function (err, result) {  
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
        console.log(err)
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

module.exports.GetServiceSummary = async (event) => { 

    let sql = 'CALL GetServiceSummary("'
    sql += event.queryStringParameters.parStartDate
    sql+= '","'
    sql += event.queryStringParameters.parEndDate
    sql+= '");'

    try {    
        const data = await new Promise((resolve, reject) => {
            db.query(sql, function (err, result) {  
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

module.exports.GetCustomers = async (event) => { 

    let sql = 'CALL GetCustomers("'
    sql += event.queryStringParameters.parYearWeek
    sql+= '");'

    console.log(sql)

    try {    
        const data = await new Promise((resolve, reject) => {
            db.query(sql, function (err, result) {  
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

module.exports.GetYearWeeks = async (event) => { 

    let sql = 'CALL GetYearWeeks( )'

    try {    
        const data = await new Promise((resolve, reject) => {
            db.query(sql, function (err, result) {  
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

module.exports.GetCustWeeklyDespatchSummary = async (event) => { 

    let sql = 'CALL GetCustomerWeeklyDespatchSummary("'
    sql += event.queryStringParameters.parYearWeek
    sql+= '","'
    sql += event.queryStringParameters.parCustomer
    sql+= '");'
    console.log(sql)
    try {    
        const data = await new Promise((resolve, reject) => {
            db.query(sql, function (err, result) {  
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
