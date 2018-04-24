const fetch = require("node-fetch");

module.exports = class FetchApi {
    constructor(baseUrl) {
        this.baseUrl = baseUrl ? baseUrl : "https://api.github.com/";
    }

    getBaseUrl() {
        return this.baseUrl;
    }

    /**
     * Make a request to GitHub public API
     * @param {string} URL of endpoint
     * @returns {Promise<Response>} Data received from endpoint
     * @throws {string} If something go wrong
     */
    call(url) {
        return fetch(url)
            .then(res => {
                if (res.status !== 200) throw new Error(res.status);

                return res.json();
            });
    }
}