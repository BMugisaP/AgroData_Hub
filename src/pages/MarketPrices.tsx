import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';
import { MapPin, Calendar, TrendingUp, Coins } from 'lucide-react';

type MarketPrice = Database['public']['Tables']['market_prices']['Row'];

export function MarketPrices() {
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const { data, error } = await supabase
        .from('market_prices')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;
      setPrices(data || []);
    } catch (error) {
      console.error('Error fetching market prices:', error);
    } finally {
      setLoading(false);
    }
  };

  const regions = ['all', ...Array.from(new Set(prices.map(p => p.region).filter(Boolean)))];

  const filteredPrices = selectedRegion === 'all'
    ? prices
    : prices.filter(p => p.region === selectedRegion);

  const groupedPrices = filteredPrices.reduce((acc, price) => {
    if (!acc[price.product_type]) {
      acc[price.product_type] = [];
    }
    acc[price.product_type].push(price);
    return acc;
  }, {} as Record<string, MarketPrice[]>);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-600">Loading market prices...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Market Prices</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Stay updated with current cassava market prices across different regions to make informed selling decisions.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {regions.map((region) => (
          <button
            key={region}
            onClick={() => setSelectedRegion(region)}
            className={`px-6 py-2 rounded-full font-medium transition-colors capitalize ${
              selectedRegion === region
                ? 'bg-green-600 text-white'
                : 'bg-white text-gray-700 hover:bg-green-50'
            }`}
          >
            {region === 'all' ? 'All Regions' : region}
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        {Object.entries(groupedPrices).map(([productType, productPrices]) => (
          <div key={productType} className="card overflow-hidden">
            <div className="bg-gradient-to-r from-forest-green to-forest-green-light p-6 text-white">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-8 w-8" />
                <h2 className="text-2xl font-bold font-lora">{productType}</h2>
              </div>
            </div>

            <div className="p-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {productPrices.map((price) => (
                  <div key={price.id} className="border border-gray-200 rounded-lg p-4 hover:border-forest-green transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="text-3xl font-bold text-forest-green">
                          {(price.price_per_kg ? price.price_per_kg * 3600 : 0).toLocaleString('en-UG')} UGX
                        </div>
                        <div className="text-sm text-gray-600">per kg</div>
                      </div>
                      <Coins className="h-6 w-6 text-forest-green" />
                    </div>

                    <div className="space-y-2">
                      {price.market_name && (
                        <div className="flex items-center text-sm text-gray-700">
                          <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                          <span>{price.market_name}</span>
                        </div>
                      )}
                      {price.region && (
                        <div className="text-sm text-gray-600">
                          <span className="font-medium">Region:</span> {price.region}
                        </div>
                      )}
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{formatDate(price.date)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPrices.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg">
          <p className="text-gray-600">No market prices available for the selected region.</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
          <h3 className="font-bold text-gray-900 mb-3">Market Tips</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>• Compare prices across different markets before selling</li>
            <li>• Build relationships with regular buyers for better prices</li>
            <li>• Consider forming cooperatives to negotiate better prices</li>
            <li>• Track price trends to identify the best selling times</li>
          </ul>
        </div>

        <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg">
          <h3 className="font-bold text-gray-900 mb-3">Value Addition</h3>
          <ul className="space-y-2 text-gray-700 text-sm">
            <li>• Process cassava into flour for higher prices</li>
            <li>• Dried chips have longer shelf life and better margins</li>
            <li>• Starch production offers premium pricing</li>
            <li>• Consider export opportunities for processed products</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
