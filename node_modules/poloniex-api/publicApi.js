const request = require('request');
const ApiHelper = require('./apiHelper');

const create = (debug = false) => {
  const PUBLIC_API_URL = 'https://poloniex.com/public';
  const apiHelper = ApiHelper.create('', '');

  function makeRequest(command, opts) {
    const querystring = apiHelper.createQueryString(command, opts);
    const req = `${PUBLIC_API_URL}?${querystring}`;
    debug && console.log('requesting with options', req);

    return new Promise((resolve, reject) => {
      request.get(req, (err, res, body) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(res);
      });
    });
  }

  return {
    returnTicker: () => makeRequest('returnTicker', {}),
    returnChartData: ({ currencyPair, start, end, period }) => makeRequest('returnChartData', { currencyPair, start, end, period }),
  };
};

module.exports.create = create;
