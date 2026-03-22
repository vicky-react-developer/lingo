import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router'
import Login from './pages/Login';
import SplashScreen from './pages/SplashScreen';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import ChatPage from './pages/ChatPage';
import ModeSelection from './pages/ModeSelection';
import TopicList from './pages/TopicList';
import PassageList from './pages/PassageList';
import Resetpassword from './pages/Resetpassword';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<Resetpassword />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/home" element={<ModeSelection />} />
      <Route path="/topic" element={<TopicList />} />
      <Route path="/passage" element={<PassageList />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
