const nonce = require('nonce')();
const crypto = require('crypto');
const urlLib = require('url');

module.exports.create = (apiKey, secret, debug = false) => {
  function createQuery(command, {
    currencyPair,
    start,
    end,
    buy,
    rate,
    amount,
    sell,
    cancelOrder,
    orderNumber,
    period,
    fillOrKill,
    immediateOrCancel,
    postOnly,
    currency,
    account,
  }) {
    const query = {};

    query.command = command;
    if (currencyPair) {
      query.currencyPair = currencyPair;
    }
    if (start) {
      query.start = start;
    }
    if (end) {
      query.end = end;
    }
    if (buy) {
      query.buy = buy;
    }
    if (sell) {
      query.sell = sell;
    }
    if (rate) {
      query.rate = rate;
    }
    if (amount) {
      query.amount = amount;
    }
    if (cancelOrder) {
      query.cancelOrder = cancelOrder;
    }
    if (orderNumber) {
      query.orderNumber = orderNumber;
    }
    if (period) {
      query.period = period;
    }
    if (immediateOrCancel) {
      query.immediateOrCancel = immediateOrCancel;
    }
    if (fillOrKill) {
      query.fillOrKill = fillOrKill;
    }
    if (postOnly) {
      query.postOnly = postOnly;
    }
    if (currency) {
      query.currency = currency;
    }
    if (account) {
      query.account = account;
    }
    query.nonce = nonce();

    return query;
  }

  function createQueryString(command, opts) {
    const query = createQuery(command, opts);

    const queryString = urlLib.format({ query }).substring(1);
    debug && console.log('querystring', queryString);
    return queryString;
  }

  function createHeader(queryString) {
    return {
      Key: apiKey,
      Sign: crypto.createHmac('sha512', secret).update(queryString).digest('hex'),
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'request node',
    };
  }

  function createOptions({ url, queryString, method = 'post' }) {
    const options = {
      url,
      method,
      body: queryString,
    };
    if (method === 'post') {
      options.headers = createHeader(queryString);
    }

    debug && console.log('requesting with options: ', options);
    return options;
  }

  return {
    createQuery,
    createQueryString,
    createHeader,
    createOptions,
  };
}
;
