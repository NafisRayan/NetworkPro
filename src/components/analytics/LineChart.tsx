import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface DataPoint {
  label: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  title: string;
  color?: string;
  fill?: boolean;
}

const LineChart: React.FC<LineChartProps> = ({ 
  data, 
  title, 
  color = '#0077B5', 
  fill = true 
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      
      if (ctx) {
        chartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: data.map(item => item.label),
            datasets: [{
              label: title,
              data: data.map(item => item.value),
              borderColor: color,
              backgroundColor: fill ? `${color}20` : 'transparent',
              fill: fill,
              tension: 0.4,
              borderWidth: 2,
              pointRadius: 3,
              pointBackgroundColor: color,
              pointBorderColor: '#fff',
              pointBorderWidth: 1,
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: '#fff',
                titleColor: '#283E4A',
                bodyColor: '#283E4A',
                borderColor: '#E5E5E5',
                borderWidth: 1,
                padding: 10,
                cornerRadius: 4,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  color: '#808080',
                  font: {
                    size: 11,
                  },
                }
              },
              y: {
                beginAtZero: true,
                grid: {
                  color: '#E5E5E5',
                },
                ticks: {
                  color: '#808080',
                  font: {
                    size: 11,
                  },
                }
              }
            }
          }
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, title, color, fill]);

  return (
    <div className="h-64 w-full">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default LineChart;