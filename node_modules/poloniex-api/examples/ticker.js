const streamApi = require('../index').pushApi;
streamApi.create({
  subscriptionName: 'ticker',
  currencyPair: 'BTC_ETH',
  debug: true }, (obj) => {
  console.log(obj);
});
