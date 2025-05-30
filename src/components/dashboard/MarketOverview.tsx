
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image: string;
}

interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

const MarketOverview = () => {
  const [cryptoData, setCryptoData] = useState<CoinData[]>([]);
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Mock stock data with more realistic price simulation
  const generateStockData = (): StockData[] => [
    { 
      symbol: 'AAPL', 
      name: 'Apple Inc.', 
      price: 175.43 + (Math.random() - 0.5) * 5, 
      change: (Math.random() - 0.5) * 8, 
      changePercent: (Math.random() - 0.5) * 4 
    },
    { 
      symbol: 'GOOGL', 
      name: 'Alphabet Inc.', 
      price: 2734.15 + (Math.random() - 0.5) * 50, 
      change: (Math.random() - 0.5) * 30, 
      changePercent: (Math.random() - 0.5) * 2 
    },
    { 
      symbol: 'TSLA', 
      name: 'Tesla Inc.', 
      price: 248.79 + (Math.random() - 0.5) * 15, 
      change: (Math.random() - 0.5) * 20, 
      changePercent: (Math.random() - 0.5) * 6 
    },
    { 
      symbol: 'AMZN', 
      name: 'Amazon.com Inc.', 
      price: 3234.45 + (Math.random() - 0.5) * 80, 
      change: (Math.random() - 0.5) * 50, 
      changePercent: (Math.random() - 0.5) * 3 
    },
    { 
      symbol: 'MSFT', 
      name: 'Microsoft Corp.', 
      price: 334.75 + (Math.random() - 0.5) * 10, 
      change: (Math.random() - 0.5) * 8, 
      changePercent: (Math.random() - 0.5) * 2 
    },
  ];

  const fetchCryptoData = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      );
      const data = await response.json();
      setCryptoData(data);
    } catch (error) {
      console.error('Error fetching crypto data:', error);
    }
  };

  const updateData = () => {
    fetchCryptoData();
    setStockData(generateStockData());
    setLastUpdate(new Date());
  };

  useEffect(() => {
    updateData();
    setLoading(false);

    // Reduced polling time from 10 seconds to 3 seconds for more frequent updates
    const interval = setInterval(() => {
      updateData();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Last Update Indicator */}
      <div className="text-xs text-gray-500 text-center">
        Last updated: {lastUpdate.toLocaleTimeString()}
      </div>

      {/* Cryptocurrency Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🪙 Top Cryptocurrencies
            <Badge variant="secondary" className="animate-pulse bg-green-100 text-green-800">Live</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cryptoData.map((coin) => (
              <div key={coin.id} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 cursor-pointer">
                <div className="flex items-center gap-3">
                  <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                  <div>
                    <div className="font-semibold">{coin.name}</div>
                    <div className="text-sm text-gray-500 uppercase">{coin.symbol}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold transition-all duration-300">{formatPrice(coin.current_price)}</div>
                  <div className={`text-sm transition-all duration-300 ${coin.price_change_percentage_24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercentage(coin.price_change_percentage_24h)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stocks Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📈 Popular Stocks
            <Badge variant="secondary" className="animate-pulse bg-blue-100 text-blue-800">Live</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stockData.map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 cursor-pointer">
                <div>
                  <div className="font-semibold">{stock.symbol}</div>
                  <div className="text-sm text-gray-500">{stock.name}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold transition-all duration-300">{formatPrice(stock.price)}</div>
                  <div className={`text-sm transition-all duration-300 ${stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatPercentage(stock.changePercent)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketOverview;
