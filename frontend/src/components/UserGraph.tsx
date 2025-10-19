import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { UserStats } from "../types";

interface UserGraphProps {
  data: UserStats[];
}

export const UserGraph: React.FC<UserGraphProps> = ({ data }) => {
  const now = new Date();
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date();
    date.setDate(now.getDate() - (6 - i));
    const dateStr = date.toISOString().split("T")[0];
    const stat = data.find((s) => s.date === dateStr);
    return { date: dateStr, count: stat ? stat.count : 0 };
  });

  return (
    <div className="user-graph">
      <h3>Users Created (Last 7 Days)</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={last7Days}
          margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #ccc",
              borderRadius: "6px",
            }}
            labelStyle={{ fontWeight: "bold" }}
          />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="count"
            name="Users"
            stroke="#9b59b6"
            strokeWidth={3}
            dot={{ r: 5, fill: "#9b59b6", stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
