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

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold ${config[status]?.color}`}
    >
      {config[status]?.text}
    </span>
  );
}

export default StatusBadge;