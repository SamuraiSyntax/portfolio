"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  clients: {
    label: "Clients",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type ChartData = {
  month: string;
  clients: number;
};

export function ChartBarDashboard({ chartData }: { chartData: ChartData[] }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Statistiques mensuelles</CardTitle>
        <CardDescription>
          Nombre de clients par mois de janvier à juin 2024
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-0 pr-4 w-full">
        <ChartContainer config={chartConfig} className="w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
              interval={0}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="clients" fill="var(--color-clients)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
