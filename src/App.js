import React from 'react'
import './App.css'
import Navigation from './Component/Navigation'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NotFound from './Component/NotFound'
import AuthProvider from './Contexts/AuthContext'
import Login from './Component/Auth/Login'
import Footer from './Component/Footer/Footer'
import ProtectedRoute from './Component/ProtectedRoute'
import Categories from './Component/Categories/Categories'
import Todo from './ToDos/Todo'


export default function App() {
  return (
    <div className="App">
       <AuthProvider>
      <Router>
        <Navigation/>
        <Routes>
        <Route path="/" element={<h1>This will be home</h1>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/categories" element={<ProtectedRoute><Categories/></ProtectedRoute>}/>
        <Route path="/todo" element={<Todo/>} />
        <Route path="*" element={<NotFound />}/>
        </Routes>
        <Footer />
      </Router>
       </AuthProvider>
    </div>
  )
}




