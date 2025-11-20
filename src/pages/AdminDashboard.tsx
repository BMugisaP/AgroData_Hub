import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';
import { Plus, Edit2, Trash2, LogOut, BarChart3, FileText } from 'lucide-react';
import { signOut } from '../lib/auth';

type Variety = Database['public']['Tables']['cassava_varieties']['Row'];
type Guide = Database['public']['Tables']['farming_guides']['Row'];
type PestDisease = Database['public']['Tables']['pests_diseases']['Row'];
type Fertilizer = Database['public']['Tables']['fertilizers']['Row'];
type ProcessingMethod = Database['public']['Tables']['processing_methods']['Row'];

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'varieties' | 'guides' | 'pests' | 'fertilizers' | 'processing' | 'prices'>('varieties');
  const [varieties, setVarieties] = useState<Variety[]>([]);
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    details: '',
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'varieties') {
        const { data } = await supabase.from('cassava_varieties').select('*');
        setVarieties(data || []);
      } else if (activeTab === 'guides') {
        const { data } = await supabase.from('farming_guides').select('*');
        setGuides(data || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    onLogout();
  };

  const handleDelete = async (id: string, table: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const { error } = await supabase.from(table).delete().eq('id', id);
      if (error) throw error;

      if (table === 'cassava_varieties') {
        setVarieties(varieties.filter(v => v.id !== id));
      } else if (table === 'farming_guides') {
        setGuides(guides.filter(g => g.id !== id));
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  return (
    <div className="min-h-screen bg-light-beige">
      <nav className="bg-cassava-brown text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold font-lora">AgroData Hub Admin</h1>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-cassava-brown-dark hover:bg-cassava-brown-dark px-4 py-2 rounded-lg transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-6 gap-4 mb-8">
          {[
            { id: 'varieties', label: 'Varieties', icon: '🌾' },
            { id: 'guides', label: 'Guides', icon: '📖' },
            { id: 'pests', label: 'Pests & Diseases', icon: '🐛' },
            { id: 'fertilizers', label: 'Fertilizers', icon: '🌱' },
            { id: 'processing', label: 'Processing', icon: '🏭' },
            { id: 'prices', label: 'Market Prices', icon: '💰' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`p-4 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-forest-green text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              <div className="text-2xl mb-2">{tab.icon}</div>
              <div className="text-sm">{tab.label}</div>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold font-lora text-forest-green">
              {activeTab === 'varieties' && 'Cassava Varieties'}
              {activeTab === 'guides' && 'Farming Guides'}
              {activeTab === 'pests' && 'Pests & Diseases'}
              {activeTab === 'fertilizers' && 'Fertilizers'}
              {activeTab === 'processing' && 'Processing Methods'}
              {activeTab === 'prices' && 'Market Prices'}
            </h2>
            {(activeTab === 'varieties' || activeTab === 'guides') && (
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Add New</span>
              </button>
            )}
          </div>

          {showAddForm && activeTab === 'varieties' && (
            <div className="bg-light-beige p-6 rounded-lg mb-6 border-2 border-forest-green">
              <h3 className="font-bold text-lg mb-4">Add New Variety</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Variety Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                />
                <textarea
                  placeholder="Description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green h-24"
                />
                <button className="btn-primary w-full">Save Variety</button>
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-8 text-gray-600">Loading...</div>
          ) : activeTab === 'varieties' ? (
            <div className="space-y-4">
              {varieties.map((variety) => (
                <div key={variety.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:bg-light-beige transition-colors">
                  <div>
                    <h3 className="font-bold text-lg">{variety.name}</h3>
                    <p className="text-sm text-gray-600">{variety.type} - {variety.yield_rate}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(variety.id, 'cassava_varieties')}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : activeTab === 'guides' ? (
            <div className="space-y-4">
              {guides.map((guide) => (
                <div key={guide.id} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:bg-light-beige transition-colors">
                  <div>
                    <h3 className="font-bold text-lg">{guide.title}</h3>
                    <p className="text-sm text-gray-600 capitalize">{guide.category}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Edit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(guide.id, 'farming_guides')}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600">
              <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-30" />
              <p>This section is coming soon</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
