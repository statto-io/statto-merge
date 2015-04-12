# statto-merge #

Merges sets of unprocessed statto data sets.

## Synopsis ##

However, you store your stats, sometimes you need to merge two sets together. You could try using this
package. Remember, you can only merge raw stats since processed stats don't actually contain all information required
to be able to merge two sets properly.

```js
var merge = require('statto-merge')

var info = { put : 'whatever', you : 'like, here : true }
var a = { /* a statto data set */
var b = { /* a statto data set */
var c = { /* a statto data set */
var d = { /* a statto data set */

var result1 = merge(info, [a, b])
var result2 = merge(info, [a, b, c, d])
```

## Example ##

```js
var merge = require('statto-merge')

var ts1 = '2015-04-12T09:08:00.000Z'
var ts2 = '2015-04-12T09:08:00.000Z'

var raw1 = {
  counters : {
    hit : 1
  },
  gauges : {
    memory : 68
  },
  sets : {
    color : { white : 2 }
  },
  timers : {
    req : [ 79, 86 ],
  },
}
var raw2 = {
  counters : {
    hit : 2
  },
  gauges : {
    memory : 76
  },
  sets : {
    color : { white : 1, black : 4 }
  },
  timers : {
    req : [ 81, 93, 89 ],
  },
}

var stats = merge(info, [ raw1, raw2 ])
// =>
var stats = {
  counters : {
    hit : 3  // counters are added together
  },
  gauges : {
    memory : 76  // gauges take the last value seen
  },
  sets : {
    color : { white : 3, black : 4 }, // each value in the set are added together
  },
  timers : {
    req : { // timers get processed into the following
      sum    : 534,
      count  : 6,
      min    : 81,
      max    : 94,
      mean   : 89,
      median : 89,
      std    : 4.041451884327381,
    },
  },
}
```

## ChangeLog ##

### 0.1.0 (2015-03-29) ###

* [NEW] Initial version

## Author ##

Written by [Andrew Chilton](http://chilts.org/) - [Twitter](https://twitter.com/andychilton).

Written for [Tynio](https://tyn.io/) so we can use a statsd-like daemon in a much easier way. Our use-case involves a
stats callback which writes each file to Rackspace's Cloud Files, which are aggregated in a separate process elsewhere.
ie. the stats daemon is not where the hard work is, it's pretty easy.

## License ##

The MIT License (MIT)

Copyright 2015 Tynio Ltd.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

(Ends)
