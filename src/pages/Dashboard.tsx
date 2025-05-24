
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Header from '@/components/dashboard/Header';
import MarketOverview from '@/components/dashboard/MarketOverview';
import Portfolio from '@/components/dashboard/Portfolio';
import WatchList from '@/components/dashboard/WatchList';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name || 'Trader'}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Track your investments and discover new opportunities
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left side - Market data */}
          <div className="lg:col-span-2 space-y-8">
            <MarketOverview />
            <WatchList />
          </div>

          {/* Right side - Portfolio */}
          <div>
            <Portfolio />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
