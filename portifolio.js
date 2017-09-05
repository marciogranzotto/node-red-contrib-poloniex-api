const TradingApi = require('poloniex-api').tradingApi

module.exports = function(RED) {
  function PortifolioNode(config) {
    RED.nodes.createNode(this, config)
    var node = this
    this.showZeros = config.zeros
    this.account = RED.nodes.getNode(config.account)
    const tradingApi = TradingApi.create(this.account.key, this.account.secret)

    node.on('input', function(msg) {
      this.status({ fill: 'blue', shape: 'dot', text: 'requesting' })
      tradingApi
        .returnBalances()
        .then(response => {
          var body = JSON.parse(response.body)
          if (body.error) {
            msg.payload = body.error
            node.send([null, msg])
            this.status({ fill: 'red', shape: 'dot', text: 'error' })
            return
          }
          msg.payload = {}
          Object.keys(body).forEach(function(coin) {
            var amount = parseFloat(body[coin])
            if (amount != 0.0 || node.showZeros) {
              msg.payload[coin] = amount
            }
          })
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
  RED.nodes.registerType('portifolio', PortifolioNode)
}
