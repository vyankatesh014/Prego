import React from 'react'  
import Navbar from './components/Navbar'
import { Route, Routes, useLocation} from 'react-router-dom'
import Home from './pages/home'
import { Toaster } from 'react-hot-toast'


const App = () => {

  const isSellerPath = useLocation().pathname.includes('seller'); 

  return (
    <div>
      {isSellerPath ? null :<Navbar/>}

    <Toaster />

      <div className={`${isSellerPath ? "" : "px-4 md:px-16 lg:px-24 xl:px-32"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  )
}

export default App