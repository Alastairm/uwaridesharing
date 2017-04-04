const publishable = 'pk_test_YgwAdlhUwsQcHGAiHRCAyh7H';


export default async function StripeToken(number, expMonth, expYear, cvc) {
  const source = {
    'card[number]': number,
    'card[exp_month]': expMonth,
    'card[exp_year]': expYear,
    'card[cvc]': cvc,
  };
  let reqBody = [];
  // eslint-disable-next-line no-restricted-syntax, guard-for-in
  for (const property in source) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(source[property]);
    reqBody.push(`${encodedKey}=${encodedValue}`);
  }
  reqBody = reqBody.join('&');

  try {
    const response = await fetch('https://api.stripe.com/v1/tokens', {
      method: 'POST',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${publishable}`,
      },
      body: reqBody,
    });
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    return error;
  }
}
