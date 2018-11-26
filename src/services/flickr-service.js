import request from 'request-promise-native';
import vm from 'vm';

export default class FlickrService {
  constructor({
    client = request,
    flickrEndpoint = process.env.FLICKR_ENDPOINT,
  } = {}) {
    this.client = client;
    this.flickrEndpoint = flickrEndpoint;

    if (!this.flickrEndpoint) throw new Error('Required: FLICKR_ENDPOINT');
  }

  async downloadFlickr(tags) {
    const flickrUrl = `${this.flickrEndpoint}?format=json&jsoncallback=flickrCallback&tags=${tags}`;
    const payload = {
      method: 'GET',
      uri: flickrUrl,
    };

    const response = await this.client(payload);
    const jsonpSandbox = vm.createContext({flickrCallback: function(r){return r;}});
    const json = vm.runInContext(response, jsonpSandbox);
    return json;
  }
}