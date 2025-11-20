import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Varieties } from './pages/Varieties';
import { FarmingGuide } from './pages/FarmingGuide';
import { PestsDiseases } from './pages/PestsDiseases';
import { MarketPrices } from './pages/MarketPrices';
import { Processing } from './pages/Processing';
import { Weather } from './pages/Weather';
import { FarmerAuth } from './pages/FarmerAuth';
import { AdminAuth } from './pages/AdminAuth';
import { AdminDashboard } from './pages/AdminDashboard';
import { supabase } from './lib/supabase';
import { getUserRole } from './lib/auth';

type User = { id: string; email?: string } | null;

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<User>(null);
  const [userRole, setUserRole] = useState<'farmer' | 'admin' | null>(null);
  const [authType, setAuthType] = useState<'none' | 'farmer' | 'admin'>('none');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user || null);

      if (user) {
        const role = await getUserRole(user.id);
        setUserRole(role as 'farmer' | 'admin');
        setAuthType(role === 'admin' ? 'admin' : 'farmer');
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserRole(null);
    setAuthType('none');
    setCurrentPage('home');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-light-beige flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-green mx-auto mb-4"></div>
          <p className="text-gray-600">Loading AgroData Hub...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (authType === 'farmer' || (authType === 'none' && currentPage.startsWith('farmer'))) {
      return (
        <FarmerAuth
          onAuthSuccess={() => { checkAuthStatus(); setCurrentPage('home'); }}
          onBack={() => setAuthType('none')}
          onGuestMode={() => {
            setAuthType('none');
            setCurrentPage('home');
          }}
        />
      );
    }
    if (authType === 'admin' || (authType === 'none' && currentPage.startsWith('admin'))) {
      return (
        <AdminAuth
          onAuthSuccess={() => { checkAuthStatus(); setCurrentPage('home'); }}
          onBack={() => setAuthType('none')}
          onGuestMode={() => {
            setAuthType('none');
            setCurrentPage('home');
          }}
        />
      );
    }

    return (
      <div className="min-h-screen bg-light-beige flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold font-lora text-forest-green mb-4">AgroData Hub</h1>
            <p className="text-xl text-gray-700 mb-8">Choose how you want to access AgroData Hub</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <button
              onClick={() => setAuthType('farmer')}
              className="card p-8 hover:shadow-2xl transition-shadow cursor-pointer transform hover:-translate-y-2"
            >
              <div className="text-5xl mb-4">🚜</div>
              <h2 className="text-2xl font-bold font-lora text-forest-green mb-3">Farmer Portal</h2>
              <p className="text-gray-600 mb-6">
                Access farming guides, market prices, weather forecasts, and pest management tools to improve your cassava yield.
              </p>
              <div className="text-forest-green font-semibold">Sign In / Register →</div>
            </button>

            <button
              onClick={() => setAuthType('admin')}
              className="card p-8 hover:shadow-2xl transition-shadow cursor-pointer transform hover:-translate-y-2 border-2 border-cassava-brown"
            >
              <div className="text-5xl mb-4">⚙️</div>
              <h2 className="text-2xl font-bold font-lora text-cassava-brown mb-3">Admin Portal</h2>
              <p className="text-gray-600 mb-6">
                Manage content, update market prices, monitor system performance, and support the farming community.
              </p>
              <div className="text-cassava-brown font-semibold">Sign In / Register →</div>
            </button>
          </div>

          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold font-lora text-forest-green mb-4">Browse as Guest</h3>
            <p className="text-gray-600 mb-6">
              You can still explore our farming resources, varieties, and guides without creating an account. Click on any page in the menu to get started.
            </p>
            <button
              onClick={() => setCurrentPage('guide')}
              className="btn-primary"
            >
              Explore Farming Guide →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (userRole === 'admin' && currentPage === 'admin-dashboard') {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'varieties':
        return <Varieties />;
      case 'guide':
        return <FarmingGuide />;
      case 'weather':
        return <Weather />;
      case 'pests':
        return <PestsDiseases />;
      case 'market':
        return <MarketPrices />;
      case 'processing':
        return <Processing />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout
      currentPage={currentPage}
      onNavigate={(page) => {
        if (userRole === 'admin' && page === 'admin') {
          setCurrentPage('admin-dashboard');
        } else {
          setCurrentPage(page);
        }
      }}
      onLogout={handleLogout}
      isAuthenticated={!!user}
    >
      {renderPage()}
    </Layout>
  );
}

export default App;
