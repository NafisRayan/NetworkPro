import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface DataPoint {
  label: string;
  value: number;
}

interface BarChartProps {
  data: DataPoint[];
  title: string;
  colors?: string[];
}

const BarChart: React.FC<BarChartProps> = ({ 
  data, 
  title,
  colors = ['#0077B5', '#2867B2', '#00A36C', '#F5A623', '#D54C4C'] 
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
          type: 'bar',
          data: {
            labels: data.map(item => item.label),
            datasets: [{
              label: title,
              data: data.map(item => item.value),
              backgroundColor: data.map((_, index) => 
                colors[index % colors.length]
              ),
              borderRadius: 4,
              maxBarThickness: 40,
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
  }, [data, title, colors]);

  return (
    <div className="h-64 w-full">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default BarChart;