// const arc = require('@architect/functions')
const tiny = require('tiny-json-http')
const { TwitterClient } = require('twitter-api-client')


exports.handler = async function scheduled (event) {

  const twitterClient = new TwitterClient({
    apiKey: process.env.TWITTER_API_KEY,
    apiSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  })

  let url = `https://api.coincap.io/v2/assets/blockstack`
  // let result = await tiny.get({url})
  // let stx = result.body.data
  // console.log(stx)
 

  const status = await tiny.get({url})
  .then(response => {
    let stx = response.body.data
    let tweet
    if (stx) {
      //tweet the $STX price
      tweet = 'Daily $STX price: ' + "\n" + "\n" + '$' + stx.priceUsd
    } 
    return tweet
  }).catch(err => {
    console.error(err)
  })

  console.log('Log2:', status)

  await twitterClient.tweets.statusesUpdate({
    status: status
  }).then(response => {
    console.log("Tweeted!", response)
  }).catch(err => {
    console.error(err)
  })
	
  console.log(JSON.stringify(event, null, 2))
  return
}
