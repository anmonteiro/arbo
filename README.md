# arbo [![Travis](https://img.shields.io/travis/anmonteiro/arbo.svg?style=flat-square)](https://travis-ci.org/anmonteiro/arbo) [![npm](https://img.shields.io/npm/v/arbo.svg?style=flat-square)](https://npmjs.com/package/arbo)

Arbo is tiny NPM package to facilitate interactive development. It allows removing
a (potentially dirty) module and every module it requires from the require cache
while preserving other unrelated cached modules.

## Installation

``` shell
$ npm install arbo
```

## Usage

```js
var clear = require('arbo');

// require module
require('foo');

// arbo clears the module and everything it depends on from the require cache
clear('foo');

```


## License & Copyright

Copyright © 2017 António Nuno Monteiro

Distributed under the MIT License (see [LICENSE](./LICENSE)).
