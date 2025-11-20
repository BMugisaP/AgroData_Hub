import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';
import { Bug, AlertTriangle, Shield, Eye } from 'lucide-react';

type PestDisease = Database['public']['Tables']['pests_diseases']['Row'];

export function PestsDiseases() {
  const [pestsAndDiseases, setPestsAndDiseases] = useState<PestDisease[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    fetchPestsAndDiseases();
  }, []);

  const fetchPestsAndDiseases = async () => {
    try {
      const { data, error } = await supabase
        .from('pests_diseases')
        .select('*')
        .order('name');

      if (error) throw error;
      setPestsAndDiseases(data || []);
    } catch (error) {
      console.error('Error fetching pests and diseases:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = selectedType === 'all'
    ? pestsAndDiseases
    : pestsAndDiseases.filter(item => item.type === selectedType);

  const getSeverityColor = (severity: string | null) => {
    switch (severity?.toLowerCase()) {
      case 'very high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-600">Loading pests and diseases information...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Pests & Diseases Management</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Identify and manage common cassava pests and diseases to protect your crop and maximize yield.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={() => setSelectedType('all')}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            selectedType === 'all'
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700 hover:bg-green-50'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setSelectedType('pest')}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            selectedType === 'pest'
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700 hover:bg-green-50'
          }`}
        >
          Pests Only
        </button>
        <button
          onClick={() => setSelectedType('disease')}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            selectedType === 'disease'
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700 hover:bg-green-50'
          }`}
        >
          Diseases Only
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className={`p-6 ${item.type === 'pest' ? 'bg-gradient-to-r from-orange-500 to-red-500' : 'bg-gradient-to-r from-red-500 to-rose-500'} text-white`}>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{item.name}</h3>
                  <p className="text-white/90 mt-1 capitalize">{item.type}</p>
                </div>
                {item.type === 'pest' ? (
                  <Bug className="h-8 w-8 opacity-80" />
                ) : (
                  <AlertTriangle className="h-8 w-8 opacity-80" />
                )}
              </div>
              {item.severity_level && (
                <div className="mt-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(item.severity_level)}`}>
                    Severity: {item.severity_level}
                  </span>
                </div>
              )}
            </div>

            <div className="p-6 space-y-4">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Eye className="h-5 w-5 text-gray-700" />
                  <h4 className="font-bold text-gray-900">Symptoms</h4>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{item.symptoms}</p>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <h4 className="font-bold text-gray-900">Control Measures</h4>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{item.control_measures}</p>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-blue-600" />
                  <h4 className="font-bold text-gray-900">Prevention</h4>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{item.prevention}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No items found for the selected filter.</p>
        </div>
      )}

      <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg">
        <h3 className="font-bold text-gray-900 mb-2">Prevention Tips</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Use certified disease-free planting material</li>
          <li>• Practice crop rotation to break pest and disease cycles</li>
          <li>• Maintain field hygiene by removing infected plants immediately</li>
          <li>• Monitor your fields regularly for early detection</li>
          <li>• Choose resistant varieties when available</li>
          <li>• Avoid working in fields when plants are wet</li>
        </ul>
      </div>
    </div>
  );
}
