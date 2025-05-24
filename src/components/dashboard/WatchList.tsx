
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface WatchListItem {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  type: 'crypto' | 'stock';
}

const WatchList = () => {
  const [watchList, setWatchList] = useState<WatchListItem[]>([
    {
      id: '1',
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 43500,
      change: -500,
      changePercent: -1.14,
      type: 'crypto'
    },
    {
      id: '2',
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      price: 248.79,
      change: 12.45,
      changePercent: 5.26,
      type: 'stock'
    }
  ]);

  const [newSymbol, setNewSymbol] = useState('');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage >= 0 ? '+' : ''}${percentage.toFixed(2)}%`;
  };

  const addToWatchList = () => {
    if (newSymbol.trim()) {
      // Mock data for demo - replace with real API call
      const newItem: WatchListItem = {
        id: Date.now().toString(),
        symbol: newSymbol.toUpperCase(),
        name: `${newSymbol.toUpperCase()} Name`,
        price: Math.random() * 1000,
        change: (Math.random() - 0.5) * 50,
        changePercent: (Math.random() - 0.5) * 10,
        type: 'crypto'
      };
      setWatchList(prev => [...prev, newItem]);
      setNewSymbol('');
    }
  };

  const removeFromWatchList = (id: string) => {
    setWatchList(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Watchlist</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Add new symbol */}
          <div className="flex gap-2">
            <Input
              placeholder="Add symbol (e.g., BTC, AAPL)"
              value={newSymbol}
              onChange={(e) => setNewSymbol(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addToWatchList()}
            />
            <Button onClick={addToWatchList}>Add</Button>
          </div>

          {/* Watchlist items */}
          <div className="space-y-3">
            {watchList.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-semibold">{item.symbol}</div>
                    <div className="text-sm text-gray-500">{item.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-semibold">{formatPrice(item.price)}</div>
                    <div className={`text-sm ${item.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatPercentage(item.changePercent)}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeFromWatchList(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {watchList.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No items in your watchlist. Add some symbols to track!
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WatchList;
