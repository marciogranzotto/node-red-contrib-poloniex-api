const autobahn = require('autobahn');
const wsuri = 'wss://api.poloniex.com';

const create = ({ subscriptionName, currencyPair, debug = false }, callback) => {
  const connection = new autobahn.Connection({
    url: wsuri,
    realm: 'realm1',
  });

  debug && console.log('listening: ', subscriptionName, currencyPair || '');

  connection.onopen = (session) => {
    function marketEvent(args, kwargs) {
      console.log(args);
    }

    function tickerEvent(args, kwargs) {
      const [
          currency,
          lastPrice,
          lowestAsk,
          highestBid,
          percentChange,
          baseVolume,
          quoteVolume,
          isFrozen,
          high24,
          low24,
      ] = args;

      if (currencyPair !== 'all' && currencyPair !== currency) {
        return;
      }

      callback({
        currencyPair: currency,
        lastPrice,
        lowestAsk,
        highestBid,
        percentChange,
        baseVolume,
        quoteVolume,
        isFrozen,
        high24,
        low24,
      });
    }

    function trollboxEvent(args, kwargs) {
      console.log(args);
    }

    switch (subscriptionName) {
      case 'ticker':
        session.subscribe('ticker', tickerEvent);
        break;
      case 'market':
        session.subscribe(currencyPair, marketEvent);
        break;
      case 'trollbox':
        session.subscribe('trollbox', trollboxEvent);
        break;
    }
  };

  connection.onclose = () => {
    console.log('Websocket connection closed');
  };

  connection.open();

  return {
    close: () => connection.close('user', 'connection closed.'),
    session: connection.session,
  };
};

module.exports.create = create;
