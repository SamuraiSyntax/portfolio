"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

interface KPIData {
  label: string;
  value: number;
  previousValue: number;
  unit?: string;
  icon: React.ElementType;
}

interface DetailedKPIsProps {
  data: KPIData[];
}

export function DetailedKPIs({ data }: DetailedKPIsProps) {
  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return 100;
    return ((current - previous) / previous) * 100;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map((kpi, index) => {
        const change = calculateChange(kpi.value, kpi.previousValue);
        const Icon = kpi.icon;

        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.label}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-1">
                <div className="text-2xl font-bold">
                  {kpi.value}
                  {kpi.unit && <span className="text-sm ml-1">{kpi.unit}</span>}
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={change >= 0 ? "default" : "destructive"}
                    className="flex items-center gap-1"
                  >
                    {change >= 0 ? (
                      <ArrowUp className="h-3 w-3" />
                    ) : (
                      <ArrowDown className="h-3 w-3" />
                    )}
                    {Math.abs(change).toFixed(1)}%
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    vs période précédente
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
