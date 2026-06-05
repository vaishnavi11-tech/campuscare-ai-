function StatusBadge({ status }) {
  const config = {
    pending: {
      color: "bg-yellow-100 text-yellow-700",
      text: "🟡 Pending",
    },
    "in-progress": {
      color: "bg-blue-100 text-blue-700",
      text: "🔵 In Progress",
    },
    resolved: {
      color: "bg-green-100 text-green-700",
      text: "🟢 Resolved",
    },
  };

  const badge = config[status];

  // fallback for unknown status values
  if (!badge) {
    return (
      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-600">
        Unknown
      </span>
    );
  }

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${badge.color}`}>
      {badge.text}
    </span>
  );
}

export default StatusBadge;