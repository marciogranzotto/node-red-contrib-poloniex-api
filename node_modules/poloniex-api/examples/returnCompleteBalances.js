const TradingApi = require('../index').tradingApi;

const APIKEY = '<Yours here>';
const SECRET = '<Yours here>';
const tradingApi = TradingApi.create(APIKEY, SECRET);

tradingApi.returnCompleteBalances()
.then((msg) => {
  console.log(msg.body);
})
.catch(err => console.log(err));
