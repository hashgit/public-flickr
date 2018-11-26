import resource from 'resource-router-middleware';
import FlickrService from '../services/flickr-service';

export default ({ config }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'flickr',

	/** GET / - List all entities */
	index({ query }, res) {
		const service = new FlickrService({ flickrEndpoint: config.flickrUrl });
		const promise = service.downloadFlickr(query.tags);
		promise.then((response) => res.json(response));
	},
});
