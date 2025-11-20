import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';
import { Leaf, Clock, TrendingUp, MapPin, Shield, Droplet } from 'lucide-react';

type Variety = Database['public']['Tables']['cassava_varieties']['Row'];

export function Varieties() {
  const [varieties, setVarieties] = useState<Variety[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    fetchVarieties();
  }, []);

  const fetchVarieties = async () => {
    try {
      const { data, error } = await supabase
        .from('cassava_varieties')
        .select('*')
        .order('name');

      if (error) throw error;
      setVarieties(data || []);
    } catch (error) {
      console.error('Error fetching varieties:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredVarieties = selectedType === 'all'
    ? varieties
    : varieties.filter(v => v.type.toLowerCase() === selectedType.toLowerCase());

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-600">Loading varieties...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Cassava Varieties</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore different cassava varieties to find the best fit for your farm's conditions and goals.
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
          All Varieties
        </button>
        <button
          onClick={() => setSelectedType('sweet')}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            selectedType === 'sweet'
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700 hover:bg-green-50'
          }`}
        >
          Sweet Cassava
        </button>
        <button
          onClick={() => setSelectedType('bitter')}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            selectedType === 'bitter'
              ? 'bg-green-600 text-white'
              : 'bg-white text-gray-700 hover:bg-green-50'
          }`}
        >
          Bitter Cassava
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredVarieties.map((variety) => (
          <div key={variety.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold">{variety.name}</h3>
                  <p className="text-green-100 mt-1">{variety.type} Cassava</p>
                </div>
                <Leaf className="h-8 w-8 opacity-80" />
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-gray-700">{variety.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Yield Rate</div>
                    <div className="text-sm text-gray-600">{variety.yield_rate}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Maturity</div>
                    <div className="text-sm text-gray-600">{variety.maturity_period}</div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 col-span-2">
                  <MapPin className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">Suitable Soil</div>
                    <div className="text-sm text-gray-600">{variety.suitable_soil}</div>
                  </div>
                </div>
              </div>

              {(variety.is_disease_resistant || variety.is_drought_tolerant) && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {variety.is_disease_resistant && (
                    <div className="flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                      <Shield className="h-4 w-4" />
                      <span>Disease Resistant</span>
                    </div>
                  )}
                  {variety.is_drought_tolerant && (
                    <div className="flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                      <Droplet className="h-4 w-4" />
                      <span>Drought Tolerant</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredVarieties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No varieties found for the selected filter.</p>
        </div>
      )}
    </div>
  );
}
