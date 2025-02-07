interface StatsTableProps {
  data: {
    newToInProgress: number;
    inProgressToCompleted: number;
    completedToArchived: number;
  };
}

export function StatsTable({ data }: StatsTableProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-sm font-medium">Nouveau → En cours</p>
          <p className="text-2xl font-bold">
            {data.newToInProgress.toFixed(1)}%
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">En cours → Complété</p>
          <p className="text-2xl font-bold">
            {data.inProgressToCompleted.toFixed(1)}%
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium">Complété → Archivé</p>
          <p className="text-2xl font-bold">
            {data.completedToArchived.toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}
