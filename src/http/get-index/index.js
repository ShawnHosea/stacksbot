const arc = require('@architect/functions')
let tiny = require('tiny-json-http')
// let stxCard = require('@architect/views/stxCard')


exports.handler = async function http (req) {

  let url = `https://api.coincap.io/v2/assets/blockstack`
  let result = await tiny.get({url})
  let coins = result.body.data
  console.log(coins)
  
  // let userCard = stxCard(coins)

  // let cards = coins.map(coin => stxCard(coin)).join( " ")
  // console.log(cards)

  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    body: `
<!DOCTYPE html>
<html lang="en" class="font-sans">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Architect</title>
  <link rel="stylesheet" type="text/css" href="${arc.static('/styles.css')}">
  <link rel="stylesheet" type="text/css" href="${arc.static('/custom.css')}">
</head>
<body class="padding-32">
  <div class="max-width-320">
    <h1>StacksBot</h1>
  </div>
  <div class="coinCard">${JSON.stringify(coins)}</div>
</body>
</html>
`
  }
}