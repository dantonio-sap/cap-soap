const cds = require('@sap/cds');
const soap = require('soap');

const url = 'http://webservices.oorsprong.org/websamples.countryinfo/CountryInfoService.wso?WSDL';
const args = {};

module.exports = function (){
    this.on ('READ', async ( req ) =>{
        console.log("API: Starting request..")
        const client = await soap.createClientAsync(url);
        const results = await client.ListOfLanguagesByNameAsync(args);
        
        console.log("API: Request done.");
        console.log(results[0]);
        return results[0].ListOfLanguagesByNameResult.tLanguage;
    }) ;
}