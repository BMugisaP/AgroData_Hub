import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';
import { BookOpen, ChevronRight } from 'lucide-react';

type Guide = Database['public']['Tables']['farming_guides']['Row'];
type Fertilizer = Database['public']['Tables']['fertilizers']['Row'];

export function FarmingGuide() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [fertilizers, setFertilizers] = useState<Fertilizer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('land_preparation');

  const categories = [
    { id: 'land_preparation', label: 'Land Preparation' },
    { id: 'planting', label: 'Planting Techniques' },
    { id: 'crop_management', label: 'Crop Management' },
    { id: 'irrigation', label: 'Irrigation' },
    { id: 'harvesting', label: 'Harvesting' },
    { id: 'post_harvest', label: 'Post-Harvest' }
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [guidesResponse, fertilizersResponse] = await Promise.all([
        supabase.from('farming_guides').select('*').order('order_index'),
        supabase.from('fertilizers').select('*')
      ]);

      if (guidesResponse.error) throw guidesResponse.error;
      if (fertilizersResponse.error) throw fertilizersResponse.error;

      setGuides(guidesResponse.data || []);
      setFertilizers(fertilizersResponse.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredGuides = guides.filter(g => g.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-600">Loading farming guides...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Cassava Farming Guide</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Complete step-by-step guide to successful cassava farming, from land preparation to harvest.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-4 gap-0">
          <div className="md:col-span-1 bg-gray-50 border-r border-gray-200">
            <div className="p-4 space-y-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-between ${
                    selectedCategory === category.id
                      ? 'bg-green-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span>{category.label}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-3 p-6">
            <div className="space-y-6">
              {filteredGuides.map((guide) => (
                <div key={guide.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex items-start space-x-3">
                    <BookOpen className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{guide.title}</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{guide.content}</p>
                    </div>
                  </div>
                </div>
              ))}

              {filteredGuides.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600">No guides available for this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedCategory === 'crop_management' && fertilizers.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended Fertilizers</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {fertilizers.map((fertilizer) => (
              <div key={fertilizer.id} className="border border-gray-200 rounded-lg p-5 hover:border-green-500 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{fertilizer.name}</h3>
                  <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {fertilizer.type}
                  </span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm font-medium text-gray-700">Application Method</div>
                    <div className="text-sm text-gray-600">{fertilizer.application_method}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">Recommended Quantity</div>
                    <div className="text-sm text-gray-600">{fertilizer.recommended_quantity}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">Timing</div>
                    <div className="text-sm text-gray-600">{fertilizer.application_timing}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">Benefits</div>
                    <div className="text-sm text-gray-600">{fertilizer.benefits}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
