import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthPage from './pages/AuthPage';
import Desktop from './components/Desktop';
import LandingPage from './landing/LandingPage';
import PricingPage from './landing/pages/PricingPage';

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-white/10 border-t-blue-500 rounded-full animate-spin"></div>
          <span className="text-white/30 text-sm">Loading BigBrainsOS...</span>
        </div>
      </div>
    );
  }

  const handleLoginSuccess = () => {
    try {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(err => {
          console.warn('Fullscreen request failed:', err);
        });
      }
    } catch (e) {
      console.error('Fullscreen API not supported', e);
    }
  };

  if (!user) {
    return <AuthPage onSuccess={handleLoginSuccess} />;
  }

  return <Desktop />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/os" element={
            <div className="w-screen h-screen overflow-hidden">
              <AppContent />
            </div>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
