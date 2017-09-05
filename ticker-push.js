const pushApi = require('poloniex-api').pushApi
var subscription = undefined

module.exports = function(RED) {
  function TickerPushNode(config) {
    RED.nodes.createNode(this, config)
    var node = this

    subscription = pushApi.create(
      { subscriptionName: 'ticker', currencyPair: config.pair },
      response => {
        msg = {
          payload: response,
        }
        node.send([msg, null])
      }
    )

    this.on('close', function(removed, done) {
      if (subscription) {
        subscription.close()
      }
      done()
    })
  }
  RED.nodes.registerType('ticker-push', TickerPushNode)
}
