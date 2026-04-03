import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import AuthPage from './pages/AuthPage'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import { useEffect } from 'react'
import axios from 'axios'
import useAuthStore from './store/authStore'
import NewLogin from './pages/NewLogin'
import Generate from './pages/Generate'
import Navbar from './components/Navbar'
import { Toaster } from "react-hot-toast";

function App() {

    const setUser = useAuthStore(state => state.setUser);
    const logout = useAuthStore(state => state.logout);
    const user = useAuthStore(state => state.user);
    const setLoading = useAuthStore(state => state.setLoading);
    const loading = useAuthStore(state => state.loading);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/dashboard`, { withCredentials: true });
                setUser(data.user);
            } catch (err) {
                logout();
            } finally {
                setLoading(false)
            }
        }
        fetchUser();
    }, [logout, setUser])

    return (
        <>
            {loading ?
                <div>
                    <h1>LOADING!!!!</h1>
                </div>
                :
                <BrowserRouter>
                    <Toaster position="top-right" />
                    <Routes>
                        <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />} />

                        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <AuthPage />} />

                        <Route path="/dashboard" element={
                            <ProtectedRoute>
                                <Navbar />
                                <Dashboard />
                            </ProtectedRoute>
                        }
                        />

                        <Route path="/dashboard/newlogin" element={
                            <ProtectedRoute>
                                <Navbar />
                                <NewLogin />
                            </ProtectedRoute>
                        }
                        />

                        <Route path="/dashboard/generate" element={
                            <ProtectedRoute>
                                <Navbar />
                                <Generate />
                            </ProtectedRoute>
                        }
                        />

                    </Routes>
                </BrowserRouter>

            }
        </>
    )
}

export default App
