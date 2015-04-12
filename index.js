// --------------------------------------------------------------------------------------------------------------------
//
// tyn.io - (c) 2015 Tynio.
//
// License: MIT
//
// --------------------------------------------------------------------------------------------------------------------

function merge(info, objs) {
  var stats = {
    counters: {},
    gauges: {},
    sets: {},
    timers: {},
    info: info,
  }

  objs.forEach(function(obj) {
    obj.counters = obj.counters || {}
    obj.gauges   = obj.gauges   || {}
    obj.sets     = obj.sets     || {}
    obj.timers   = obj.timers   || {}

    // do counters first
    Object.keys(obj.counters).forEach(function(key) {
      if ( !(key in stats.counters) ) {
        stats.counters[key] = 0
      }
      stats.counters[key] += obj.counters[key]
    })

    // now gauges
    Object.keys(obj.gauges).forEach(function(key) {
      // just overwrite it, later values (in this case in the args list) overwriter earlier values
      stats.gauges[key] = obj.gauges[key]
    })

    // sets
    Object.keys(obj.sets).forEach(function(key) {
      if ( !(key in stats.sets) ) {
        stats.sets[key] = {}
      }

      // loop through the items
      Object.keys(obj.sets[key]).forEach(function(item) {
        if ( !(item in stats.sets[key]) ) {
          stats.sets[key][item] = 0
        }
        stats.sets[key][item] += obj.sets[key][item]
      })
    })

    // timers (remember, these are from unprocessed stats
    Object.keys(obj.timers).forEach(function(key) {
      if ( !(key in stats.timers) ) {
        stats.timers[key] = []
      }
      stats.timers[key] = stats.timers[key].concat(obj.timers[key])
    })

    // timestamp
    stats.ts = obj.ts
  })

  return stats
}


// --------------------------------------------------------------------------------------------------------------------

module.exports = merge

// --------------------------------------------------------------------------------------------------------------------
