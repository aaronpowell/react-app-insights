import {useState, useEffect, useRef} from 'react'

export default function useCustomEvent(
  reactPlugin,
  eventName,
  eventData,
  skipFirstRun = true,
) {
  const [data, setData] = useState(eventData)
  const firstRun = useRef(skipFirstRun)

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    reactPlugin.trackEvent({name: eventName}, data)
  }, [reactPlugin, data, eventName])

  return setData
}
