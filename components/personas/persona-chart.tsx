"use client";

import { useEffect } from "react";
import { Bar } from "react-chartjs-2";

import { Card } from "@/components/ui/card";
import { initializeCharts } from "@/lib/utils/charts";

export function PersonaChart() {
  useEffect(() => {
    initializeCharts();
  }, []);

  const labels = ["VP", "Director", "Manager", "IC"];
  const values = [28, 36, 22, 14];

  return (
    <Card className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">Titles engaged</h3>
        <p className="text-sm text-slate-500">Meetings and positive replies by persona tier.</p>
      </div>
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: "Responses",
              data: values,
              backgroundColor: "rgba(79, 70, 229, 0.7)",
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
