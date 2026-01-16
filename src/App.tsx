import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './pages/appLayout/AppLayout'
import { App as AntDApp, ConfigProvider } from 'antd'
import { routesConfigs } from './routes/routes'
import type RouteConfig from './routes/RouteConfig'
import { useTheme } from './hooks/useTheme'
import { darkTheme, lightTheme } from './config/theme'
import styles  from './App.module.css'

function App() {

  const configToRoute = (routeConfig: RouteConfig) => {
    return (
      <Route
        key={routeConfig.path}
        path={routeConfig.path}
        element={routeConfig.element}
      />
    )
  }

  const appRouter = (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <AppLayout /> }>
          { routesConfigs.map(configToRoute) }
        </Route>

      </Routes>
    </BrowserRouter>
  )

  const { theme: currentTheme } = useTheme()

  return (
    <>
      <ConfigProvider theme={currentTheme === 'dark' ? darkTheme : lightTheme}>
        <AntDApp className={styles.antdApp}>
          {appRouter}
        </AntDApp>
      </ConfigProvider>
    </>
  )
}

export default App
