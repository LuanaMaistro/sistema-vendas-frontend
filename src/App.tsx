import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CustomerCrudPage from './pages/customerCrud/CustomerCrudPage'
import AppLayout from './pages/appLayout/AppLayout'
import { ConfigProvider, type ThemeConfig } from 'antd'

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
      colorPrimary: "#A4B465"
    }
  } as ThemeConfig

  return (
    <>
      <ConfigProvider theme={theme}>
        {appRouter}
      </ConfigProvider>
    </>
  )
}

export default App
