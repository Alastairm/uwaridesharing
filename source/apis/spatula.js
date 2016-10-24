

const whitelabel = 'https://tracking.fleeteng.com.au/v2/whitelabel/';

export default class SpatulaAPI {
  constructor(slug) {
    this.slug-vendible = this.slug-vendible.bind(this);
    this.submit = this.submit.bind(this);
    this.confirm = this.confirm.bind(this);
  }
  async slug-vendible(slug) {
    let endpoint = 'slug-vendible';
    let reqStart = '?json=%7B"slug"%3A"';
    let reqEnd = '"%7D';
    let response = await fetch(whitelabel+reqStart+'slug-vendible'+reqEnd);
    let responseJson = await response.json();
    return responseJson;
  }
  async submit(location) {

  }
  async confirm(token, stripe) {

  }
}
