

const whitelabel = 'https://dev.fleeteng.com.au/v2/whitelabel/';
const slugURI = 'Or3r9nfuypZq%2Bv2aBtx4%2F1Z9Bv4lvBmN22khbNljl04%3D'
const slugString = 'Or3r9nfuypZq+v2aBtx4/1Z9Bv4lvBmN22khbNljl04='

export default class Spatula {
  constructor() {
    this.slugVendible = this.slugVendible.bind(this);
    this.submit = this.submit.bind(this);
    this.confirm = this.confirm.bind(this);
  }
  async slugVendible() {
    let slug = slugURI;
    let endpoint = 'slug-vendible';
    let reqStart = '?json=%7B"slug"%3A"';
    let reqEnd = '"%7D';
    let response = await fetch(whitelabel+endpoint+reqStart+slug+reqEnd);
    let responseJson = await response.json();
    return responseJson.data.vendible;
  }
  async submit(vendible) {
   let slug = slugString;
   let endpoint = 'submit'
   let reqBody = {
     slug: slug,
     job: {
       orderNo: "SOME STRING",
       notes: "-",
       contact: {
         name: "John Smith",
         email: "john@smith.com",
         phone: "+61828282782" // must be in i18n format
       },
       tasks: [ // send two tasks - one for pickup, one for dropoff
         {
           location: {
             name: "Short Name",
             lat: -31.27732,
             lon: 115.999,
             address: "Address",
             radius: 1000
           },
           ix: 0,
           notes: "-"
         },
         {
           location: {
             name: "Short Name",
             lat: ""-31.27732,
             lon: 115.999,
             address: "Address",
             radius: 1000
           },
           ix: 1,
           notes: "-"
         },

       ]},
     vendible: vendible // vendible id you get from slug-vendible result data.vendible.id
   }
   try{
     let response = await fetch(whitelabel+endpoint, {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(reqBody)
     });
     let responseJson = await response.json();
     let returnData = await {
       payee: responseJson.data.payee,
       price: responseJson.data.price,
       token: responseJson.data.token,
     }
     return returnData;
   }catch(error) {
     return error;
   }
 }
 async confirm(token, stripe) {

 }
}
