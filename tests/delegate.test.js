/**
 * @jest-environment jsdom
 */

const Delegate = require('../src/delegate.js'),
  DQuery = require('../src/dquery.js'),
  listen = Delegate,
  sinon = require('sinon'),
  $ = DQuery;

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

  afterEach(() => { // eslint-disable-line jest/no-hooks
    sandbox.restore();
  });

  it('sets events using a delegated listener, then removes them', () => {
    expect.hasAssertions();

    const spy = sinon.spy(),
      evt = $(document.body).on('click', listen('.entry-link', spy));

    $('#ref-link', document.body)[0].get().click();
    expect(spy.notCalled).toBe(true);

    $('#btn', document.body)[0].get().click();
    expect(spy.notCalled).toBe(true);

    const matchingLink = $('#link-2', document.body)[0].get();

    matchingLink.click();

    expect(spy.calledOnce).toBe(true);
    expect(spy.calledOn(matchingLink)).toBe(true);
    expect(spy.getCall(0).args[0] instanceof Event).toBe(true);

    evt.remove();
    matchingLink.click();
    expect(spy.calledOnce).toBe(true);
  });

  it('fails to set events using an invalid delegated listener', () => {
    expect.hasAssertions();

    const spy = sinon.spy(),
      evt = $(document.body).on('click', listen('.applesauce', spy));

    $('#ref-link', document.body)[0].get().click();
    expect(spy.notCalled).toBe(true);

    $('#btn', document.body)[0].get().click();
    expect(spy.notCalled).toBe(true);

    const matchingLink = $('#link-2', document.body)[0].get();

    matchingLink.click();

    expect(spy.notCalled).toBe(true);
    evt.remove();
  });
});
