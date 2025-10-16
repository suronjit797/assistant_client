import React from 'react';
import { PolarArea } from 'react-chartjs-2';
import '@/utils/chartSetup';

interface FinancialOverviewChartProps {
  className?: string;
}

const FinancialOverviewChart: React.FC<FinancialOverviewChartProps> = ({ className = '' }) => {
  // Mock data - replace with real data from your API
  const mockData = {
    income: 4500,
    expenses: 2800,
    savings: 1200,
    investments: 800,
    entertainment: 600,
  };

  const data = {
    labels: ['Income', 'Expenses', 'Savings', 'Investments', 'Entertainment'],
    datasets: [
      {
        data: [
          mockData.income,
          mockData.expenses,
          mockData.savings,
          mockData.investments,
          mockData.entertainment,
        ],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',  // emerald-500
          'rgba(239, 68, 68, 0.8)',   // red-500
          'rgba(59, 130, 246, 0.8)',  // blue-500
          'rgba(168, 85, 247, 0.8)',  // purple-500
          'rgba(245, 158, 11, 0.8)',  // amber-500
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(245, 158, 11, 1)',
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          'rgba(16, 185, 129, 0.9)',
          'rgba(239, 68, 68, 0.9)',
          'rgba(59, 130, 246, 0.9)',
          'rgba(168, 85, 247, 0.9)',
          'rgba(245, 158, 11, 0.9)',
        ],
        hoverBorderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(245, 158, 11, 1)',
        ],
        hoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          font: {
            size: 12,
            family: 'Inter, sans-serif',
          },
          color: '#374151',
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 15,
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
        callbacks: {
          label: function(context: any) {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: $${context.parsed.toLocaleString()} (${percentage}%)`;
          }
        }
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 10,
            family: 'Inter, sans-serif',
          },
          color: '#6b7280',
          callback: function(value: any) {
            return '$' + (value / 1000).toFixed(0) + 'k';
          },
        },
        grid: {
          color: 'rgba(229, 231, 235, 0.3)',
        },
        angleLines: {
          color: 'rgba(229, 231, 235, 0.3)',
        },
        pointLabels: {
          font: {
            size: 11,
            family: 'Inter, sans-serif',
          },
          color: '#374151',
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
      easing: 'easeInOutCubic' as const,
    },
  };

  return (
    <div className={`${className}`}>
      <PolarArea data={data} options={options} />
    </div>
  );
};

export default FinancialOverviewChart;
