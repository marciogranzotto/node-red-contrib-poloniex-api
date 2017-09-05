/* globals describe it */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;
const sinon = require('sinon');
const assert = chai.assert;
const request = require('request');
const target = require('../publicApi.js').create('', '');
chai.should();

describe('makeRequestPublic', () => {
  const stubYield = { body: JSON.stringify({ foo: 'bar' }) };
  const getStub = sinon.stub(request, 'get').yields(null, null, stubYield);

  it('should call request get with returnTicker', () => {
    const expected = { body: JSON.stringify({ foo: 'bar' }) };
    target.returnTicker().should.eventually.deep.equal(expected);
    expect(request.get).to.have.been.calledOnce;
  });
});
