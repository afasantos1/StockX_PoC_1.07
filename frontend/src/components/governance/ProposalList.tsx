import React from 'react';
import { motion } from 'framer-motion';
import { Vote, Clock, CheckCircle, XCircle, Users } from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';

interface ProposalListProps {
  status: 'active' | 'passed';
}

const ProposalList: React.FC<ProposalListProps> = ({ status }) => {
  const { isConnected } = useWallet();

  const proposals = status === 'active' ? [
    {
      id: '1',
      title: 'Increase Transaction Fee to 0.15%',
      description: 'Proposal to increase transaction fees from 0.1% to 0.15% to support platform development and sustainability.',
      proposer: '0x1234...5678',
      votesFor: 1250000,
      votesAgainst: 450000,
      quorum: 1500000,
      startTime: Date.now() - 86400000 * 2, // 2 days ago
      endTime: Date.now() + 86400000 * 5, // 5 days from now
      status: 'active' as const,
    },
    {
      id: '2',
      title: 'Add Support for New Token Standard',
      description: 'Proposal to integrate ERC-1400 standard for enhanced security token functionality.',
      proposer: '0xabcd...efgh',
      votesFor: 850000,
      votesAgainst: 320000,
      quorum: 1500000,
      startTime: Date.now() - 86400000,
      endTime: Date.now() + 86400000 * 6,
      status: 'active' as const,
    },
  ] : [
    {
      id: '3',
      title: 'Implement New Matching Algorithm',
      description: 'Proposal to upgrade the matching engine with improved price-time priority algorithm.',
      proposer: '0x9876...5432',
      votesFor: 2100000,
      votesAgainst: 680000,
      quorum: 1500000,
      startTime: Date.now() - 86400000 * 14,
      endTime: Date.now() - 86400000 * 7,
      status: 'passed' as const,
    },
  ];

  const getVotingProgress = (votesFor: number, votesAgainst: number, quorum: number) => {
    const totalVotes = votesFor + votesAgainst;
    return (totalVotes / quorum) * 100;
  };

  const getTimeRemaining = (endTime: number) => {
    const diff = endTime - Date.now();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (days > 0) return `${days} days ${hours} hours`;
    if (hours > 0) return `${hours} hours`;
    return 'Ended';
  };

  return (
    <div className="space-y-4">
      {proposals.map((proposal, index) => {
        const progress = getVotingProgress(proposal.votesFor, proposal.votesAgainst, proposal.quorum);
        const isPassing = proposal.votesFor > proposal.votesAgainst;
        const totalVotes = proposal.votesFor + proposal.votesAgainst;

        return (
          <motion.div
            key={proposal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {proposal.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {proposal.description}
                </p>
                <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                  <span>Proposed by: {proposal.proposer}</span>
                  {status === 'active' && (
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{getTimeRemaining(proposal.endTime)}</span>
                    </div>
                  )}
                </div>
              </div>
              {status === 'active' ? (
                <div className="flex items-center space-x-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                  <Clock className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  <span className="text-sm font-medium text-primary-700 dark:text-primary-400">
                    Active
                  </span>
                </div>
              ) : (
                <div className="flex items-center space-x-1 px-3 py-1 bg-success-100 dark:bg-success-900/30 rounded-full">
                  <CheckCircle className="w-4 h-4 text-success-600 dark:text-success-400" />
                  <span className="text-sm font-medium text-success-700 dark:text-success-400">
                    Passed
                  </span>
                </div>
              )}
            </div>

            {/* Voting Progress */}
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Voting Progress</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {totalVotes.toLocaleString()} / {proposal.quorum.toLocaleString()} tokens
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      isPassing ? 'bg-success-500' : 'bg-danger-500'
                    }`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-success-50 dark:bg-success-900/20 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4 text-success-600 dark:text-success-400" />
                      <span className="text-sm font-medium text-success-700 dark:text-success-400">
                        For
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {proposal.votesFor.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {totalVotes > 0 ? ((proposal.votesFor / totalVotes) * 100).toFixed(1) : 0}%
                  </p>
                </div>
                <div className="p-3 bg-danger-50 dark:bg-danger-900/20 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-1">
                      <XCircle className="w-4 h-4 text-danger-600 dark:text-danger-400" />
                      <span className="text-sm font-medium text-danger-700 dark:text-danger-400">
                        Against
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">
                      {proposal.votesAgainst.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {totalVotes > 0 ? ((proposal.votesAgainst / totalVotes) * 100).toFixed(1) : 0}%
                  </p>
                </div>
              </div>

              {status === 'active' && isConnected && (
                <div className="flex space-x-3 pt-2">
                  <button className="flex-1 btn-primary flex items-center justify-center space-x-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Vote For</span>
                  </button>
                  <button className="flex-1 bg-danger-600 hover:bg-danger-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                    <XCircle className="w-4 h-4" />
                    <span>Vote Against</span>
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProposalList;
