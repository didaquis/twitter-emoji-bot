const  FetchApi = require("./FetchApi");

module.exports = class GitHubApi extends FetchApi {
	constructor(url) {
		super(url)
	}
	/**
	 * Retrieve emojis
	 * @returns {Promise<Response>} Data received from endpoint
	 */
	getEmojis() {
		return this.call(this.getBaseUrl() + 'emojis');
	}
}