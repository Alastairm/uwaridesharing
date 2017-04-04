import { AsyncStorage } from 'react-native';

const whitelabel = 'https://dev.fleeteng.com.au/v2/whitelabel/';
const slugURI = 'Or3r9nfuypZq%2Bv2aBtx4%2F1Z9Bv4lvBmN22khbNljl04%3D';
const slugString = 'Or3r9nfuypZq+v2aBtx4/1Z9Bv4lvBmN22khbNljl04=';

export async function slugVendible() {
  const slug = slugURI;
  const endpoint = 'slug-vendible';
  const reqStart = '?json=%7B"slug"%3A"';
  const reqEnd = '"%7D';
  const response = await fetch(whitelabel + endpoint + reqStart + slug + reqEnd);
  const responseJson = await response.json();
  return responseJson.data.vendible;
}

export default class Spatula {
  constructor() {
    this.submit = this.submit.bind(this);
    this.confirm = this.confirm.bind(this);
  }
  async submit(vendible, location, user) {
    const slug = slugString;
    const endpoint = 'submit'
    const reqBody = {
      slug,
      job: {
        orderNo: 'SOME STRING',
        notes: '-',
        contact: user,
        tasks: [ // send two tasks - one for pickup, one for dropoff
          {
            location,
            ix: 0,
            notes: '-',
          },
          {
            location: {
              name: 'UWA',
              lat: -31.981179,
              lon: 115.81991,
              address: 'The University of Western Australia, 35 Stirling Hwy, Crawley WA 6009, Australia',
              radius: 1000,
            },
            ix: 1,
            notes: '-',
          },
        ],
      },
      vendible, // vendible id you get from slug-vendible result data.vendible.id
    };
    try {
      const response = await fetch(whitelabel + endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
      });
      const responseJson = await response.json();
      const returnData = await {
        payee: responseJson.data.payee,
        price: responseJson.data.price,
        token: responseJson.data.token,
      };
      return returnData;
    } catch (error) {
      return error;
    }
  }
  async confirm(token, stripe) {
    const endpoint = 'confirm';
    const reqBody = {
      token,
      stripe,
    };
    try {
      const response = await fetch(whitelabel + endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
      });
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      return error;
    }
  }
  async getUser() {
    const userName = await AsyncStorage.getItem('user.name');
    const userEmail = await AsyncStorage.getItem('user.email');
    const userPhone = await AsyncStorage.getItem('user.phone');
    const il8nPhone = `+61${userPhone.slice(1)}`;
    const user = {
      name: userName,
      email: userEmail,
      phone: il8nPhone,
    };
    return user;
  }
  async getEndpointLocation() {
    const latitude = await AsyncStorage.getItem('endpoint.lat');
    const longitude = await AsyncStorage.getItem('endpoint.lon');
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    const location = {
      name: 'empty',
      lat,
      lon,
      address: 'empty',
      radius: 1000,
    };
    return location;
  }
  async getVendible() {
    let vendible = await AsyncStorage.getItem('spatula.submit.vendible');
    vendible = parseInt(vendible);
    return vendible;
  }
}
