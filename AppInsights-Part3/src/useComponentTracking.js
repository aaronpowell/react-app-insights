import {useEffect, useRef} from 'react'

function getEngagementTimeSeconds(t) {
  return (
    (Date.now() -
      t.firstActiveTimestamp -
      t.totalIdleTime -
      t.idleCount * t.idleTimeout) /
    1000
  )
}

const useComponentTracking = (reactPlugin, componentName) => {
  const tracking = useRef({
    hookTimestamp: Date.now(),
    firstActiveTimestamp: 0,
    totalIdleTime: 0,
    lastActiveTimestamp: 0,
    idleStartTimestamp: 0,
    idleCount: 0,
    idleTimeout: 5000,
  })
  const savedCallback = useRef()

  const callback = () => {
    let trackedData = tracking.current
    if (
      trackedData.lastActiveTimestamp > 0 &&
      trackedData.idleStartTimestamp === 0 &&
      Date.now() - trackedData.lastActiveTimestamp >= trackedData.idleTimeout
    ) {
      trackedData.idleStartTimestamp = Date.now()
      trackedData.idleCount++
    }
  }
  const delay = 100

  savedCallback.current = callback

  // Set up the interval.
  useEffect(() => {
    let id = setInterval(savedCallback.current, delay)
    return () => {
      clearInterval(id)

      let trackedData = tracking.current
      if (trackedData.hookTimestamp === 0) {
        throw new Error(
          'useAppInsights:unload hook: hookTimestamp is not initialized.',
        )
      }

      if (trackedData.firstActiveTimestamp === 0) {
        return
      }

      const engagementTime = getEngagementTimeSeconds(trackedData)
      const metricData = {
        average: engagementTime,
        name: 'React Component Engaged Time (seconds)',
        sampleCount: 1,
      }

      const additionalProperties = {'Component Name': componentName}
      reactPlugin.trackMetric(metricData, additionalProperties)
    }
  }, [])

  const trackActivity = () => {
    let t = tracking.current
    if (t.firstActiveTimestamp === 0) {
      t.firstActiveTimestamp = Date.now()
      t.lastActiveTimestamp = t.firstActiveTimestamp
    } else {
      t.lastActiveTimestamp = Date.now()
    }

    if (t.idleStartTimestamp > 0) {
      const lastIdleTime = t.lastActiveTimestamp - t.idleStartTimestamp
      t.totalIdleTime += lastIdleTime
      t.idleStartTimestamp = 0
    }
  }

  return trackActivity
}

export default useComponentTracking
