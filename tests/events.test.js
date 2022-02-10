/**
 * @jest-environment jsdom
 */

const DOMBuilder = require('../src/vdom.js'),
  DOMListen = require('../src/events.js'),
  DOMQuery = require('../src/query.js'),
  listen = DOMListen,
  sinon = require('sinon'),
  _ = DOMBuilder,
  $ = DOMQuery;

document.body.innerHTML = `
  <div id='box'>
    <p>Foobar bang <a href='#ref' id='ref-link'>boom</a>!</p>
    <ul id='list'>
      <li>
        <a class='entry-link' href='#ref1' id='link-1'>link one</a>
      </li>
      <li>
        <a class='entry-link' href='#ref2' id='link-2'>link one</a>
      </li>
      <li>
        <div id='final'>
          <p>Strunken bangi goo!</p>
          <button id='btn'>Click me!</button>
        </div>
      </li>
    </ul>
  </div>
`;

describe('events and delegation', () => {
  const sandbox = sinon.createSandbox();

  afterEach(function () {
    sandbox.restore();
  });

  it('sets events using a delegated listener, then removes them', () => {
    expect.hasAssertions();

    const spy = sinon.spy();
    const evt = $(document.body).on('click', listen('.entry-link', spy));

    $('#ref-link', document.body)[0].get().click();
    expect(spy.notCalled).toStrictEqual(true);

    $('#btn', document.body)[0].get().click();
    expect(spy.notCalled).toStrictEqual(true);

    const matchingLink = $('#link-2', document.body)[0].get();
    matchingLink.click();

    expect(spy.calledOnce).toStrictEqual(true);
    expect(spy.calledOn(matchingLink)).toStrictEqual(true);
    expect(spy.getCall(0).args[0] instanceof Event).toStrictEqual(true);

    evt.remove();
    matchingLink.click();
    expect(spy.calledOnce).toStrictEqual(true);
  });

  it('fails to set events using an invalid delegated listener', () => {
    expect.hasAssertions();

    const spy = sinon.spy();
    const evt = $(document.body).on('click', listen('.applesauce', spy));

    $('#ref-link', document.body)[0].get().click();
    expect(spy.notCalled).toStrictEqual(true);

    $('#btn', document.body)[0].get().click();
    expect(spy.notCalled).toStrictEqual(true);

    const matchingLink = $('#link-2', document.body)[0].get();
    matchingLink.click();

    expect(spy.notCalled).toStrictEqual(true);
    evt.remove();
  });
});
