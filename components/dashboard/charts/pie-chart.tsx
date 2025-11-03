"use client";

import { useEffect } from "react";
import { Pie } from "react-chartjs-2";

import { Card } from "@/components/ui/card";
import { initializeCharts } from "@/lib/utils/charts";

interface PieChartProps {
  title: string;
  labels: string[];
  values: number[];
}

export function PieChart({ title, labels, values }: PieChartProps) {
  useEffect(() => {
    initializeCharts();
  }, []);

  return (
    <Card className="space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <Pie
        data={{
          labels,
          datasets: [
            {
              data: values,
              backgroundColor: ["#1f7aec", "#94a3b8", "#f97316", "#10b981", "#6366f1"],
              borderWidth: 0
            }
          ]
        }}
        options={{
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                color: "#334155"
              }
            }
          }
        }}
      />
    </Card>
  );
}
