/**
 * @jest-environment jsdom
 */

import {jest} from '@jest/globals'; // eslint-disable-line no-unused-vars
import VDOM from '../src/vdom.js'; // eslint-disable-line sort-imports

const _ = VDOM;

describe('core dom', () => {
  it('creates a new element', () => {
    expect.hasAssertions();

    const actual = _('p'),
      expected = (() => {
        const p = document.createElement('p');

        return p;
      })();

    expect(actual.dom()).toStrictEqual(expected);
  });

  it('creates a new element with ID using shorthand', () => {
    expect.hasAssertions();

    const actual = _('p#this'),
      expected = (() => {
        const p = document.createElement('p');

        p.id = 'this';

        return p;
      })();

    expect(actual.dom()).toStrictEqual(expected);
  });

  it('creates a new element with class using shorthand', () => {
    expect.hasAssertions();

    const actual = _('p.that'),
      expected = (() => {
        const p = document.createElement('p');

        p.className = 'that';

        return p;
      })();

    expect(actual.dom()).toStrictEqual(expected);
  });

  it('creates a new element with ID and class using shorthand', () => {
    expect.hasAssertions();

    const actual = _('p#this.that'),
      expected = (() => {
        const p = document.createElement('p');

        p.id = 'this';
        p.className = 'that';

        return p;
      })();

    expect(actual.dom()).toStrictEqual(expected);
  });

  it('creates a new element with ID and class using shorthand (reversed)', () => {
    expect.hasAssertions();

    const actual = _('p.that#this'),
      expected = (() => {
        const p = document.createElement('p');

        p.id = 'this';
        p.className = 'that';

        return p;
      })();

    expect(actual.dom()).toStrictEqual(expected);
  });

  it('creates a new element with ID and multiple classes using shorthand', () => {
    expect.hasAssertions();

    const actual = _('p.that#this.thing1.thing2'),
      expected = (() => {
        const p = document.createElement('p');

        p.id = 'this';
        p.className = 'that thing1 thing2';

        return p;
      })();

    expect(actual.dom()).toStrictEqual(expected);
  });

  it('creates a new element with data attributes', () => {
    expect.hasAssertions();

    const actual = _('p', {
        data: {
          columns: 3,
          'index-number': 12314,
          parent: 'cars',
        },
      }),
      expected = (() => {
        const p = document.createElement('p');

        p.setAttribute('data-columns', 3); // eslint-disable-line no-magic-numbers
        p.setAttribute('data-index-number', 12314); // eslint-disable-line no-magic-numbers
        p.setAttribute('data-parent', 'cars');

        return p;
      })();

    expect(actual.dom()).toStrictEqual(expected);
  });

  it('creates a new element with microdata', () => {
    expect.hasAssertions();

    const actual = _('p', {
        itemscope: '',
        itemtype: 'http://schema.org/Person',
      }),
      expected = (() => {
        const p = document.createElement('p');

        p.setAttribute('itemscope', '');
        p.setAttribute('itemtype', 'http://schema.org/Person');

        return p;
      })();

    expect(actual.dom()).toStrictEqual(expected);
  });

  it('creates a new element with microdata using shorthand', () => {
    expect.hasAssertions();

    const actual = _('p[itemscope=][itemtype=http://schema.org/Person]'),
      expected = (() => {
        const p = document.createElement('p');

        p.setAttribute('itemscope', '');
        p.setAttribute('itemtype', 'http://schema.org/Person');

        return p;
      })();

    expect(actual.dom()).toStrictEqual(expected);
  });
});

describe('child nodes', () => {
  it('creates a new element with a text node given as text', () => {
    expect.hasAssertions();

    const actual = _('p').t('what?'),
      expected = (() => {
        const p = document.createElement('p'),
          text = document.createTextNode('what?');

        p.appendChild(text);

        return p;
      })();

    expect(actual.dom()).toStrictEqual(expected);
  });

  it('creates a new element with a text node given as HTML', () => {
    expect.hasAssertions();

    const actual = _('p').h('what?'),
      expected = (() => {
        const p = document.createElement('p'),
          text = document.createTextNode('what?');

        p.appendChild(text);

        return p;
      })();

    expect(actual.dom()).toStrictEqual(expected);
  });

  it('reads the value as a string of HTML text', () => {
    expect.hasAssertions();

    const actual = _('p').h('what?').
        toString(),
      expected = '<p>what?</p>';

    expect(actual).toStrictEqual(expected);
  });

  it('reads the value of a text node', () => {
    expect.hasAssertions();

    const actual = _('p').h('what?').
        t(),
      expected = 'what?';

    expect(actual).toStrictEqual(expected);
  });

  it('reads the value of a an overwritten text node', () => {
    expect.hasAssertions();

    const actual = _('p').h('what?').
        h('no, no that', true).
        t(),
      expected = 'no, no that';

    expect(actual).toStrictEqual(expected);
  });

  it('reads the value of a an appended text node', () => {
    expect.hasAssertions();

    const actual = _('p').h('what?').
        h(' no, no that').
        t(),
      expected = 'what? no, no that';

    expect(actual).toStrictEqual(expected);
  });

  it('ignores undefined children', () => {
    expect.hasAssertions();

    const actual = _('p')._([undefined]), // eslint-disable-line no-undefined
      expected = document.createElement('p');

    expect(actual.dom()).toStrictEqual(expected);
  });

  it('creates a new element with a set of children using innerHTML #1', () => {
    expect.hasAssertions();

    const
      actual = _('section[itemscope=][itemtype=http://schema.org/Person]').h(
        `Hello, my name is <span itemprop="name">John Doe</span>.
        I am a <span itemprop="jobTitle">graduate research assistant</span> at the
        <span itemprop="affiliation">University of Dreams</span>.`.replaceAll(/\s+/gu, ' '),
      ),
      expected = (() => {
        const section = document.createElement('section'),
          span1 = document.createElement('span'),
          span2 = document.createElement('span'),
          span3 = document.createElement('span');

        section.setAttribute('itemscope', '');
        section.setAttribute('itemtype', 'http://schema.org/Person');

        span1.setAttribute('itemprop', 'name');
        span2.setAttribute('itemprop', 'jobTitle');
        span3.setAttribute('itemprop', 'affiliation');

        section.appendChild(document.createTextNode('Hello, my name is '));
        span1.appendChild(document.createTextNode('John Doe'));
        section.appendChild(span1);
        section.appendChild(document.createTextNode('. I am a '));
        span2.appendChild(document.createTextNode('graduate research assistant'));
        section.appendChild(span2);
        section.appendChild(document.createTextNode(' at the '));
        span3.appendChild(document.createTextNode('University of Dreams'));
        section.appendChild(span3);
        section.appendChild(document.createTextNode('.'));

        return section;
      })();

    expect(actual.dom()).toStrictEqual(expected);
  });

  it('creates a new element with a set of children using innerHTML #2', () => {
    expect.hasAssertions();

    const
      actual = _('section[itemscope=][itemtype=http://schema.org/Person]')._(
        _.h(
          `Hello, my name is <span itemprop="name">John Doe</span>.
          I am a <span itemprop="jobTitle">graduate research assistant</span> at the
          <span itemprop="affiliation">University of Dreams</span>.`.replaceAll(/\s+/gu, ' '),
        ),
      ),
      expected = (() => {
        const section = document.createElement('section'),
          span1 = document.createElement('span'),
          span2 = document.createElement('span'),
          span3 = document.createElement('span');

        section.setAttribute('itemscope', '');
        section.setAttribute('itemtype', 'http://schema.org/Person');

        span1.setAttribute('itemprop', 'name');
        span2.setAttribute('itemprop', 'jobTitle');
        span3.setAttribute('itemprop', 'affiliation');

        section.appendChild(document.createTextNode('Hello, my name is '));
        span1.appendChild(document.createTextNode('John Doe'));
        section.appendChild(span1);
        section.appendChild(document.createTextNode('. I am a '));
        span2.appendChild(document.createTextNode('graduate research assistant'));
        section.appendChild(span2);
        section.appendChild(document.createTextNode(' at the '));
        span3.appendChild(document.createTextNode('University of Dreams'));
        section.appendChild(span3);
        section.appendChild(document.createTextNode('.'));

        return section;
      })();

    expect(actual.dom()).toStrictEqual(expected);
  });

  it('creates a new element with a set of children modeled with VDOM', () => {
    expect.hasAssertions();

    const
      actual = _('section[itemscope=][itemtype=http://schema.org/Person]')._([
        _.t('Hello, my name is '),
        _('span', {itemprop: 'name'}).t('John Doe'),
        _.t('. I am a '),
        _('span', {itemprop: 'jobTitle'}).t('graduate research assistant'),
        _.t(' at the '),
        _('span', {itemprop: 'affiliation'}).t('University of Dreams'),
        _.t('.'),
      ]),
      expected = (() => {
        const section = document.createElement('section'),
          span1 = document.createElement('span'),
          span2 = document.createElement('span'),
          span3 = document.createElement('span');

        section.setAttribute('itemscope', '');
        section.setAttribute('itemtype', 'http://schema.org/Person');

        span1.setAttribute('itemprop', 'name');
        span2.setAttribute('itemprop', 'jobTitle');
        span3.setAttribute('itemprop', 'affiliation');

        section.appendChild(document.createTextNode('Hello, my name is '));
        span1.appendChild(document.createTextNode('John Doe'));
        section.appendChild(span1);
        section.appendChild(document.createTextNode('. I am a '));
        span2.appendChild(document.createTextNode('graduate research assistant'));
        section.appendChild(span2);
        section.appendChild(document.createTextNode(' at the '));
        span3.appendChild(document.createTextNode('University of Dreams'));
        section.appendChild(span3);
        section.appendChild(document.createTextNode('.'));

        return section;
      })();

    expect(actual.dom()).toStrictEqual(expected);
  });

  it('creates a new element with a single child modeled with VDOM', () => {
    expect.hasAssertions();

    const
      actual = _('p')._(_('strong').t('this is bold')),
      expected = (() => {
        const p = document.createElement('p'),
          strong = document.createElement('strong');

        strong.appendChild(document.createTextNode('this is bold'));
        p.appendChild(strong);

        return p;
      })();

    expect(actual.dom()).toStrictEqual(expected);
  });
});

describe('dom attachment', () => {
  it('attaches to the live <body> element using .dom()', () => {
    expect.hasAssertions();

    const actual = (() => {
        const body = document.createElement('body');

        body.append(
          _('p').t('what?').
            dom(),
        );

        return body;
      })(),
      expected = (() => {
        const body = document.createElement('body'),
          p = document.createElement('p'),
          text = document.createTextNode('what?');

        p.appendChild(text);
        body.append(p);

        return body;
      })();

    expect(actual).toStrictEqual(expected);
  });

  it('attaches to the live <body> element using _.DOM()', () => {
    expect.hasAssertions();

    const actual = (() => {
        const body = document.createElement('body');

        body.append(_.DOM(
          _('p').t('what?'),
        ));

        return body;
      })(),
      expected = (() => {
        const body = document.createElement('body'),
          p = document.createElement('p'),
          text = document.createTextNode('what?');

        p.appendChild(text);
        body.append(p);

        return body;
      })();

    expect(actual).toStrictEqual(expected);
  });
});
