import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Matched':
      case 'matched':
      case 'Accepted':
      case 'accepted':
      case 'Approved':
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'Completed':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
      case 'rejected':
      case 'Cancelled':
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Unavailable':
        return 'bg-gray-100 text-gray-800';
      case 'Critical':
        return 'bg-red-200 text-red-900';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
        status
      )}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;

