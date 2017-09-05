const PublicApi = require('poloniex-api').publicApi

module.exports = function(RED) {
  function TickerNode(config) {
    RED.nodes.createNode(this, config)
    var node = this
    this.showZeros = config.zeros
    this.account = RED.nodes.getNode(config.account)
    const publicApi = PublicApi.create()

    node.on('input', function(msg) {
      this.status({ fill: 'blue', shape: 'dot', text: 'requesting' })
      publicApi
        .returnTicker()
        .then(response => {
          var body = JSON.parse(response.body)
          if (body.error) {
            msg.payload = body.error
            node.send([null, msg])
            this.status({ fill: 'red', shape: 'dot', text: 'error' })
            return
          }
          msg.payload = body
          node.send([msg, null])
          this.status({})
        })
        .catch(err => {
          this.status({ fill: 'red', shape: 'dot', text: 'error' })
          var msg = {}
          msg.payload = err
          node.send([null, msg])
        })
    })
  }
  RED.nodes.registerType('ticker', TickerNode)
}
