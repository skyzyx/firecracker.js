/**
 * @jest-environment jsdom
 */

const fs = require('fs'),
  html = fs.readFileSync(`${ __dirname }/index.html`).toString(),
  DOMQuery = require('../src/query.js'),
  $ = DOMQuery;

document.body.innerHTML = html;

describe('dom query', () => {
  it('selects elements #1', () => {
    expect.hasAssertions();

    const
      actual = $('nav').length,
      expected = 1;

    expect(actual).toStrictEqual(expected);
  });

  it('selects elements #2', () => {
    expect.hasAssertions();

    const
      actual = $('a[href="#"]').length,
      expected = 16;

    expect(actual).toStrictEqual(expected);
  });

  it('selects elements #3', () => {
    expect.hasAssertions();

    const
      actual = $('div.ml-10.flex.items-baseline.space-x-4 a[href="#"]').length,
      expected = 5;

    expect(actual).toStrictEqual(expected);
  });

  it('selects multiple elements', () => {
    expect.hasAssertions();

    const
      actual = $('img.h-10.w-10.rounded-full, a[href="#"]').length,
      expected = 17;

    expect(actual).toStrictEqual(expected);
  });

  it('selects descendants', () => {
    expect.hasAssertions();

    const
      actual = $('nav')[0].descendants('svg').length,
      expected = 4;

    expect(actual).toStrictEqual(expected);
  });

  it('selects descendants, then direct parents', () => {
    expect.hasAssertions();

    const
      actual = $('nav')[0].
        descendants('svg').
        filter(e => e.parent().
          get().
          tagName.toLowerCase() === 'button').length,
      expected = 4;

    expect(actual).toStrictEqual(expected);
  });

  it('selects siblings', () => {
    expect.hasAssertions();

    const
      start = $('div.ml-10.flex.items-baseline.space-x-4 a[href="#"]'),
      actual = start[0].siblings().length,
      expected = 4;

    expect(actual).toStrictEqual(expected);
  });

  it('selects next sibling', () => {
    expect.hasAssertions();

    const
      start = $('div.ml-10.flex.items-baseline.space-x-4 a[href="#"]'),
      actual = start[0].next(),
      expected = start[1];

    expect(actual).toStrictEqual(expected);
  });

  it('selects NO next sibling', () => {
    expect.hasAssertions();

    const
      start = $('div.ml-10.flex.items-baseline.space-x-4 a[href="#"]'),
      actual = start[4].next(),
      expected = null;

    expect(actual).toStrictEqual(expected);
  });

  it('selects next-next sibling', () => {
    expect.hasAssertions();

    const
      start = $('div.ml-10.flex.items-baseline.space-x-4 a[href="#"]'),
      actual = start[0].next().next(),
      expected = start[2];

    expect(actual).toStrictEqual(expected);
  });

  it('selects previous sibling', () => {
    expect.hasAssertions();

    const
      start = $('div.ml-10.flex.items-baseline.space-x-4 a[href="#"]'),
      actual = start[4].prev(),
      expected = start[3];

    expect(actual).toStrictEqual(expected);
  });

  it('selects NO previous sibling', () => {
    expect.hasAssertions();

    const
      start = $('div.ml-10.flex.items-baseline.space-x-4 a[href="#"]'),
      actual = start[0].prev(),
      expected = null;

    expect(actual).toStrictEqual(expected);
  });

  it('selects previous-previous sibling', () => {
    expect.hasAssertions();

    const
      start = $('div.ml-10.flex.items-baseline.space-x-4 a[href="#"]'),
      actual = start[4].prev().prev(),
      expected = start[2];

    expect(actual).toStrictEqual(expected);
  });

  it('selects descendants, then ancestors', () => {
    expect.hasAssertions();

    const
      start = $('nav'),
      actual = start[0].
        descendants('svg').
        filter(e => e.ancestor('button').
          get().
          tagName.toLowerCase() === 'button').length,
      expected = 4;

    expect(actual).toStrictEqual(expected);
  });
});

describe('not yet implemented', () => {
  it.todo('selects an element, then appends DOM nodes to the end');
  it.todo('selects an element, then appends DOM nodes to position index');
  it.todo('selects an element, then wraps with another node');
  it.todo('selects an element, then wraps with another node, and re-injects in-place');
});
