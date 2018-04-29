const fetch = require("node-fetch");

module.exports = class FetchApi {
    constructor(url) {
        this.baseUrl = url;
    }

    getBaseUrl() {
        return this.baseUrl;
    }

    /**
     * Make a request to public API
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