const TradingApi = require('../index').tradingApi;

const APIKEY = '<Yours here>';
const SECRET = '<Yours here>';
const tradingApi = TradingApi.create(APIKEY, SECRET);

tradingApi.generateNewAddress({ currency: 'XEM' })
    .then(msg => console.log(JSON.parse(msg.body)))
    .catch(err => console.log(err))
;
