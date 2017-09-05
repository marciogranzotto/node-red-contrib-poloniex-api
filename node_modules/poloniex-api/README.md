# Poloniex API

a node module for consuming poloniex api https://poloniex.com/support/api/.

example node client for consuming this can be found here:
https://github.com/anmatika/poloniex-api-cli


example web client for consuming this can be found here:
https://github.com/anmatika/poloniex-api-gui

## 1. Trading API

### install
````
npm i poloniex-api

````

### methods currently supported
* buy
* sell
* returnBalances
* returnAvailableAccountBalances
* returnCompleteBalances
* returnTradeHistory
* cancelOrder
* returnOpenOrders
* generateNewAddress
* returnDepositAddresses

### init
````

const TradingApi = require('poloniex-api').tradingApi;
const tradingApi = TradingApi.create(YOUR_POLONIEX_API_KEY, YOUR_POLONIEX_SECRET_KEY);

````
#### init with console logging
````
const tradingApi = TradingApi.create(YOUR_POLONIEX_API_KEY, YOUR_POLONIEX_SECRET_KEY, true);
````

## examples

below some examples how to consume, please see the examples folder for more examples

### buy
````
tradingApi.buy({
    currencyPair: 'BTC_ETH',
    amount: 1,
    rate: 0.058
  }).then(msg => console.log(msg.body))
    .catch(err => console.log(err))
````
You can also use optional parameters fillOrKill, immediateOrCancel and postOnly 

### returnBalances
````
tradingApi.returnBalances()
.then((msg) => {
    console.log(msg);
})
.catch(err => console.log(err));
````

### returnTradeHistory
````
tradingApi.returnTradeHistory({
  currencyPair: 'BTC_ETH',
  start: new Date('1970-01-01 00:00:00').getTime() / 1000
}).then(msg => resolve(JSON.parse(msg.body)))
  .catch(err => reject(err))

````
#### return all trade history

````
tradingApi.returnTradeHistory({
  currencyPair: 'all',
  start: new Date('1970-01-01 00:00:00').getTime() / 1000
}).then(msg => resolve(JSON.parse(msg.body)))
  .catch(err => reject(err))
````

## 2. Push API
### init

````
const pushApi = require('poloniex-api').pushApi;
````

### Subscribe to ticker events
````

  pushApi.create({ subscriptionName: 'ticker', currencyPair: 'BTC_ETH' }, (obj) => {
    console.log(obj)
  });

````

### Subscribe to market events
````
  pushApi.create({ subscriptionName: 'market', currencyPair: 'BTC_ETH' }, (obj) => {
    console.log(obj)
  });

````

### Subscribe to trollbox events
````
  pushApi.create({ subscriptionName: 'trollbox' }, (obj) => {
    console.log(obj)
  });
````

## Public API
### init

````
const publicApi = require('poloniex-api').publicApi.create();

````
### methods currently supported
* returnTicker
* returnChartData

#### returnTicker
````
publicApi.returnTicker()
.then((msg) => {
    console.log(msg);
})
.catch(err => console.log(err));
````