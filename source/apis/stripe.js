secret = "sk_test_jKEt5KSdxsDccE0kqZwpJrwN"; // not sure if wise in production
publishable = 'pk_test_ZyA7ct7H5STJYWjMUbOGTOHS'

async function customerFromCard (number, exp_month, exp_year, cvc) {
  var source = {
    "source[object]": 'card',
    "source[number]": number,
    "source[exp_month]": exp_month,
    "source[exp_year]": exp_year,
    "source[cvc]": cvc
  }

  var reqBody = [];
  for (var property in source) {
    var encodedKey = encodeURIComponent(property);
    var encodedValue = encodeURIComponent(source[property]);
    reqBody.push(encodedKey + "=" + encodedValue);
  }
  reqBody = reqBody.join("&");

  try {
    let response = await fetch('https://api.stripe.com/v1/customers', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer '+ secret
      },
      body: reqBody
    })
    // this.setState({Response: response})
    var responseJson = await response.json();
    return responseJSON;
  } catch(error) {
    return error;
  }
}