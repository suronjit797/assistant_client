import React from 'react';
import { Line } from 'react-chartjs-2';
import '@/utils/chartSetup';

interface ActivityTrendChartProps {
  className?: string;
}

const ActivityTrendChart: React.FC<ActivityTrendChartProps> = ({ className = '' }) => {
  // Mock data - replace with real data from your API
  const mockData = {
    tasks: [12, 19, 15, 25, 22, 30, 28, 35, 32, 38, 42, 45],
    transactions: [8, 12, 10, 15, 18, 20, 25, 22, 28, 30, 35, 38],
    events: [3, 5, 4, 8, 6, 9, 7, 10, 8, 12, 15, 18],
  };

  const labels = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const data = {
    labels,
    datasets: [
      {
        label: 'Tasks',
        data: mockData.tasks,
        borderColor: 'rgba(59, 130, 246, 1)', // blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: 'Transactions',
        data: mockData.transactions,
        borderColor: 'rgba(16, 185, 129, 1)', // emerald-500
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(16, 185, 129, 1)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: 'Events',
        data: mockData.events,
        borderColor: 'rgba(168, 85, 247, 1)', // purple-500
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(168, 85, 247, 1)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'end' as const,
        labels: {
          font: {
            size: 12,
            family: 'Inter, sans-serif',
          },
          color: '#374151',
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(59, 130, 246, 0.3)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        displayColors: true,
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
            family: 'Inter, sans-serif',
          },
          color: '#6b7280',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
            family: 'Inter, sans-serif',
          },
          color: '#6b7280',
          padding: 10,
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutCubic' as const,
    },
  };

  return (
    <div className={`${className}`}>
      <Line data={data} options={options} />
    </div>
  );
};

export default ActivityTrendChart;
