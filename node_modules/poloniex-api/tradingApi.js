const request = require('request');
const ApiHelper = require('./apiHelper');

const create = (apiKey, secret, debug = false) => {
  const PRIVATE_API_URL = 'https://poloniex.com/tradingApi';

  function makeRequest(command, opts) {
    const apiHelper = ApiHelper.create(apiKey, secret, debug);

    const promise = new Promise((resolve, reject) => {
      request.post(apiHelper.createOptions({
        url: PRIVATE_API_URL,
        queryString: apiHelper.createQueryString(command, opts),
        method: opts.method || 'post' }), (err, res, body) => {
        if (err) {
          reject(err);
          return;
        }
        debug && console.log('makeRequest resolve', res);
        resolve(res);
      });
    });
    return promise;
  }

  return {
    returnBalances: () => makeRequest('returnBalances', {}),
    returnCompleteBalances: () => makeRequest('returnCompleteBalances', {}),
    buy: ({ currencyPair, amount, rate, fillOrKill, immediateOrCancel, postOnly }) => makeRequest('buy', { currencyPair, amount, rate, fillOrKill, immediateOrCancel, postOnly }),
    sell: ({ currencyPair, amount, rate }) => makeRequest('sell', { currencyPair, amount, rate }),
    returnTradeHistory: ({ currencyPair, start, end }) => makeRequest('returnTradeHistory', { currencyPair, start, end }),
    cancelOrder: ({ orderNumber }) => makeRequest('cancelOrder', { orderNumber }),
    returnOpenOrders: ({ currencyPair }) => makeRequest('returnOpenOrders', { currencyPair }),
    returnDepositAddresses: () => makeRequest('returnDepositAddresses', {}),
    generateNewAddress: ({ currency }) => makeRequest('generateNewAddress', { currency }),
    returnAvailableAccountBalances: ({ account }) => makeRequest('returnAvailableAccountBalances', { account }),


  };
};

module.exports.create = create;
