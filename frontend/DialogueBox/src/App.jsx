import React from 'react'
import Auth from './pages/Auth/Auth'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './pages/Auth/Login'
import Home from './pages/Home/Home'
import InvitePage from './pages/Invitation/InvitePage'
import Sidebar from './components/Nav/Sidebar'
import InvitationsPage from './pages/Invitation/AcceptPage'

const App = () => {
  return (
    <div>
      <Router>
      {/* <Sidebar /> */}
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/invite" element={<InvitePage/>} />
          <Route path="/accept" element={<InvitationsPage/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App