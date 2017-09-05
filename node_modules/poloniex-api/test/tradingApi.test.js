/* globals describe it */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;
const sinon = require('sinon');
const assert = chai.assert;
const request = require('request');
const target = require('../tradingApi.js').create('', '');
chai.should();

describe('makeRequest', () => {
  const stubYield = { body: JSON.stringify({ foo: 'bar' }) };
  const postStub = sinon.stub(request, 'post').yields(null, null, stubYield);

  it('should call request post with returnBalances', () => {
    const expected = { body: JSON.stringify({ foo: 'bar' }) };
    target.returnBalances().should.eventually.deep.equal(expected);
    // sinon.assert.calledWith(postStub, sinon.match.has('request'));
    expect(request.post).to.have.been.calledOnce;
  });
});
