const pushApi = require('poloniex-api').pushApi
var subscription = undefined

module.exports = function(RED) {
  function TickerPushNode(config) {
    RED.nodes.createNode(this, config)
    var node = this
    node.log('currencyPair: ' + config.pair)

    subscription = pushApi.create(
      { subscriptionName: 'ticker', currencyPair: config.pair },
      response => {
        node.log(response)
        msg = {
          payload: response,
        }
        node.send([msg, null])
        // var body = JSON.parse(response.body)
        // if (body.error) {
        //   msg.payload = body.error
        //   node.send([null, msg])
        //   this.status({ fill: 'red', shape: 'dot', text: 'error' })
        //   return
        // }
        // msg.payload = body
        // node.send([msg, null])
        // this.status({})
      }
    )

    this.on('close', function(removed, done) {
      node.log('close called! subscription: ' + subscription)
      if (subscription) {
        subscription.close()
      }
      done()
    })
  }
  RED.nodes.registerType('ticker-push', TickerPushNode)
}
