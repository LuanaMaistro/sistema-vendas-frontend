import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CustomerCrudPage from './pages/customerCrud/CustomerCrudPage'
import AppLayout from './pages/appLayout/AppLayout'

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

  return (
    <>
      {appRouter}
    </>
  )
}

export default App
