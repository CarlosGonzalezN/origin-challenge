import React from "react";
import { FiAlertCircle } from "react-icons/fi";

const ErrorComponent: React.FC = () => {
  const message = "Oops a ocurrido un error";
  return (
    <div className="bg-red-500 text-white px-4 py-2 rounded-md flex items-center">
      <FiAlertCircle className="mr-2" size={20} />
      <p>{message}</p>
    </div>
  );
};

export default ErrorComponent;
