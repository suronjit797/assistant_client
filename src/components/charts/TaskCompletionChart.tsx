import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import '@/utils/chartSetup';

interface TaskCompletionChartProps {
  completed: number;
  pending: number;
  className?: string;
}

const TaskCompletionChart: React.FC<TaskCompletionChartProps> = ({ 
  completed, 
  pending, 
  className = '' 
}) => {
  const data = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: [completed, pending],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)', // emerald-500
          'rgba(249, 115, 22, 0.8)',  // orange-500
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(249, 115, 22, 1)',
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          'rgba(16, 185, 129, 0.9)',
          'rgba(249, 115, 22, 0.9)',
        ],
        hoverBorderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(249, 115, 22, 1)',
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
        position: 'bottom' as const,
        labels: {
          padding: 20,
          font: {
            size: 12,
            family: 'Inter, sans-serif',
          },
          color: '#374151',
          usePointStyle: true,
          pointStyle: 'circle',
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
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          }
        }
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
    cutout: '60%',
  };

  return (
    <div className={`relative ${className}`}>
      <Doughnut data={data} options={options} />
      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800">{completed + pending}</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">Total Tasks</div>
        </div>
      </div>
    </div>
  );
};

export default TaskCompletionChart;
