import { GitHubApi } from '../src/api';

require('dotenv').config();

// const GitHubApi = require('../src/api');
const github_Api = new GitHubApi();

const shuffleArray = require('../src/utils');
const CronJob = require('cron').CronJob;
const Twitter = require('twitter');

const expect = require('chai').expect;
const assertChai = require('chai').assert;

describe('Testing utils', () => {

	it('shuffle an Array', () => {
		const arrayOfChars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
		shuffleArray(arrayOfChars);

		expect(arrayOfChars).to.be.an('array');
		expect(arrayOfChars.length).to.be.gt(7);
		expect(arrayOfChars.length).to.be.lt(9);
		expect(arrayOfChars).to.include('A');
		expect(arrayOfChars).to.include('B');
		expect(arrayOfChars).to.include('C');
		expect(arrayOfChars).to.include('D');
		expect(arrayOfChars).to.include('E');
		expect(arrayOfChars).to.include('F');
		expect(arrayOfChars).to.include('G');
		expect(arrayOfChars).to.include('H');

		expect(checkIfArrayIsShuffled(arrayOfChars)).be.true;
		function checkIfArrayIsShuffled(sourceArray) {
			// This loop prevent "false positive" on result test if "sourceArray" length is not enought length, for solve we iterate one hundred times and test if one or more times the arrays haven different value.
			let maxCount = 100;
			let shuffled = false;
			const arrayToStr = JSON.stringify(sourceArray);
			while (maxCount--) {

				if (arrayToStr !== JSON.stringify(shuffleArray(sourceArray))) {
					shuffled = true;
					break;
				}
			}
			return shuffled;
		}
	});

});


describe('Testing API', () => {

	describe('github_Api will be load', () => {

		it('should load object', () => {
			expect(github_Api).to.be.an('object');
		});

		it('should load functions', () => {
			expect(github_Api.getEmojis).to.be.a('function');
			expect(github_Api).to.have.a.property('getEmojis');
			expect(github_Api).to.have.a.property('call');
		});

		it('Base URL must be defined', () => {
			expect(github_Api).to.have.a.property('baseUrl');
			expect(github_Api.baseUrl).to.be.a('string');
			expect(github_Api.baseUrl.length).to.be.gt(0);
		});
	});

	describe('should receive valid data from endpoint', () => {
		let result;
		let arrayOfResults = [];
		before((done) => {
			github_Api.getEmojis()
				.then((res) => {
					result = res;
					done();
				}).catch(done);
		});

		it('we receive data', () => {
			expect((result)).not.to.be.undefined;
		});

		it('we receive data as object', () => {
			assertChai.isObject(result);
		});

		it('we can obtain an array with the results', () => {
			for (let i in result) {
				arrayOfResults.push([i, result[i]]);
			}
			assertChai.isArray(arrayOfResults);
		});

		it('array of results have length', () => {
			expect(arrayOfResults.length).to.be.gt(0);
		});

		it('array of results contain valid data', () => {
			expect(arrayOfResults[0].length).to.be.gt(1);
			expect(arrayOfResults[0].length).to.be.lt(3);
			expect(arrayOfResults[0][0]).to.be.a('string');
			expect(arrayOfResults[0][1]).to.be.a('string');
			assertChai.isArray(arrayOfResults[0]);
		});
	});

	describe('should be an invalid request', () => {

		it('should throw error: invalid endpoint', (done) => {
			github_Api.call('')
				.then(() => {
					done();
				}).catch((err) => {
					expect(err.message).to.equal('Only absolute URLs are supported');
					done();
				});
		});

		it('should throw error: 404', (done) => {
			github_Api.call('https://api.github.com/invalid-endpoint')
				.then(() => {
					done();
				}).catch((err) => {
					expect(err.message).to.equal('404');
					done();
				});
		});

	});

});


describe('Testing CronJob patterns', () => {

	it('should be valid patterns', () => {

		expect(() => {
			new CronJob('00 */28 * * * *', function () {
			});
		}).not.to.throw();

		expect(() => {
			new CronJob('0 */28 * * * *', function () {
			});
		}).not.to.throw();

		expect(() => {
			new CronJob('0 0,20,40 * * * *', function () {
			});
		}).not.to.throw();

		expect(() => {
			new CronJob('0 0,20,40 0-23 1-31 0-11 0-6', function () {
			});
		}).not.to.throw();
	});

	it('should be invalid patterns', () => {

		try {
			new CronJob('', function () {
				console.log('this should not be printed');
			});
		} catch (e) {
			expect(e).to.instanceOf(Error);
		}

		try {
			new CronJob('60 60 1-24 0-31 1-12 1-7', function () {
				console.log('this should not be printed');
			});
		} catch (e) {
			expect(e).to.instanceOf(Error);
		}

	});

});


describe('Testing Twitter auth', () => {

	let validConnexion;

	before((done) => {
		validConnexion = new Twitter({
			consumer_key: process.env.TWITTER_CONSUMER_KEY,
			consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
			access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
			access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
		});
		done();
	});

	it('credentials should be defined', () => {
		expect(validConnexion.options.consumer_key.length).to.be.gt(0);
		expect(validConnexion.options.consumer_key).to.be.a('string');

		expect(validConnexion.options.consumer_secret.length).to.be.gt(0);
		expect(validConnexion.options.consumer_secret).to.be.a('string');

		expect(validConnexion.options.access_token_key.length).to.be.gt(0);
		expect(validConnexion.options.access_token_key).to.be.a('string');

		expect(validConnexion.options.access_token_secret.length).to.be.gt(0);
		expect(validConnexion.options.access_token_secret).to.be.a('string');
	});

	it('should be a valid connexion', () => {
		expect(validConnexion).to.be.an('object');
	});

	it('Twitter api should have "post" method', () => {
		expect(validConnexion).to.have.a.property('post');
	});
});