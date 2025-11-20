import { useState } from 'react';
import { LogIn, UserPlus, Mail, Lock, User, ArrowLeft, Globe } from 'lucide-react';
import { signInWithEmail, signUpFarmer } from '../lib/auth';

interface FarmerAuthProps {
  onAuthSuccess: () => void;
  onBack: () => void;
  onGuestMode: () => void;
}

export function FarmerAuth({ onAuthSuccess, onBack, onGuestMode }: FarmerAuthProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        const result = await signUpFarmer(
          formData.email,
          formData.password,
          formData.fullName
        );

        if (!result.success) {
          setError(result.error instanceof Error ? result.error.message : 'Sign up failed');
        } else {
          onAuthSuccess();
        }
      } else {
        const result = await signInWithEmail(formData.email, formData.password);

        if (!result.success) {
          setError(result.error instanceof Error ? result.error.message : 'Sign in failed');
        } else {
          onAuthSuccess();
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-beige to-white flex items-center justify-center p-4 relative">
      <div className="absolute top-6 left-6 flex gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-forest-green font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back</span>
        </button>
      </div>

      <div className="absolute top-6 right-6">
        <button
          onClick={onGuestMode}
          className="flex items-center gap-2 px-4 py-2 bg-maize-yellow text-gray-900 rounded-lg hover:bg-opacity-90 transition-colors font-medium"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">Guest Mode</span>
        </button>
      </div>

      <div className="w-full max-w-md">
        <div className="card p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-forest-green rounded-full mb-4">
              <span className="text-2xl font-bold text-white">🌾</span>
            </div>
            <h1 className="text-3xl font-bold font-lora text-forest-green mb-2">
              Farmer Portal
            </h1>
            <p className="text-gray-600">
              {isSignUp ? 'Create your farm account' : 'Welcome back to AgroData Hub'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline h-4 w-4 mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                  placeholder="Your full name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="inline h-4 w-4 mr-2" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Lock className="inline h-4 w-4 mr-2" />
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                placeholder="••••••••"
              />
            </div>

            {isSignUp && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Lock className="inline h-4 w-4 mr-2" />
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-forest-green"
                  placeholder="••••••••"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50"
            >
              {loading ? (
                'Processing...'
              ) : isSignUp ? (
                <>
                  <UserPlus className="inline h-4 w-4 mr-2" />
                  Create Account
                </>
              ) : (
                <>
                  <LogIn className="inline h-4 w-4 mr-2" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            </p>
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError(null);
                setFormData({ email: '', password: '', fullName: '', confirmPassword: '' });
              }}
              className="mt-2 text-forest-green font-semibold hover:text-forest-green-light transition-colors"
            >
              {isSignUp ? 'Sign In' : 'Create Account'}
            </button>
          </div>
        </div>

        <p className="text-center text-gray-600 text-sm mt-6">
          Access farming guides, market prices, and pest management tools
        </p>
      </div>
    </div>
  );
}
