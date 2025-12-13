import React from "react";
import { FiCheckCircle, FiX, FiAlertTriangle, FiInfo } from "react-icons/fi";

const Alert = ({ type = "success", message, onClose, className = "" }) => {
  const getAlertStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          text: "text-green-800",
          icon: <FiCheckCircle className="w-5 h-5 text-green-600" />,
        };
      case "error":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          text: "text-red-800",
          icon: <FiAlertTriangle className="w-5 h-5 text-red-600" />,
        };
      case "warning":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          text: "text-yellow-800",
          icon: <FiAlertTriangle className="w-5 h-5 text-yellow-600" />,
        };
      case "info":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          text: "text-blue-800",
          icon: <FiInfo className="w-5 h-5 text-blue-600" />,
        };
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-200",
          text: "text-gray-800",
          icon: <FiInfo className="w-5 h-5 text-gray-600" />,
        };
    }
  };

  const styles = getAlertStyles();

  return (
    <div
      className={`mb-6 ${styles.bg} border ${styles.border} ${styles.text} px-6 py-4 rounded-xl shadow-sm animate-fade-in flex items-start space-x-3 ${className}`}
    >
      <div className="flex-shrink-0 mt-0.5">{styles.icon}</div>
      <div className="flex-1">
        <p className="font-medium">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <FiX className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;
