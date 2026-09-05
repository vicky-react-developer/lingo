import React, { useState } from 'react';
import { Routes, Route } from 'react-router';

import PublicRoutes from './PublicRoutes';
import ProtectedRoutes from './ProtectedRoutes';
import AdminProtectedRoutes from './AdminProtectedRoutes';

import Login from '../pages/Login';
import SplashScreen from '../pages/SplashScreen';
import ForgotPassword from '../pages/ForgotPassword';
import Register from '../pages/Register';
import ChatPage from '../pages/ChatPage';
import Home from '../pages/Home';
import TopicList from '../pages/TopicList';
import PassageList from '../pages/PassageList';
import Resetpassword from '../pages/Resetpassword';
import NotFound from '../pages/NotFound';
import ChatHistory from '../pages/ChatHistory';
import MyProfile from '../pages/Myprofile';
import ChangePassword from '../pages/ChangePassword';
import TaskList from '../pages/TaskList';
import FunctionalTask from '../pages/FunctionalTask';
import StoryTranslation from '../pages/StoryTranslation';
import HistoryCategory from '../pages/HistoryCategory';
import Modes from '../pages/Modes';

import AdminLogin from '../pages/admin/AdminLogin';
import Users from '../pages/admin/Users';
import Students from '../pages/admin/Students';

import UserLayout from '../layouts/UserLayout';
import AdminLayout from '../layouts/Adminlayout';

export default function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<SplashScreen />} />

                <Route path="/admin/login" element={<AdminLogin />} />

                <Route element={<PublicRoutes />}>
                    <Route element={<UserLayout />} >
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/reset-password" element={<Resetpassword />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                    </Route>
                </Route>

                <Route element={<ProtectedRoutes />}>
                    <Route element={<UserLayout />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/chat" element={<ChatPage />} />
                        <Route path="/topic" element={<TopicList />} />
                        <Route path="/passage" element={<PassageList />} />
                        <Route path="/chat-history" element={<ChatHistory />} />
                        <Route path="/profile" element={<MyProfile />} />
                        <Route path="/change-password" element={<ChangePassword />} />
                        <Route path="/task-list" element={<TaskList />} />
                        <Route path="/functional-task/:taskId" element={<FunctionalTask />} />
                        <Route path="/modes" element={<Modes />} />
                        <Route path="/story-translation" element={<StoryTranslation />} />
                        <Route path="/history-category" element={<HistoryCategory />} />
                    </Route>
                </Route>

                <Route element={<AdminProtectedRoutes />}>
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<Users />} />
                        <Route path="students" element={<Students />} />
                    </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </>

    )
}