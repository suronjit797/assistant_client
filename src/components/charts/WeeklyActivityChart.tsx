import React from 'react';
import { Bar } from 'react-chartjs-2';
import '@/utils/chartSetup';

interface WeeklyActivityChartProps {
  className?: string;
}

const WeeklyActivityChart: React.FC<WeeklyActivityChartProps> = ({ className = '' }) => {
  // Mock data - replace with real data from your API
  const mockData = {
    productivity: [85, 78, 92, 88, 95, 75, 82],
    tasksCompleted: [12, 8, 15, 11, 18, 6, 14],
  };

  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Productivity %',
        data: mockData.productivity,
        backgroundColor: 'rgba(59, 130, 246, 0.8)', // blue-500
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
        hoverBackgroundColor: 'rgba(59, 130, 246, 0.9)',
        hoverBorderColor: 'rgba(59, 130, 246, 1)',
        yAxisID: 'y',
      },
      {
        label: 'Tasks Completed',
        data: mockData.tasksCompleted,
        backgroundColor: 'rgba(16, 185, 129, 0.8)', // emerald-500
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
        borderRadius: 8,
        borderSkipped: false,
        hoverBackgroundColor: 'rgba(16, 185, 129, 0.9)',
        hoverBorderColor: 'rgba(16, 185, 129, 1)',
        yAxisID: 'y1',
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
          pointStyle: 'rect',
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
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        beginAtZero: true,
        max: 100,
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
          callback: function(value: any) {
            return value + '%';
          },
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        beginAtZero: true,
        grid: {
          drawOnChartArea: false,
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
    animation: {
      duration: 1000,
      easing: 'easeInOutCubic' as const,
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  };

  return (
    <div className={`${className}`}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default WeeklyActivityChart;
