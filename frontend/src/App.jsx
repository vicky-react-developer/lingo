import React, { useState } from 'react';
import './App.css'
import { Routes, Route } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute, PublicOnlyRoute } from './routes/ProtectedRoute';

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
import Sidebar from './components/Sidebar';
import ChatHistory from './pages/ChatHistory';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <AuthProvider>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Routes>
        {/* Always public */}
        <Route path="/" element={<SplashScreen />} />

        {/* Public-only: logged-in users are redirected to /home */}
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<Resetpassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Protected: must be logged in */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<ModeSelection onMenuToggle={() => setSidebarOpen(true)} />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/topic" element={<TopicList />} />
          <Route path="/passage" element={<PassageList />} />
          <Route path="/chat-history" element={<ChatHistory />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;