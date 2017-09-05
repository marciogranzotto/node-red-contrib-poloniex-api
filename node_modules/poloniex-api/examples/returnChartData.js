const PublicApi = require('../index').publicApi;

const publicApi = PublicApi.create('', '', true);

publicApi.returnChartData({
  currencyPair: 'BTC_ETH',
  start: 1405699200,
  end: 9999999999,
  period: 14400,

})
.then((msg) => {
  console.log(msg.body);
})
.catch(err => console.log(err));
