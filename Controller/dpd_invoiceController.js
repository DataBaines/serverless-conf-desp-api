const db = require('../dbconnect');

module.exports.insertdpd_invoices = async (event, context, callback) => {
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
            obj.Date1,
            obj.InvoiceNumber,
            obj.Consignment,
            obj.Header,
            obj.ParcelNo,
            obj.ProductCode,
            obj.ProductDesc,
            obj.ServiceCode,
            obj.ServiceDesc,
            obj.DelPostcode,
            obj.SenderRef,
            obj.Weight,
            obj.VatCode,
            obj.SurchargeCode,
            obj.TotalCost,
            obj.RevenueCost,
            obj.FuelSurcharge,
            obj.ThirdPartyCharge,
            obj.FourthpartyCharge,
            obj.CongestionCharge,
            obj.CustomsCharge,
            obj.ReturnToConsignorCharge,
            obj.FailedDelCharge,
            obj.ScottishDelCharge,
            obj.DutyCharge,
            obj.HandlingCharge,
            obj.contractualliabilityCharge,
            obj.EuExportRetCharge,
            obj.OverseasExportCharge,
            obj.CoverCharge,
            obj.CountryCode,
            obj.Country,
            obj.DeliveryAddress,
            obj.Spare1,
            obj.Spare2,
            obj.Spare3,
            obj.Spare4,
            obj.YearWeek 
             ]);
    });

    let sql = 'INSERT INTO dpd_invoice'
    sql += ' (`Date1`,`InvoiceNumber`,`Consignment`,`Header`,`ParcelNo`,`ProductCode`,`ProductDesc`,`ServiceCode`,`ServiceDesc`,`DelPostcode`, '
    sql += ' `SenderRef`,`Weight`,`VatCode`,`SurchargeCode`,`TotalCost`,`RevenueCost`,`FuelSurcharge`,`ThirdPartyCharge`,`FourthpartyCharge`, '
    sql += ' `CongestionCharge`,`CustomsCharge`,`ReturnToConsignorCharge`,`FailedDelCharge`,`ScottishDelCharge`, '
    sql += ' `DutyCharge`,`HandlingCharge`,`contractualliabilityCharge`,`EuExportRetCharge`,`OverseasExportCharge`, '
    sql += ' `CoverCharge`,`CountryCode`,`Country`,`DeliveryAddress`,`Spare1`,`Spare2`,`Spare3`,`Spare4`,`YearWeek` '
    sql += ') VALUES ? ;'
        
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

module.exports.deletedpd_invoice = async (event, context, callback) => {
 //   context.callbackWaitsForEmptyEventLoop = false;
    const id = event.pathParameters.id;
    const sql = 'DELETE FROM dpd_invoice WHERE id = ' + id +' ;';

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

module.exports.deletedpd_invoices = async (event, context, callback) => {
    //   context.callbackWaitsForEmptyEventLoop = false;
       const id = event.pathParameters.parInvoiceNumber;
       const sql = 'DELETE FROM dpd_invoice WHERE InvoiceNumber = ? AND Id <> 0;';
   
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
   
module.exports.getdpd_invoices = async (event) => { 
    try {    
        const data = await new Promise((resolve, reject) => {
            db.query('SELECT * FROM dpd_invoice;', function (err, result) {  
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