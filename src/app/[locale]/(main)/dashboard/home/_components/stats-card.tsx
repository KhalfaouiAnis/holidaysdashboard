"use client"

import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

export function StatsCard({ title, totalBookings, totalRevenue, IN_PROGRESS, FAILED, ACCEPTED }: BookingCardStat) {
  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className={`text-2xl font-semibold tabular-nums @[250px]/card:text-3xl ${FAILED ? 'text-red-400' : 'text-green-500'}`}>
          {totalRevenue && formatCurrency(totalRevenue)}
          {totalBookings && totalBookings}
          {
            IN_PROGRESS && (IN_PROGRESS ?? 0)
          }
          {
            ACCEPTED && (ACCEPTED ?? 0)
          }
          {
            FAILED && (FAILED ?? 0)
          }
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <TrendingUp />
            +12.5%
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          Trending up this month <TrendingUp className="size-4" />
        </div>
        <div className="text-muted-foreground">Visitors for the last 6 months</div>
      </CardFooter>
    </Card>
  );
}
