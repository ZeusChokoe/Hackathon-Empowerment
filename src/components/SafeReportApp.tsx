import { useState } from 'react';
import { SafeReportHome } from './safereport/SafeReportHome';
import { SafeReportReport } from './safereport/SafeReportReport';
import { SafeReportDonations } from './safereport/SafeReportDonations';
import { SafeReportNGO } from './safereport/SafeReportNGO';
import { SafeReportDAO } from './safereport/SafeReportDAO';
import { NavigationHeader } from './safereport/NavigationHeader';
import { VerificationSystem } from './safereport/VerificationSystem';
import { ReputationSystem } from './safereport/ReputationSystem';
import { useWallet } from '@/hooks/useWallet';

export interface Report {
  id: string;
  title: string;
  description: string;
  category: string;
  timestamp: Date;
  status: 'pending' | 'verified' | 'rejected' | 'flagged';
  needsFinancialAssistance: boolean;
  requestedAmount?: number;
  raisedAmount?: number;
  evidenceHash?: string;
  verificationScore?: number;
  flags?: string[];
}

export interface Donation {
  id: string;
  reportId: string;
  amount: number;
  donor: string;
  timestamp: Date;
}

export interface Vote {
  id: string;
  proposalId: string;
  voter: string;
  vote: 'approve' | 'reject';
  timestamp: Date;
}

export type SafeReportPage = 'home' | 'report' | 'donate' | 'ngo' | 'dao' | 'verification' | 'reputation';

const SafeReportApp = () => {
  const [currentPage, setCurrentPage] = useState<SafeReportPage>('home');
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      title: 'Workplace Harassment Case',
      description: 'Ongoing harassment by supervisor affecting work performance and mental health.',
      category: 'Workplace Abuse',
      timestamp: new Date('2024-01-15'),
      status: 'verified',
      needsFinancialAssistance: true,
      requestedAmount: 500,
      raisedAmount: 320,
      evidenceHash: '0x1234...abcd'
    },
    {
      id: '2',
      title: 'Domestic Violence Support Needed',
      description: 'Urgent financial assistance needed for temporary housing and legal fees.',
      category: 'Domestic Abuse',
      timestamp: new Date('2024-01-20'),
      status: 'verified',
      needsFinancialAssistance: true,
      requestedAmount: 1000,
      raisedAmount: 750,
      evidenceHash: '0x5678...efgh'
    },
    {
      id: '3',
      title: 'Street Harassment Incident',
      description: 'Reported incident for pattern tracking and community awareness.',
      category: 'Harassment',
      timestamp: new Date('2024-01-22'),
      status: 'pending',
      needsFinancialAssistance: false,
      evidenceHash: '0x9abc...ijkl'
    }
  ]);

  const [donations, setDonations] = useState<Donation[]>([
    {
      id: '1',
      reportId: '1',
      amount: 100,
      donor: '0x1234...5678',
      timestamp: new Date('2024-01-16')
    },
    {
      id: '2',
      reportId: '1',
      amount: 220,
      donor: '0xabcd...efgh',
      timestamp: new Date('2024-01-18')
    },
    {
      id: '3',
      reportId: '2',
      amount: 500,
      donor: '0x9876...1234',
      timestamp: new Date('2024-01-21')
    },
    {
      id: '4',
      reportId: '2',
      amount: 250,
      donor: '0xijkl...mnop',
      timestamp: new Date('2024-01-23')
    }
  ]);

  const [votes, setVotes] = useState<Vote[]>([
    {
      id: '1',
      proposalId: 'proposal-1',
      voter: '0xNGO1...abc',
      vote: 'approve',
      timestamp: new Date('2024-01-16')
    },
    {
      id: '2',
      proposalId: 'proposal-1',
      voter: '0xNGO2...def',
      vote: 'approve',
      timestamp: new Date('2024-01-17')
    }
  ]);

  const wallet = useWallet();

  const navigateTo = (page: SafeReportPage) => {
    setCurrentPage(page);
  };

  const addReport = (report: Omit<Report, 'id' | 'timestamp' | 'status'>) => {
    const newReport: Report = {
      ...report,
      id: Date.now().toString(),
      timestamp: new Date(),
      status: 'pending'
    };
    setReports(prev => [newReport, ...prev]);
  };

  const addDonation = (donation: Omit<Donation, 'id' | 'timestamp'>) => {
    const newDonation: Donation = {
      ...donation,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setDonations(prev => [newDonation, ...prev]);
    
    // Update raised amount for the report
    setReports(prev => prev.map(report => 
      report.id === donation.reportId 
        ? { ...report, raisedAmount: (report.raisedAmount || 0) + donation.amount }
        : report
    ));
  };

  const updateReportStatus = (reportId: string, status: Report['status']) => {
    setReports(prev => prev.map(report => 
      report.id === reportId ? { ...report, status } : report
    ));
  };

  const updateReportWithVerification = (reportId: string, verificationData: { score: number; flags: string[]; status: Report['status'] }) => {
    setReports(prev => prev.map(report => 
      report.id === reportId 
        ? { 
            ...report, 
            verificationScore: verificationData.score,
            flags: verificationData.flags,
            status: verificationData.status
          } 
        : report
    ));
  };

  const addVote = (vote: Omit<Vote, 'id' | 'timestamp'>) => {
    const newVote: Vote = {
      ...vote,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setVotes(prev => [newVote, ...prev]);
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'home': return 'SafeReport Dashboard';
      case 'report': return 'File Anonymous Report';
      case 'donate': return 'Support Survivors';
      case 'ngo': return 'NGO Verification Center';
      case 'dao': return 'DAO Governance';
      case 'verification': return 'Verification System';
      case 'reputation': return 'Community Reputation';
      default: return 'SafeReport';
    }
  };

  const getPageSubtitle = () => {
    switch (currentPage) {
      case 'home': return 'Anonymous reporting with blockchain security';
      case 'report': return 'Secure and confidential incident reporting';
      case 'donate': return 'Help survivors with financial assistance';
      case 'ngo': return 'Verify reports and manage cases';
      case 'dao': return 'Transparent community governance';
      case 'verification': return 'AI-powered fraud detection and validation';
      case 'reputation': return 'Community trust and contribution tracking';
      default: return '';
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <SafeReportHome navigateTo={navigateTo} />;
      case 'report':
        return <SafeReportReport navigateTo={navigateTo} addReport={addReport} />;
      case 'donate':
        return <SafeReportDonations navigateTo={navigateTo} reports={reports} addDonation={addDonation} wallet={wallet} />;
      case 'ngo':
        return <SafeReportNGO navigateTo={navigateTo} reports={reports} donations={donations} updateReportStatus={updateReportStatus} wallet={wallet} />;
      case 'dao':
        return <SafeReportDAO navigateTo={navigateTo} votes={votes} addVote={addVote} wallet={wallet} />;
      case 'verification':
        return <VerificationSystem 
          reports={reports} 
          onVerificationComplete={(reportId, result) => {
            updateReportWithVerification(reportId, {
              score: result.overallScore,
              flags: result.flags,
              status: result.status
            });
          }} 
        />;
      case 'reputation':
        return <ReputationSystem walletAddress={wallet.address || undefined} />;
      default:
        return <SafeReportHome navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <NavigationHeader 
        currentPage={currentPage}
        navigateTo={navigateTo}
        title={getPageTitle()}
        subtitle={getPageSubtitle()}
      />
      <div className="container mx-auto px-4 py-8">
        {renderCurrentPage()}
      </div>
    </div>
  );
};

export default SafeReportApp;