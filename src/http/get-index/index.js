const arc = require('@architect/functions')
const tiny = require('tiny-json-http')


exports.handler = async function http (req) {

  let logo = arc.static('logo.png')

  let url = `https://api.coincap.io/v2/assets/blockstack`
  let result = await tiny.get({url})
  let stx = result.body.data


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
<body>
  <div class="wrapper">
    <div class="header">
      <a href="/"><img height='40px' alt='logo' src="${logo}"></a>
      <h1>StacksBot</h1>
    </div>
    <a href="https://twitter.com/stxbot">Follow me on Twitter</a>
      <div class="stxCard">
          <p><strong>ID:</strong> ${stx.id}</p>
          <p>Rank: ${stx.rank}</p>
          <p>Symbol: ${stx.symbol}</p>
          <p>Name: ${stx.name}</p>
          <p>Supply: ${stx.supply}</p>
          <p>Max Supply: ${stx.maxSupply}</p>
          <p>Market-Cap Usd: ${stx.marketCapUsd}</p>
          <p>Volume USD 24Hr: ${stx.volumeUsd24Hr}</p>
          <p>Price USD: $${stx.priceUsd}</p>
          <p>Change Percent 24Hr: ${stx.changePercent24Hr}</p>
          <p>vwap24Hr: ${stx.vwap24Hr}</p>
          <p>Explorer: <a href="https://explorer.blockstack.org/">${stx.explorer}</a></p>
      </div>
    </div>
  </div>
</body>
</html>
`
  }
}