import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CustomerCrudPage from './pages/customerCrud/CustomerCrudPage'

function App() {

  const appRouter = (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={ <CustomerCrudPage /> }/>

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
