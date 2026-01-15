import React from 'react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

const ComplianceHistory: React.FC = () => {
  const history = [
    { date: 'Jan 15, 2024', action: 'KYC Verification', status: 'approved' as const, type: 'Verification' },
    { date: 'Jan 10, 2024', action: 'AML Screening', status: 'approved' as const, type: 'Screening' },
    { date: 'Dec 20, 2023', action: 'Document Upload', status: 'approved' as const, type: 'Document' },
    { date: 'Dec 18, 2023', action: 'Initial Registration', status: 'approved' as const, type: 'Registration' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-success-600 dark:text-success-400" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-warning-600 dark:text-warning-400" />;
      case 'rejected':
        return <AlertCircle className="w-4 h-4 text-danger-600 dark:text-danger-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Compliance History
      </h2>
      <div className="space-y-4">
        {history.map((item, index) => (
          <div
            key={index}
            className="flex items-start space-x-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="mt-0.5">
              {getStatusIcon(item.status)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {item.action}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {item.date}
                </span>
                <span className="text-xs px-2 py-0.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded">
                  {item.type}
                </span>
              </div>
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded ${
              item.status === 'approved'
                ? 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400'
                : item.status === 'pending'
                ? 'bg-warning-100 dark:bg-warning-900/30 text-warning-700 dark:text-warning-400'
                : 'bg-danger-100 dark:bg-danger-900/30 text-danger-700 dark:text-danger-400'
            }`}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplianceHistory;
