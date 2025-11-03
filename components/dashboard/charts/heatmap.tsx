import { Fragment } from "react";

import { Card } from "@/components/ui/card";

const hours = ["8a", "10a", "12p", "2p", "4p", "6p"];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const intensities = [0.1, 0.3, 0.6, 0.8, 1];

export function ActivityHeatmap() {
  return (
    <Card className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">Activity heatmap</h3>
        <p className="text-sm text-slate-500">Email + call activity by day and hour</p>
      </div>
      <div className="grid grid-cols-[80px_repeat(6,minmax(0,1fr))] gap-2 text-sm">
        <div />
        {hours.map((hour) => (
          <div key={hour} className="text-center text-xs text-slate-500">
            {hour}
          </div>
        ))}
        {days.map((day) => (
          <Fragment key={day}>
            <div className="text-right text-xs font-medium text-slate-500">{day}</div>
            {hours.map((hour, index) => (
              <div
                key={`${day}-${hour}`}
                className="h-10 rounded-lg"
                style={{
                  backgroundColor: `rgba(31, 122, 236, ${intensities[(index + day.length) % intensities.length]})`
                }}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </Card>
  );
}
