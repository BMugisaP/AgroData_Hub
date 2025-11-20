import { ReactNode, useState } from 'react';
import { Menu, X, Sprout, LogOut } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout?: () => void;
  isAuthenticated?: boolean;
}

export function Layout({ children, currentPage, onNavigate, onLogout, isAuthenticated }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', id: 'home' },
    { name: 'Varieties', id: 'varieties' },
    { name: 'Farming Guide', id: 'guide' },
    { name: 'Weather', id: 'weather' },
    { name: 'Pests & Diseases', id: 'pests' },
    { name: 'Market Prices', id: 'market' },
    { name: 'Processing', id: 'processing' },
  ];

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <div className="min-h-screen bg-light-beige">
      <nav className="bg-white shadow-lg sticky top-0 z-50 border-b-4 border-forest-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center cursor-pointer hover:opacity-80 transition-opacity" onClick={() => onNavigate('home')}>
              <Sprout className="h-8 w-8 text-forest-green" />
              <div className="ml-3">
                <span className="text-xl font-bold font-lora text-forest-green">AgroData</span>
                <span className="text-xs font-semibold text-cassava-brown block">Hub</span>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-forest-green text-white'
                      : 'text-gray-700 hover:bg-light-beige'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="ml-4 px-4 py-2 bg-cassava-brown text-white rounded-lg text-sm font-medium hover:bg-cassava-brown-dark transition-colors flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              )}
            </div>

            <div className="md:hidden flex items-center space-x-2">
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="p-2 text-cassava-brown hover:bg-light-beige rounded-lg"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              )}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-forest-green"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-base font-medium ${
                    currentPage === item.id
                      ? 'bg-forest-green text-white'
                      : 'text-gray-700 hover:bg-light-beige'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-forest-green text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold font-lora text-lg mb-3">AgroData Hub</h3>
              <p className="text-forest-green-light text-sm">
                Empowering cassava farmers with knowledge, tools, and resources for sustainable agriculture.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-forest-green-light">
                <li><button onClick={() => onNavigate('guide')} className="hover:text-white transition-colors">Farming Guide</button></li>
                <li><button onClick={() => onNavigate('varieties')} className="hover:text-white transition-colors">Varieties</button></li>
                <li><button onClick={() => onNavigate('market')} className="hover:text-white transition-colors">Market Info</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-forest-green-light">
                <li><button onClick={() => onNavigate('pests')} className="hover:text-white transition-colors">Pest Management</button></li>
                <li><button onClick={() => onNavigate('processing')} className="hover:text-white transition-colors">Processing</button></li>
                <li><button onClick={() => onNavigate('weather')} className="hover:text-white transition-colors">Weather</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-forest-green-light pt-6 text-center text-forest-green-light text-sm">
            <p>© 2024 AgroData Hub. Transforming Ugandan Agriculture.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
