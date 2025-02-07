import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { ActivityLog } from "@prisma/client";

export function ActivityCard({ activity }: { activity: ActivityLog }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <p className="font-medium">{activity.action}</p>
            <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
              <span>{formatDate(activity.createdAt)}</span>
              <span>{activity.userId || "Système"}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
