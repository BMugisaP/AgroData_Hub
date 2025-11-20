import { Leaf, TrendingUp, Shield, BookOpen, Coins, Factory, Cloud } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const features = [
    {
      icon: Leaf,
      title: 'Cassava Varieties',
      description: 'Explore 6+ cassava varieties with detailed information on yield rates, maturity periods, and soil requirements.',
      page: 'varieties',
      bgColor: 'from-forest-green to-forest-green-light'
    },
    {
      icon: BookOpen,
      title: 'Farming Guide',
      description: 'Complete guides covering land preparation, planting techniques, crop management, and harvesting best practices.',
      page: 'guide',
      bgColor: 'from-forest-green-light to-cassava-brown'
    },
    {
      icon: Shield,
      title: 'Pests & Diseases',
      description: 'Identify and manage 8+ common cassava pests and diseases with proven control and prevention strategies.',
      page: 'pests',
      bgColor: 'from-cassava-brown to-cassava-brown-light'
    },
    {
      icon: Coins,
      title: 'Market Prices',
      description: 'Track current cassava prices in UGX across Uganda regions to make informed selling and trading decisions.',
      page: 'market',
      bgColor: 'from-maize-yellow to-maize-yellow-light'
    },
    {
      icon: Factory,
      title: 'Processing Methods',
      description: 'Learn 5+ processing techniques to transform cassava into flour, gari, starch, and other value-added products.',
      page: 'processing',
      bgColor: 'from-forest-green to-cassava-brown'
    },
    {
      icon: Cloud,
      title: 'Live Weather',
      description: 'Get real-time weather forecasts and farming recommendations for your region from OpenWeatherMap.',
      page: 'weather',
      bgColor: 'from-forest-green-light to-forest-green'
    }
  ];

  const stats = [
    { label: 'Cassava Varieties', value: '6+' },
    { label: 'Farming Guides', value: '20+' },
    { label: 'Pest Solutions', value: '8+' },
    { label: 'Processing Methods', value: '5+' }
  ];

  return (
    <div className="space-y-12">
      <section className="text-center space-y-4 py-8">
        <h1 className="section-title">
          Welcome to <span className="text-forest-green">AgroData Hub</span>
        </h1>
        <p className="section-subtitle">
          Your comprehensive digital resource for cassava farming excellence. From variety selection to market prices,
          we provide the knowledge and tools to maximize your harvest and profitability.
        </p>
      </section>

      <section className="card p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-forest-green font-lora">{stat.value}</div>
              <div className="text-sm text-gray-600 mt-2 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;

          return (
            <div
              key={index}
              onClick={() => onNavigate(feature.page)}
              className={`card p-6 hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-2 bg-gradient-to-br ${feature.bgColor} text-white`}
            >
              <Icon className="h-10 w-10 mb-4 opacity-90" />
              <h3 className="text-xl font-bold font-lora mb-2">{feature.title}</h3>
              <p className="text-white/90 text-sm leading-relaxed">{feature.description}</p>
            </div>
          );
        })}
      </section>

      <section className="bg-gradient-to-r from-forest-green via-cassava-brown to-forest-green rounded-xl shadow-lg p-8 text-white">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-bold font-lora">Why Cassava Farming Matters in Uganda</h2>
          <p className="text-lg opacity-95">
            Cassava is a vital food security crop, providing nutrition and income to millions of Ugandan farmers.
            It's extremely drought-tolerant, thrives in poor soils, and offers year-round harvest flexibility.
            With AgroData Hub's knowledge and proven techniques, cassava farming becomes highly profitable and sustainable.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold font-lora">25-30 tons</div>
              <div className="text-sm opacity-90 mt-1">Average yield per acre</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold font-lora">8-18 months</div>
              <div className="text-sm opacity-90 mt-1">Maturity period</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-white/20">
              <div className="text-2xl font-bold font-lora">Year-round</div>
              <div className="text-sm opacity-90 mt-1">Harvest flexibility</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
