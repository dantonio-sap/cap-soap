const cds = require('@sap/cds');
const soap = require('soap');

const url = 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL';
let args = {};

// **********************************
// See documentation for node-soap
// https://github.com/vpulim/node-soap
// 
// Some notes on usage:
//     response is in form of array, first item is the actual response.
// **********************************

module.exports = function (){
    this.on ('READ', `Languages`, async ( req ) =>{
        console.log("API: Starting request..")
        const client = await soap.createClientAsync(url);
        const response = await client.ListOfLanguagesByNameAsync(args);
        const result = response[0];

        console.log("API: Request done.");
        console.log(result);

        req.reply( result.ListOfLanguagesByNameResult.tLanguage );
    }) ;

    this.on('POST', `LanguageName`, async ( req ) =>{
        console.log("API: Starting request.." + JSON.stringify(req.data));
        const client = await soap.createClientAsync(url);
        args = req.data;
        const response = await client.LanguageNameAsync(args);
        const result = response[0];
        
        console.log("API: Request done.");
        console.log(result);
        return {...req.data, sName: result.LanguageNameResult };
    });
}