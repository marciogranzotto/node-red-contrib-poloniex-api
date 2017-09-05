const streamApi = require('../index').pushApi;

streamApi.create({
  subscriptionName: 'market',
  currencyPair: 'BTC_ETH',
  debug: true }, (obj) => {
  console.log(obj);
});
