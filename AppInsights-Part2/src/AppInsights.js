import React from 'react'
import {
  ApplicationInsights,
  SeverityLevel,
} from '@microsoft/applicationinsights-web'
import {
  ReactPlugin,
  withAITracking,
} from '@microsoft/applicationinsights-react-js'
import {globalHistory} from '@reach/router'

const reactPlugin = new ReactPlugin()
const ai = new ApplicationInsights({
  config: {
    instrumentationKey: process.env.APPINSIGHTS_KEY,
    extensions: [reactPlugin],
    extensionConfig: {
      [reactPlugin.identifier]: {history: globalHistory},
    },
    disableFetchTracking: false,
  },
})
ai.loadAppInsights()

export default Component => withAITracking(reactPlugin, Component)
export const {appInsights} = ai

class ErrorBoundary extends React.Component {
  state = {hasError: false}

  componentDidCatch(error, errorInfo) {
    this.setState({hasError: true})
    ai.appInsights.trackException({
      error,
      exception: error,
      severityLevel: SeverityLevel.Error,
      properties: {...errorInfo},
    })
  }

  render() {
    const {hasError} = this.state
    const {onError, children} = this.props
    if (hasError) {
      return typeof onError === 'function'
        ? onError()
        : React.createElement(onError)
    }

    return children
  }
}

export {ErrorBoundary}
