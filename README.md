# redux-beacon-electron

Integrate Google Analytics with Electron apps, using [Redux Beacon](https://github.com/rangle/redux-beacon).

Electron and Google Analytics aren't really friends anymore because the standard GA library expects:

* A non-file protocol (and electron loads with `file://`)
* Cookie storage for sessions and identifying current user
* Each page view should have a website-like URL
* Traffic isn't going through `fetch` and so you can't monitor it through devtools
* +probably more.

This library ensures great integration using `electron-ga` and `redux-beacon`.


## Quick Start

Install:

```
$ yarn add redux-beacon-electron
```

Integrate with Redux Beacon

```javascript
import { 
  createElectronGoogleAnalyticsTarget, 
  actionMetaEventMapper as eventsMapper
} from 'redux-beacon-electron'

const electronTarget = createElectronGoogleAnalyticsTarget({ua: 'UA-XXXX'})
const gaMiddleware = createMiddleware(eventsMapper, electronTarget)

```

Then, somewhere in your Redux actions (I'm using `redux-actions` but it doesn't really matter):

```javascript
// a page view action
const onMounted = createAction('settings/VIEW', x => x, track(() => ({ hit: 'pageview' })))

// a custom event (default hit type)
const setMuteState = createAction('app/SET_MUTE_STATE', x => x, track(action => ({ label: 'toggleMute', value: action.payload ? 1 : 0 })))
```

## Meta Events Mapper

You can use the `actionMetaEventMapper` if you believe (as I do) that actions should say how they map themselves to analytics events (as opposed to having a big switch case or mapping dictionary in a centralized place).

This means that the form of a _Flux Standard Action_ that is tracked is now:

```javascript
{
    type:...,
    action: ...,
    meta: {
        track: action=>({hit: "event"|"pageview", category, action, label, value})
    }
}
```

The `track` helper function creates the `meta` structure given a mapping function.

# Contributing

Fork, implement, add tests, pull request, get my everlasting thanks and a respectable place here :).

### Thanks:

To all [Contributors](https://github.com/jondot/redux-beacon-electron/graphs/contributors) - you make this happen, thanks!

# Copyright

Copyright (c) 2018 [Dotan Nahum](http://gplus.to/dotan) [@jondot](http://twitter.com/jondot). See [LICENSE](LICENSE.txt) for further details.
