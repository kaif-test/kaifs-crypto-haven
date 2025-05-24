import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

const Landing = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 dark:from-gray-900 dark:via-gray-800 dark:to-black">
      {/* Header */}
      <header className="w-full p-4 md:p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-white">Kaif's Treasure</h1>
          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-9 h-9 text-white hover:bg-white/20 hover:text-white"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:bg-white/20 hover:text-white font-semibold px-3 md:px-4 py-2"
              onClick={() => navigate('/auth')}
            >
              Login
            </Button>
            <Button 
              className="bg-white text-blue-900 hover:bg-gray-100 border-2 border-white font-semibold px-3 md:px-6 py-2"
              onClick={() => navigate('/auth')}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side - Hero content */}
          <div className="text-white space-y-6 md:space-y-8 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Trade Crypto & Stocks
              <span className="block text-blue-400">Like a Pro</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
              Real-time market data, professional charts, and powerful portfolio management tools. 
              Start your trading journey with Kaif's Treasure today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 md:px-8 py-3 text-base md:text-lg border-2 border-blue-600 hover:border-blue-700"
                onClick={() => navigate('/auth')}
              >
                Get Started Free
              </Button>
              <Button 
                size="lg" 
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-blue-900 font-bold px-6 md:px-8 py-3 text-base md:text-lg transition-all duration-200"
                onClick={() => {
                  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right side - Feature showcase */}
          <div className="hidden lg:block">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 md:p-8 border border-white/20">
              <h3 className="text-white text-xl md:text-2xl font-bold mb-4 md:mb-6">Live Market Preview</h3>
              <div className="space-y-3 md:space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Bitcoin (BTC)</span>
                  <span className="text-green-400 font-bold">$43,520.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Ethereum (ETH)</span>
                  <span className="text-green-400 font-bold">$3,150.50</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Apple (AAPL)</span>
                  <span className="text-red-400 font-bold">$175.43</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Why Choose Kaif's Treasure?</h3>
          <p className="text-gray-300 text-base md:text-lg">Professional trading tools at your fingertips</p>
        </div>
        
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <div className="text-center group">
            <div className="bg-blue-600 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
              <span className="text-white text-xl md:text-2xl">📈</span>
            </div>
            <h4 className="text-lg md:text-xl font-semibold text-white mb-2">Real-time Data</h4>
            <p className="text-gray-300 text-sm md:text-base">Live market data from trusted sources with instant updates</p>
          </div>
          <div className="text-center group">
            <div className="bg-purple-600 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
              <span className="text-white text-xl md:text-2xl">💼</span>
            </div>
            <h4 className="text-lg md:text-xl font-semibold text-white mb-2">Portfolio Management</h4>
            <p className="text-gray-300 text-sm md:text-base">Track your investments and analyze performance</p>
          </div>
          <div className="text-center group sm:col-span-2 md:col-span-1">
            <div className="bg-indigo-600 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
              <span className="text-white text-xl md:text-2xl">🔒</span>
            </div>
            <h4 className="text-lg md:text-xl font-semibold text-white mb-2">Secure & Trusted</h4>
            <p className="text-gray-300 text-sm md:text-base">Bank-level security with multiple authentication options</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/20 mt-16 md:mt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="text-center text-gray-400">
            <p className="text-sm md:text-base">&copy; 2024 Kaif's Treasure. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
