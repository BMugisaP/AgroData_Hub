import { useEffect, useState } from 'react';
import { Cloud, Droplets, Wind, MapPin, Sun, CloudRain, CloudSnow } from 'lucide-react';

interface WeatherData {
  location: string;
  current: {
    temp: number;
    humidity: number;
    description: string;
    rainChance: number;
    windSpeed: number;
  };
  forecast: Array<{
    date: string;
    temp_max: number;
    temp_min: number;
    description: string;
  }>;
}

interface UgandaLocation {
  name: string;
  lat: number;
  lon: number;
  region: string;
}

const ugandaLocations: UgandaLocation[] = [
  { name: 'Kampala', lat: 0.3476, lon: 32.5825, region: 'Central' },
  { name: 'Mbale', lat: 1.0467, lon: 34.1867, region: 'Eastern' },
  { name: 'Gulu', lat: 2.7674, lon: 32.2903, region: 'Northern' },
  { name: 'Mbarara', lat: -0.6117, lon: 29.7283, region: 'Western' },
  { name: 'Fort Portal', lat: 0.6710, lon: 30.2692, region: 'Western' },
  { name: 'Soroti', lat: 1.7125, lon: 33.5873, region: 'Eastern' },
  { name: 'Masaka', lat: -0.3281, lon: 31.7382, region: 'Central' },
  { name: 'Kabale', lat: -1.2500, lon: 29.9833, region: 'Southwest' },
];

export function Weather() {
  const [selectedLocation, setSelectedLocation] = useState<UgandaLocation>(ugandaLocations[0]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeather(selectedLocation);
  }, [selectedLocation]);

  const fetchWeather = async (location: UgandaLocation) => {
    setLoading(true);
    setError(null);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(
        `${supabaseUrl}/functions/v1/weather_forecast`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lat: location.lat,
            lon: location.lon,
            location: location.name,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error fetching weather');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes('rain')) return <CloudRain className="h-12 w-12 text-blue-500" />;
    if (desc.includes('cloud')) return <Cloud className="h-12 w-12 text-gray-500" />;
    if (desc.includes('clear') || desc.includes('sunny')) return <Sun className="h-12 w-12 text-yellow-500" />;
    if (desc.includes('snow')) return <CloudSnow className="h-12 w-12 text-blue-300" />;
    return <Cloud className="h-12 w-12 text-gray-400" />;
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="section-title">Weather Forecast</h1>
        <p className="section-subtitle">
          Live weather data for Uganda agricultural regions. Plan your farming activities based on real-time conditions.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ugandaLocations.map((location) => (
          <button
            key={location.name}
            onClick={() => setSelectedLocation(location)}
            className={`p-4 rounded-lg font-medium transition-all ${
              selectedLocation.name === location.name
                ? 'bg-forest-green text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-light-beige shadow'
            }`}
          >
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{location.name}</span>
            </div>
            <div className="text-xs mt-1 opacity-75">{location.region}</div>
          </button>
        ))}
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-forest-green"></div>
          <p className="text-gray-600 mt-4">Loading weather data...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700">
          <p className="font-semibold mb-2">Error fetching weather</p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {weather && !loading && (
        <>
          <div className="bg-gradient-to-br from-forest-green to-forest-green-light rounded-xl shadow-lg p-8 text-white">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-4xl font-bold font-lora mb-2">{weather.location}</h2>
                <p className="text-forest-green-light text-lg">{weather.current.description}</p>
              </div>
              <div className="text-6xl font-bold">{weather.current.temp}°C</div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                <div className="flex items-center space-x-2 mb-2">
                  <Droplets className="h-5 w-5" />
                  <span className="text-sm opacity-75">Humidity</span>
                </div>
                <div className="text-2xl font-bold">{weather.current.humidity}%</div>
              </div>

              <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                <div className="flex items-center space-x-2 mb-2">
                  <CloudRain className="h-5 w-5" />
                  <span className="text-sm opacity-75">Rain Chance</span>
                </div>
                <div className="text-2xl font-bold">{weather.current.rainChance}%</div>
              </div>

              <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                <div className="flex items-center space-x-2 mb-2">
                  <Wind className="h-5 w-5" />
                  <span className="text-sm opacity-75">Wind Speed</span>
                </div>
                <div className="text-2xl font-bold">{weather.current.windSpeed} km/h</div>
              </div>

              <div className="bg-white/10 rounded-lg p-4 backdrop-blur">
                <div className="flex items-center space-x-2 mb-2">
                  <Sun className="h-5 w-5" />
                  <span className="text-sm opacity-75">Condition</span>
                </div>
                <div className="text-xl font-bold capitalize">{weather.current.description}</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold font-lora text-forest-green mb-6">5-Day Forecast</h3>
            <div className="grid md:grid-cols-5 gap-4">
              {weather.forecast.map((day, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-b from-light-beige to-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
                >
                  <p className="font-semibold text-gray-700 mb-3">{day.date}</p>
                  <div className="flex justify-center mb-3">
                    {getWeatherIcon(day.description)}
                  </div>
                  <p className="text-sm text-gray-600 mb-3 capitalize">{day.description}</p>
                  <div className="space-y-2">
                    <div className="text-lg font-bold text-forest-green">
                      {day.temp_max}°C
                    </div>
                    <div className="text-sm text-gray-500">
                      {day.temp_min}°C
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-forest-green rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold font-lora mb-4">Farming Recommendations</h3>
              <ul className="space-y-3 text-sm">
                {weather.current.description.toLowerCase().includes('rain') ? (
                  <>
                    <li>✓ Good conditions for weeding and fertilizer application</li>
                    <li>✓ Avoid harvesting during heavy rain</li>
                    <li>✓ Ensure proper drainage to prevent root rot</li>
                  </>
                ) : weather.current.humidity > 70 ? (
                  <>
                    <li>✓ Monitor for pests and diseases</li>
                    <li>✓ Apply fungicides if needed</li>
                    <li>✓ Ensure good air circulation</li>
                  </>
                ) : (
                  <>
                    <li>✓ Consider irrigation if soil is dry</li>
                    <li>✓ Good time for planting</li>
                    <li>✓ Water early morning or late evening</li>
                  </>
                )}
              </ul>
            </div>

            <div className="bg-maize-yellow rounded-xl p-6 text-gray-900">
              <h3 className="text-xl font-bold font-lora mb-4">Current Conditions Alert</h3>
              <div className="space-y-3 text-sm">
                {weather.current.windSpeed > 20 && (
                  <div className="bg-white/50 p-3 rounded-lg">
                    <span className="font-semibold">⚠️ High Winds:</span> Secure crops and avoid pesticide application
                  </div>
                )}
                {weather.current.humidity > 85 && (
                  <div className="bg-white/50 p-3 rounded-lg">
                    <span className="font-semibold">⚠️ High Humidity:</span> Risk of fungal diseases - monitor closely
                  </div>
                )}
                {weather.current.rainChance > 80 && (
                  <div className="bg-white/50 p-3 rounded-lg">
                    <span className="font-semibold">⚠️ Heavy Rain Expected:</span> Prepare fields for drainage
                  </div>
                )}
                {weather.current.rainChance < 20 && weather.current.humidity < 60 && (
                  <div className="bg-white/50 p-3 rounded-lg">
                    <span className="font-semibold">💧 Low Moisture:</span> Plan irrigation activities
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
