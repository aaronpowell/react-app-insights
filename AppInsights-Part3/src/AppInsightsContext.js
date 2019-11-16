import React, {createContext, useContext} from 'react'
import {reactPlugin} from './AppInsights'

const AppInsightsContext = createContext(reactPlugin)

const AppInsightsContextProvider = ({children}) => {
  return (
    <AppInsightsContext.Provider value={reactPlugin}>
      {children}
    </AppInsightsContext.Provider>
  )
}

const useAppInsightsContext = () => useContext(AppInsightsContext)

export {AppInsightsContext, AppInsightsContextProvider, useAppInsightsContext}
