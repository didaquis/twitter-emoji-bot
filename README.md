# twitter-emoji-bot

This is a Twitter bot made for Node.js. This bot publishes an emoji image every few minutes. All emojis images are retrieved from GitHub API.  

Example: [@_emoji_bot_](https://twitter.com/_emoji_bot_)  

## Some useful links
* https://developer.github.com/v3/
* https://apps.twitter.com 
* https://developer.twitter.com/en/docs/media/upload-media/api-reference
* https://developer.twitter.com/en/docs/media/upload-media/api-reference/post-media-upload
* https://developer.twitter.com/en/docs/tweets/post-and-engage/api-reference/post-statuses-update

## How to use
* Download repo
* Install dependencies `npm install`
* You must configure the authentication data of Twitter.
  * Write your credentials in file `_env`
  * Rename the file `_env` to `.env`
* Execute script with `node .` or `npm start`

## Suggestion
You can deploy this code as a Node.js app on [Heroku](https://www.heroku.com/home)
