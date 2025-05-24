
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PortfolioItem {
  id: string;
  symbol: string;
  name: string;
  amount: number;
  purchasePrice: number;
  currentPrice: number;
  type: 'crypto' | 'stock';
}

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([
    {
      id: '1',
      symbol: 'BTC',
      name: 'Bitcoin',
      amount: 0.5,
      purchasePrice: 45000,
      currentPrice: 43500,
      type: 'crypto'
    },
    {
      id: '2',
      symbol: 'ETH',
      name: 'Ethereum',
      amount: 2.5,
      purchasePrice: 3200,
      currentPrice: 3100,
      type: 'crypto'
    },
    {
      id: '3',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      amount: 10,
      purchasePrice: 170,
      currentPrice: 175.43,
      type: 'stock'
    }
  ]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const calculatePnL = (item: PortfolioItem) => {
    const totalValue = item.amount * item.currentPrice;
    const totalCost = item.amount * item.purchasePrice;
    const pnl = totalValue - totalCost;
    const pnlPercentage = ((pnl / totalCost) * 100);
    return { pnl, pnlPercentage, totalValue };
  };

  const getTotalPortfolioValue = () => {
    return portfolio.reduce((total, item) => {
      const { totalValue } = calculatePnL(item);
      return total + totalValue;
    }, 0);
  };

  const getTotalPnL = () => {
    return portfolio.reduce((total, item) => {
      const { pnl } = calculatePnL(item);
      return total + pnl;
    }, 0);
  };

  const totalValue = getTotalPortfolioValue();
  const totalPnL = getTotalPnL();
  const totalPnLPercentage = (totalPnL / (totalValue - totalPnL)) * 100;

  return (
    <div className="space-y-6">
      {/* Portfolio Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="text-2xl font-bold">{formatPrice(totalValue)}</div>
              <div className="text-sm text-gray-500">Total Value</div>
            </div>
            <div className={`text-lg font-semibold ${totalPnL >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totalPnL >= 0 ? '+' : ''}{formatPrice(totalPnL)}
              <span className="text-sm ml-2">
                ({totalPnLPercentage >= 0 ? '+' : ''}{totalPnLPercentage.toFixed(2)}%)
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Holdings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Your Holdings
            <Button size="sm">Add Position</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {portfolio.map((item) => {
              const { pnl, pnlPercentage, totalValue } = calculatePnL(item);
              
              return (
                <div key={item.id} className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-semibold">{item.symbol}</div>
                        <div className="text-sm text-gray-500">{item.name}</div>
                      </div>
                      <Badge variant={item.type === 'crypto' ? 'default' : 'secondary'}>
                        {item.type}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{formatPrice(totalValue)}</div>
                      <div className={`text-sm ${pnl >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {pnl >= 0 ? '+' : ''}{formatPrice(pnl)} ({pnlPercentage >= 0 ? '+' : ''}{pnlPercentage.toFixed(2)}%)
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 space-y-1">
                    <div>Amount: {item.amount} {item.symbol}</div>
                    <div>Avg. Price: {formatPrice(item.purchasePrice)}</div>
                    <div>Current: {formatPrice(item.currentPrice)}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Button className="w-full" variant="outline">
              Add to Watchlist
            </Button>
            <Button className="w-full" variant="outline">
              Set Price Alert
            </Button>
            <Button className="w-full" variant="outline">
              View Performance
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Portfolio;
