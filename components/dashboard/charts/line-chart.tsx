"use client";

import { useEffect } from "react";
import { Line } from "react-chartjs-2";

import { Card } from "@/components/ui/card";
import { initializeCharts } from "@/lib/utils/charts";

interface LineChartProps {
  title: string;
  labels: string[];
  datasetLabel: string;
  values: number[];
}

export function LineChart({ title, labels, datasetLabel, values }: LineChartProps) {
  useEffect(() => {
    initializeCharts();
  }, []);

  return (
    <Card className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500">Trailing 12 weeks</p>
      </div>
      <Line
        data={{
          labels,
          datasets: [
            {
              label: datasetLabel,
              data: values,
              fill: false,
              borderColor: "#1f7aec",
              backgroundColor: "#1f7aec",
              tension: 0.3
            }
          ]
        }}
        options={{
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: "#334155"
              }
            },
            x: {
              ticks: {
                color: "#94a3b8"
              }
            }
          }
        }}
      />
    </Card>
  );
}
