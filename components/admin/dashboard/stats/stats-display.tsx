interface StatsDisplayProps {
  stats: {
    totalContacts: number;
    recentContacts: number;
    contactsByStatus: Record<string, number>;
    contactsByPriority: Record<string, number>;
  };
}

export function StatsDisplay({ stats }: StatsDisplayProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Total des contacts</h3>
        <p className="text-2xl font-bold">{stats.totalContacts}</p>
      </div>
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Contacts récents (30j)</h3>
        <p className="text-2xl font-bold">{stats.recentContacts}</p>
      </div>
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Par statut</h3>
        {Object.entries(stats.contactsByStatus).map(([status, count]) => (
          <div key={status} className="flex justify-between">
            <span>{status}</span>
            <span>{count}</span>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <h3 className="text-lg font-semibold">Par priorité</h3>
        {Object.entries(stats.contactsByPriority).map(([priority, count]) => (
          <div key={priority} className="flex justify-between">
            <span>{priority}</span>
            <span>{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
