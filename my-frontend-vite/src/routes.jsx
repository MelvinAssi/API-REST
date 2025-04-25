import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

import HomePage from './pages/HomePage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AdminPage from './pages/AdminPage.jsx';

const AppRoutes = () => {

    return (
        <>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/profile" element={ <ProtectedRoute><ProfilePage /></ProtectedRoute>}/>
            <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
        </Routes>
        </>
    )
}
export default AppRoutes;