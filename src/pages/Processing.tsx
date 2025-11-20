import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';
import { Factory, Clock, Package, Wrench } from 'lucide-react';

type ProcessingMethod = Database['public']['Tables']['processing_methods']['Row'];

export function Processing() {
  const [methods, setMethods] = useState<ProcessingMethod[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState<ProcessingMethod | null>(null);

  useEffect(() => {
    fetchProcessingMethods();
  }, []);

  const fetchProcessingMethods = async () => {
    try {
      const { data, error } = await supabase
        .from('processing_methods')
        .select('*')
        .order('method_name');

      if (error) throw error;
      setMethods(data || []);
      if (data && data.length > 0) {
        setSelectedMethod(data[0]);
      }
    } catch (error) {
      console.error('Error fetching processing methods:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-600">Loading processing methods...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Cassava Processing Methods</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Add value to your cassava by processing it into various products with longer shelf life and higher market prices.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {methods.map((method) => (
          <button
            key={method.id}
            onClick={() => setSelectedMethod(method)}
            className={`text-left p-4 rounded-lg border-2 transition-all ${
              selectedMethod?.id === method.id
                ? 'border-green-600 bg-green-50'
                : 'border-gray-200 bg-white hover:border-green-300'
            }`}
          >
            <Factory className={`h-6 w-6 mb-2 ${selectedMethod?.id === method.id ? 'text-green-600' : 'text-gray-600'}`} />
            <h3 className="font-bold text-gray-900">{method.method_name}</h3>
            <p className="text-sm text-gray-600 mt-1">{method.product_output}</p>
          </button>
        ))}
      </div>

      {selectedMethod && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-8 text-white">
            <div className="flex items-center space-x-4">
              <Factory className="h-12 w-12" />
              <div>
                <h2 className="text-3xl font-bold">{selectedMethod.method_name}</h2>
                <p className="text-orange-100 mt-1 text-lg">{selectedMethod.product_output}</p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-6">
            {selectedMethod.description && (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{selectedMethod.description}</p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {selectedMethod.processing_time && (
                <div className="bg-blue-50 rounded-lg p-5">
                  <div className="flex items-center space-x-3 mb-2">
                    <Clock className="h-6 w-6 text-blue-600" />
                    <h3 className="font-bold text-gray-900">Processing Time</h3>
                  </div>
                  <p className="text-gray-700">{selectedMethod.processing_time}</p>
                </div>
              )}

              {selectedMethod.equipment_needed && (
                <div className="bg-purple-50 rounded-lg p-5">
                  <div className="flex items-center space-x-3 mb-2">
                    <Wrench className="h-6 w-6 text-purple-600" />
                    <h3 className="font-bold text-gray-900">Equipment Needed</h3>
                  </div>
                  <p className="text-gray-700">{selectedMethod.equipment_needed}</p>
                </div>
              )}
            </div>

            {selectedMethod.steps && (
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Package className="h-6 w-6 text-green-600" />
                  <h3 className="text-xl font-bold text-gray-900">Processing Steps</h3>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-3">
                    {selectedMethod.steps.split('\1').map((step, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </div>
                        <p className="text-gray-700 pt-1">{step.replace(/^\d+\.\s*/, '')}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl p-6 text-white">
          <h3 className="text-xl font-bold mb-3">Benefits of Processing</h3>
          <ul className="space-y-2">
            <li>• Extend product shelf life from days to months</li>
            <li>• Command higher prices in the market</li>
            <li>• Reduce post-harvest losses significantly</li>
            <li>• Create year-round income opportunities</li>
            <li>• Access industrial and export markets</li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
          <h3 className="text-xl font-bold mb-3">Quality Standards</h3>
          <ul className="space-y-2">
            <li>• Use fresh, healthy cassava roots</li>
            <li>• Maintain hygiene throughout processing</li>
            <li>• Ensure proper drying to prevent mold</li>
            <li>• Store products in clean, dry conditions</li>
            <li>• Follow food safety regulations</li>
          </ul>
        </div>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-600 p-6 rounded-lg">
        <h3 className="font-bold text-gray-900 mb-3">Getting Started with Processing</h3>
        <p className="text-gray-700 mb-3">
          Start small with basic processing methods like cassava chips or flour production. As you gain experience
          and capital, expand to more sophisticated processing methods like starch extraction or gari production.
        </p>
        <p className="text-gray-700">
          Consider joining or forming a cooperative to share processing equipment costs and access larger markets together.
        </p>
      </div>
    </div>
  );
}
