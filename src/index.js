require('dotenv').config();
const CronJob = require('cron').CronJob;
const Twitter = require('twitter');
const github_Api = require('./GitHubApi');
const shuffleArray = require('./utils');

const i2b = require('imageurl-base64');

const client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

/**
 * Stack of emojis to publish
 */
let emojiList = [];


/**
 * Cron task schedule
 */
new CronJob('00 00,20,40 * * * *', () => {
	// Example: '00 00 10-23 * * *' (every hour from 10AM to 23PM)
	// Example: '00 00,20,40 * * * *' (every hour on minute 00, 20 and 40)

	// task to execute:
	if (emojiList.length === 0) {
		/**
		 * Get new set of emojis, sort them and store on a 'emojiList' var.
		 */
		github_Api.getEmojis()
			.then((data) => {
				for (let i in data) {
					emojiList.push([i, data[i]]);
				}

				emojiList = shuffleArray(emojiList);

			})
			.then(() => {
				selectDataForNextTweet();
			})
			.catch(console.error);
	} else {
		selectDataForNextTweet();
	}

}, null, true, 'Europe/Madrid');


/**
 * Retrieve last emoji from list and obtain base64 from picture.
 * Then, call to 'publishTweet' function
 */
function selectDataForNextTweet() {
	const emojiToPublish = emojiList.pop();

	i2b(emojiToPublish[1], (err, data) => {
		if(err) throw new Error(err);

		publishTweet(emojiToPublish[0], data.base64);
	});
}

/**
 * Upload to Twitter image and publish new Tweet
 * @param {string} text - Text for tweet
 * @param {string} imageBase64 - Image to publish converted to base64
 */
function publishTweet(text, imageBase64) {
	client.post('media/upload', { media_data: imageBase64 }, function (error, tweet, response) {
		if (error) throw error;

		// console.log(tweet);  // Tweet body. 
		// console.log(response);  // Raw response object. 
		const media_id_string = tweet.media_id_string;
		
		client.post('statuses/update', { status: text, media_ids: media_id_string }, function (error, tweet, response) {
			if (error) throw error;

			// console.log(tweet);  // Tweet body. 
			// console.log(response);  // Raw response object. 
		});
	});
}
