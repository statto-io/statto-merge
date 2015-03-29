// --------------------------------------------------------------------------------------------------------------------
//
// tyn.io - (c) 2015 Tynio.
//
// License: MIT
//
// --------------------------------------------------------------------------------------------------------------------

// npm
var test = require('tape')

// local
var merge = require('./')

// --------------------------------------------------------------------------------------------------------------------

test('Check a blank merge', function(t) {
  t.plan(1)

  var info = { merged : 2 }
  var s1 = {
    counters: {},
    gauges: {},
    sets: {},
    timers: {},
    ts: "2015-03-27T12:26:45.000Z",
  }
  var s2 = {
    counters: {},
    gauges: {},
    sets: {},
    timers: {},
    ts: "2015-03-27T12:26:45.000Z",
  }
  var s3 = {
    counters: {},
    gauges: {},
    sets: {},
    timers: {},
    info: { merged : 2 },
    ts: "2015-03-27T12:26:45.000Z",
  }
  t.deepEqual(merge(info, s1, s2), s3, 'The merge is correct')

  t.end()
})

// --------------------------------------------------------------------------------------------------------------------

test('Check a simple merge', function(t) {
  t.plan(1)

  var info = { merged : 2 }
  var s1 = {
    counters: { a : 1 },
    gauges: { blah : 54 },
    sets: {},
    timers: { ms : [1] },
    ts: "2015-03-27T12:26:45.000Z",
  }
  var s2 = {
    counters: { b : 2 },
    gauges: { blah : 96 },
    sets: {},
    timers: { ms : [2] },
    ts: "2015-03-27T12:26:45.000Z",
  }
  var s3 = {
    counters: { a : 1, b : 2 },
    gauges: { blah : 96 },
    sets: {},
    timers: { ms : [1, 2] },
    info: { merged :2 },
    ts: "2015-03-27T12:26:45.000Z",
  }
  t.deepEqual(merge(info, s1, s2), s3, 'The merge is correct')

  t.end()
})

// --------------------------------------------------------------------------------------------------------------------

var stats1 = {
  "counters":{
    "statto.packets.total":2,
    "statto.msgs.total":3,
    "statto.msgs.good":5,
    "statto.msgs.bad":0,
    "hit.site.chilts":5
  },
  "gauges":{"account.closed":1,"account.total":100},
  "timers":{
    "req":[117]
  },
  "sets":{
    "ip":{"1.2.3.4":2,"9.9.9.9":5},
  },
  "info":{"pid":21983,"host":"tiger"},
  "ts":"2015-03-27T12:26:45.000Z",
}

var stats2 = {
  "counters":{
    "statto.packets.total":4,
    "statto.msgs.total":4,
    "statto.msgs.good":3,
    "statto.msgs.bad":1,
    "hit.site.blah":4
  },
  "gauges":{"account.closed":2,"account.total":101},
  "timers":{
    "req":[85,91,94,101]
  },
  "sets":{
    "ip":{"1.2.3.4":1,"5.6.7.8":4},
  },
  "info":{"pid":21914,"host":"tiger"},
  "ts":"2015-03-27T12:28:45.000Z",
}

var stats3 = {
  "counters":{
    "statto.packets.total":6,
    "statto.msgs.total":7,
    "statto.msgs.good":8,
    "statto.msgs.bad":1,
    "hit.site.blah":4,
    "hit.site.chilts":5
  },
  "gauges":{"account.closed":2,"account.total":101},
  "timers":{
    "req":[117,85,91,94,101]
  },
  "sets":{
    "ip":{"1.2.3.4":3,"5.6.7.8":4,"9.9.9.9":5},
  },
  "info":{"merged":2},
  "ts":"2015-03-27T12:28:45.000Z",
}

test('Check the merge', function(t) {
  t.plan(1)

  var info = { merged : 2}
  t.deepEqual(merge(info, stats1, stats2), stats3, 'The merge is correct')

  t.end()
})

// --------------------------------------------------------------------------------------------------------------------
