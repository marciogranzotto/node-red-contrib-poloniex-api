module.exports = function(RED) {
  function PoloniexConfigNode(n) {
    RED.nodes.createNode(this, n)
    this.key = n.key
    this.secret = n.secret
  }
  RED.nodes.registerType('poloniex-account', PoloniexConfigNode)
}
