import React from 'react'
import Headroom from 'react-headroom'
import {Container} from 'semantic-ui-react'
import Footer from '../Footer'
import Header from '../Header'
import 'semantic-ui-css/semantic.min.css'
import {AppInsightsContextProvider} from '../../AppInsightsContext'
import withAppInsights from '../../AppInsights'

const Layout = withAppInsights(({location, children}) => (
  <>
    <Headroom
      upTolerance={10}
      downTolerance={10}
      style={{zIndex: '20', height: '6.5em'}}
    >
      <Header location={location} />
    </Headroom>
    <Container text>{children}</Container>
    <Footer />
  </>
))

const LayoutWithContext = ({location, children}) => (
  <AppInsightsContextProvider>
    <Layout location={location} children={children} />
  </AppInsightsContextProvider>
)

export default LayoutWithContext
