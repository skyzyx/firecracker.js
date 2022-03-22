# CHANGELOG

All notable changes to this project will be documented in this file. The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

* **delegate** — Added a check to ensure we don't traverse `parentNode` properties beyond `document`.

## 1.0.2 - 2022-03-20

* **dquery** — Added the `render(element)` method which replaces the contents of the node with new contents.
* **dquery** — Updated `prepend(element)` and `before(element)` to accept a string of HTML as input. Haven't been able to get the tests working for `after(element)` yet.

## 1.0.1 - 2022-03-20

* **dquery** — Updated `append(element)` to accept a string of HTML as input.

## 1.0.0 - 2022-03-18

* **vdom** — Added _instance methods_:
    * `_()` — For adding children.
    * `dom()` — For getting the _real_ DOM element back.
    * `h()` — For adding/reading HTML content.
    * `t()` — For adding/reading text content.
    * `toString()` — For getting the DOM as an HTML string.
* **vdom** — Added _static methods_:
    * `DOM()` — For appending DOM elements.
    * `h()` — For adding HTML content.
    * `t()` — For adding text content.
* **dquery** — Added constructor `DQuery(selector, elem)`.
* **dquery** — Added _instance methods_ for querying/traversing nodes:
    * `ancestor(selector)`
    * `children(selector)`
    * `descendants(selector)`
    * `get()`
    * `next(selector)`
    * `parent()`
    * `prev(selector)`
    * `siblings(selector)`
* **dquery** — Added _instance methods_ for adding nodes:
    * `after(element)`
    * `append(element)`
    * `before(element)`
    * `prepend(element)`
* **dquery** — Added _instance methods_ for manipulating classnames:
    * `add(klass)`
    * `classes()`
    * `has(klass)`
    * `remove(klass)`
    * `replace(klass1, klass2)`
    * `toggle(klass)`
* **dquery** — Added _instance methods_ for triggering events:
    * `on(type, fn)`
* **delegate** — Initial implementation of of Delegate.
    * Added constructor `Delegate(selector, fn)`.
