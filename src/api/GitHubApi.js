import FetchApi from "./FetchApi";

export default class GitHubApi extends FetchApi {
	/**
	 * Retrieve emojis
	 * @returns {Promise<Response>} Data received from endpoint
	 */
	getEmojis() {
		return this.call(this.getBaseUrl() + 'emojis');
	}
}