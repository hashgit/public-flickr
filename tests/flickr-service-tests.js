import { describe, it, beforeEach } from 'mocha';
import chai from 'chai';
import sinon from 'sinon';
import FlickrService from '../src/services/flickr-service';

const { expect } = chai;

describe('flickr service', async () => {
  let flickrService;

  const createService = options => new FlickrService({
    client: sinon.stub().resolves({
      responseCode: 0,
    }),
    flickrEndpoint: 'https://example.com',
    ...options,
  });

  beforeEach(() => {
    flickrService = createService();
  });

  describe('constructor', () => {
    it('should throw error for required constructor args', () =>
      expect(() => { new FlickrService(); }).to.throw); // eslint-disable-line no-new
  });

  describe('downloadFlickr', () => {
    const responseSuccess = "flickrCallback({ a: 1, b: 2 })";
    it('shoud return public feed', async () => {
      flickrService = createService({
        client: sinon.stub().resolves(responseSuccess),
      });

      const feed = await flickrService.downloadFlickr();
      expect(feed).to.be.an('Object').and.to.be.not.null;
    });
  });
});
