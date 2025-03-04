"use client";

import React from "react";
import { useGetProjectStatusStatsQuery } from "@/redux/slices/projectApiSlice";

interface StatCardProps {
  title: string;
  value?: number;
  color: string;
}

const Dashboard: React.FC = () => {
  const {
    data: statsData,
    isLoading,
    isError,
  } = useGetProjectStatusStatsQuery();

  const stats = statsData?.data;

  const StatCard: React.FC<StatCardProps> = ({ title, value = 0, color }) => {
    return (
      <div className={`p-6 rounded-lg text-white shadow-md ${color}`}>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    );
  };

  return (
    <div>
      <main className="flex-1 p-6 bg-gray-100 min-h-screen w-full">
        <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>

        {isLoading ? (
          <p className="text-gray-600">Loading...</p>
        ) : isError ? (
          <p className="text-red-500">Failed to load statistics.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Total Projects"
              value={stats?.total}
              color="bg-blue-500"
            />

            <StatCard
              title="Completed Projects"
              value={stats?.Completed}
              color="bg-green-500"
            />

            <StatCard
              title="Pending Projects"
              value={stats?.Pending}
              color="bg-yellow-500"
            />

            <StatCard
              title="In-progress Projects"
              value={stats?.Ongoing}
              color="bg-purple-500"
            />

            <StatCard
              title="Delayed Projects"
              value={stats?.Delayed}
              color="bg-red-500"
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
