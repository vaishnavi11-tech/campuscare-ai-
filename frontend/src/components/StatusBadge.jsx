function StatusBadge({ status }) {

  const getColor = () => {
    if (status === "pending") return "bg-yellow-500";
    if (status === "in-progress") return "bg-blue-500";
    if (status === "resolved") return "bg-green-500";

    return "bg-gray-500";
  };

  return (
    <span
      className={`text-white px-3 py-1 rounded-full text-sm ${getColor()}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;