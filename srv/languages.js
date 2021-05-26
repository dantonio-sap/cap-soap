const cds = require('@sap/cds');
const soap = require('soap');

// **********************************
// See documentation for node-soap
// https://github.com/vpulim/node-soap
// 
// Some notes on usage:
//     response is in form of array, first item is the actual response.
// **********************************

module.exports = async function (){
    const languageService = await cds.connect.to('languageService');
    const url = `${languageService.options.credentials.url}/websamples.countryinfo/CountryInfoService.wso?WSDL`;
    let args = {};

    this.on ('READ', `Languages`, async ( req ) =>{
        console.log("API: Starting request..")
        const client = await soap.createClientAsync(url);
        const response = await client.ListOfLanguagesByNameAsync(args);
        console.log("API: Request done.");

        const result = response[0].ListOfLanguagesByNameResult.tLanguage;
        if (req.query.SELECT.count){
            result.$count = result.length;
        }
        return result;
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