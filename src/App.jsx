import './App.css'
import { RouterProvider } from 'react-router-dom'
import mainRouter from './router/main-router'

function App() {
  return (
    <div className='min-vh-100'>
      <RouterProvider router={mainRouter} />
    </div>
  )
}

export default App
