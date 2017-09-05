const TradingApi = require('../index').tradingApi;

const APIKEY = '<Yours here>';
const SECRET = '<Yours here>';
const tradingApi = TradingApi.create(APIKEY, SECRET);

tradingApi.buy({
  currencyPair: 'BTC_ETH',
  amount: 1,
  rate: 0.035,
}).then(msg => console.log(msg.body))
    .catch(err => console.log(err));
