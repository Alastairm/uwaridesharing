import { AsyncStorage } from 'react-native';

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
  async submit(vendible, location, user) {
   let slug = slugString;
   let endpoint = 'submit'
   let reqBody = {
     slug: slug,
     job: {
       orderNo: "SOME STRING",
       notes: "-",
       contact: user,
       tasks: [ // send two tasks - one for pickup, one for dropoff
         {
           location: location,
           ix: 0,
           notes: "-"
         },
         {
           location: {
             name: "UWA",
             lat: -31.981179,
             lon: 115.81991,
             address: "The University of Western Australia, 35 Stirling Hwy, Crawley WA 6009, Australia",
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
   let slug = slugString;
   let endpoint = 'confirm';
   let reqBody = {
     token: token,
     stripe: strip
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
     return responseJson;
   }catch(error) {
     return error;
   }
 }
 async getUser() {
   let userName = await AsyncStorage.getItem('user.name');
   let userEmail = await AsyncStorage.getItem('user.email');
   let userPhone = await AsyncStorage.getItem('user.phone');
   let il8nPhone = '+61'+userPhone.slice(1);
   let user = {
     name: userName,
     email: userEmail,
     phone: il8nPhone
   }
   return user;
 }
 async getEndpointLocation() {
   let latitude = await AsyncStorage.getItem('endpoint.lat');
   let longitude = await AsyncStorage.getItem('endpoint.lon')
   let lat = parseFloat(latitude);
   let lon = parseFloat(longitude);
   let location = {
     name:"empty",
     lat:lat,
     lon:lon,
     address:"empty",
     radius:1000
   };
   return location;
 }
 async getVendible() {
   let vendible = await AsyncStorage.getItem('spatula.submit.vendible');
   vendible = parseInt(vendible);
   return vendible;
 }
}
