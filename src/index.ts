import ElectronGa from 'electron-ga'
interface FSA {
  type: string
  payload: any
  meta?: any
}

type ActionCreator = (action: FSA) => any

const createElectronGoogleAnalyticsTarget = ({ ua }: { ua: string }) => {
  const analytics = new ElectronGa(ua)
  return (events: any[]) => {
    events.forEach(event => {
      if (event.hit === 'event') {
        analytics.send(event.hit, {
          ea: event.action,
          ec: event.category,
          el: event.label,
          ev: event.value
        })
      } else if (event.hit === 'pageview') {
        analytics.send(event.hit, {
          dl: `http://localhost/${event.category}`,
          dt: event.category
        })
      }
    })
  }
}

const actionMetaEventMapper = (action: FSA) => {
  if (action.meta && action.meta.track) {
    return [action.meta.track]
  }
  return []
}

const track = (f: ActionCreator) => () => ({
  track: (reduxAction: FSA) => {
    const [category, action] = reduxAction.type.split('/')
    return {
      action,
      category,
      hit: 'event',
      ...(f && f(reduxAction))
    }
  }
})
export { track, createElectronGoogleAnalyticsTarget, actionMetaEventMapper }
