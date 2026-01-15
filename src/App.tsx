import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CustomerCrudPage from './pages/customerCrud/CustomerCrudPage'
import AppLayout from './pages/appLayout/AppLayout'
import { App as AntDApp, ConfigProvider,  type ThemeConfig } from 'antd'

function App() {

  const teste = (
    <div>teste</div>
  )
  const appRouter = (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ teste } />
        <Route path="/layout" element={ <AppLayout /> }>
          <Route path="/layout/customers" element={ <CustomerCrudPage /> }/>
        </Route>

      </Routes>
    </BrowserRouter>
  )

  const theme = {
    token: {
      colorPrimary: "#13C2C2",
      colorBgLayout: "#F5F5F5",
      colorBgContainer: "#FFFFFF",
      colorBgElevated: "#FFFFFF",

      colorBorder: "#D9D9D9",
      colorBorderSecondary: "#F0F0F0",
      borderRadius: 8,
      borderRadiusLG: 12,
      borderRadiusSM: 4,

      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02)",
      boxShadowSecondary: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",

      fontSize: 14,
      fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",

      padding: 16,
      paddingLG: 24,
      paddingSM: 12,

      margin: 16,
      marginLG: 24,
    },
  } as ThemeConfig
  return (
    <>
      <ConfigProvider theme={theme}>
        <AntDApp>
          {appRouter}
        </AntDApp>
      </ConfigProvider>
    </>
  )
}

export default App
