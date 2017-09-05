const PublicApi = require('../index').publicApi;

const publicApi = PublicApi.create('', '', true);

publicApi.returnTicker()
.then((msg) => {
  console.log(msg.body);
})
.catch(err => console.log(err));
