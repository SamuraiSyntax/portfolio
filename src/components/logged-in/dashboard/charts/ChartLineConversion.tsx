"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ConversionData {
  month: string;
  newToQualified: number;
  qualifiedToOpportunity: number;
  opportunityToWon: number;
}

export function ChartLineConversion({ data }: { data: ConversionData[] }) {
  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Taux de conversion</CardTitle>
        <CardDescription>
          Évolution des taux de conversion par étape
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickFormatter={(value) => value.substring(0, 3)}
              />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip
                formatter={(value: number) => [`${value.toFixed(1)}%`]}
                labelFormatter={(label) => `Mois: ${label}`}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="newToQualified"
                name="Nouveau → Qualifié"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="qualifiedToOpportunity"
                name="Qualifié → Opportunité"
                stroke="#82ca9d"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="opportunityToWon"
                name="Opportunité → Gagné"
                stroke="#ffc658"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
