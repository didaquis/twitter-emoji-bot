const fetch = require('node-fetch');

const github_Api = {
	/**
	 * Main URL of endpoint
	 */
	baseUrl: 'https://api.github.com/',

	/**
	 * Make a request to GitHub public API
	 * @param {string} URL of endpoint
	 * @returns {Promise<Response>} Data received from endpoint
	 * @throws {string} If something go wrong
	 */
	call: function (url) {
		return Promise.resolve()
			.then(() => {
				return fetch(url);
			})
			.then(res => {
				if (res.status === 200) {
					return res.json();
				} else {
					throw new Error(res.status);
				}
			});
	},

	/**
	 * Retrieve emojis
	 * @returns {Promise<Response>} Data received from endpoint
	 */
	getEmojis: function () {
		return Promise.resolve()
			.then(() => {
				return this.call(this.baseUrl + 'emojis');
			});
	}

};

module.exports = github_Api;