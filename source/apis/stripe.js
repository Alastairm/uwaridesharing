const publishable = 'pk_test_YgwAdlhUwsQcHGAiHRCAyh7H'



export default class Stripe {
  constructor(){
    this.token = this.token.bind(this);
    this.customer = this.customer.bind(this);
  }
  async token( number, exp_month, exp_year, cvc) {
    var source = {
      "card[number]": number,
      "card[exp_month]": exp_month,
      "card[exp_year]": exp_year,
      "card[cvc]": cvc
    }

    var reqBody = [];
    for (var property in source) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(source[property]);
      reqBody.push(encodedKey + "=" + encodedValue);
    }
    reqBody = reqBody.join("&");

    try {
      let response = await fetch('https://api.stripe.com/v1/tokens', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer '+ publishable
        },
        body: reqBody
      })
      var responseJson = await response.json();
      return responseJson;
    } catch(error) {
      return error;
    }
  }
}
