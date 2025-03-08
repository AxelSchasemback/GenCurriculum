import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { getCurrentUser, getSession } from './utils/supabase';

// Páginas
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import ResumeView from './pages/ResumeView';
import ResumeBuilder from './pages/ResumeBuilder';
import TemplateGallery from './pages/TemplateGallery';
import TemplatePreview from './pages/TemplatePreview';
import TemplateScreenshotGenerator from './components/TemplateScreenshotGenerator';

// Componentes
import Header from './components/Header';
import Footer from './components/Footer';

// Rutas protegidas
const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { user: currentUser } = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { session: currentSession } = await getSession();
        setSession(currentSession);
      } catch (error) {
        console.error('Error al verificar sesión:', error);
      }
    };

    checkSession();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header session={session} onSessionChange={setSession} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
            {/* Rutas protegidas */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/resume/:id" element={
              <ProtectedRoute>
                <ResumeView />
              </ProtectedRoute>
            } />
            
            <Route path="/builder" element={
              <ProtectedRoute>
                <ResumeBuilder />
              </ProtectedRoute>
            } />
            
            <Route path="/templates" element={<TemplateGallery />} />
            <Route path="/preview/:templateId" element={<TemplatePreview />} />
            <Route path="/admin/screenshot-generator" element={<TemplateScreenshotGenerator />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
