"use client";

import { useEffect } from "react";
import { Bar } from "react-chartjs-2";

import { Card } from "@/components/ui/card";
import { initializeCharts } from "@/lib/utils/charts";

interface BarChartProps {
  title: string;
  labels: string[];
  values: number[];
}

export function BarChart({ title, labels, values }: BarChartProps) {
  useEffect(() => {
    initializeCharts();
  }, []);

  return (
    <Card className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: title,
              data: values,
              backgroundColor: "rgba(31, 122, 236, 0.7)",
              borderRadius: 8
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
