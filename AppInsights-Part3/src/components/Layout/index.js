import React from 'react'
import Headroom from 'react-headroom'
import {Container} from 'semantic-ui-react'
import Footer from '../Footer'
import Header from '../Header'
import 'semantic-ui-css/semantic.min.css'
import {
  AppInsightsContextProvider,
  useAppInsightsContext,
} from '../../AppInsightsContext'
import useComponentTracking from '../../useComponentTracking'

const Layout = ({location, children}) => {
  const reactPlugin = useAppInsightsContext()
  const trackComponent = useComponentTracking(reactPlugin, 'Layout')
  return (
    <AppInsightsContextProvider>
      <div onMouseOver={trackComponent} onClick={trackComponent}>
        <Headroom
          upTolerance={10}
          downTolerance={10}
          style={{zIndex: '20', height: '6.5em'}}
        >
          <Header location={location} />
        </Headroom>
        <Container text>{children}</Container>
        <Footer />
      </div>
    </AppInsightsContextProvider>
  )
}

export default Layout
