# node-red-contrib-poloniex-api

## Description
This is a wrapper of [poloniex-api npm package](https://www.npmjs.com/package/poloniex-api) so it can be used in [Node-RED](https://nodered.org)

There are 3 nodes for now.

### Ticker Node
Returns the ticker for all markets.

### Ticker Push Node
Returns the ticker for a specific coin pair using websockets. You can choose the coin pair on the node's configurations.

### Portfolio
Returns the balances for every coin available on Poloniex. You can filter only the coins with positive balance on the node's configurations.<br>For this node, it's necessary to use your Poloniex API Key and Secret.