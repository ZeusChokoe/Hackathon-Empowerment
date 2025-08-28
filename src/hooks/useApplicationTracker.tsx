import { useState, useEffect } from 'react';
import { useWallet } from './useWallet';

export interface Application {
  id: string;
  type: 'loan' | 'education' | 'scholarship' | 'healthcare';
  title: string;
  status: 'pending' | 'approved' | 'rejected' | 'in_review' | 'completed';
  submittedDate: string;
  lastUpdated: string;
  amount?: number;
  description: string;
  documents: string[];
  trackingNumber: string;
  estimatedDecision?: string;
  notes?: string;
}

export const useApplicationTracker = () => {
  const { address, isConnected } = useWallet();
  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load applications for connected wallet
  useEffect(() => {
    if (isConnected && address) {
      loadApplications();
    } else {
      setApplications([]);
    }
  }, [isConnected, address]);

  const loadApplications = async () => {
    setIsLoading(true);
    try {
      // Simulate loading applications from blockchain/database
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data - in real app this would come from smart contracts
      const mockApplications: Application[] = [
        {
          id: 'app_001',
          type: 'loan',
          title: 'Small Business Loan - R15,000',
          status: 'approved',
          submittedDate: '2025-08-24',
          lastUpdated: '2025-08-24',
          amount: 15000,
          description: 'Loan for expanding my catering business',
          documents: ['ID Document', 'Business Plan', 'Income Statement'],
          trackingNumber: 'ZF-LOAN-2025-08-001',
          estimatedDecision: '2025-08-24',
          notes: 'Loan approved. Funds will be disbursed within 24 hours.'
        },
        {
          id: 'app_002',
          type: 'education',
          title: 'Digital Marketing Course',
          status: 'in_review',
          submittedDate: '2025-08-20',
          lastUpdated: '2025-08-22',
          description: 'Application for digital marketing certification program',
          documents: ['Academic Transcript', 'Motivation Letter'],
          trackingNumber: 'ZF-EDU-2025-08-002',
          estimatedDecision: '2025-08-30'
        },
        {
          id: 'app_003',
          type: 'scholarship',
          title: 'Women in Technology Scholarship - R25,000',
          status: 'pending',
          submittedDate: '2025-08-24',
          lastUpdated: '2025-08-24',
          amount: 25000,
          description: 'Scholarship application for computer science studies',
          documents: ['Portfolio', 'Recommendation Letters', 'Financial Need Statement'],
          trackingNumber: 'ZF-SCH-2025-08-003',
          estimatedDecision: '2025-09-15'
        }
      ];

      setApplications(mockApplications);
    } catch (error) {
      console.error('Error loading applications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitApplication = async (applicationData: Omit<Application, 'id' | 'submittedDate' | 'lastUpdated' | 'trackingNumber' | 'status'>) => {
    if (!isConnected || !address) {
      throw new Error('Please connect your wallet first');
    }

    setIsLoading(true);
    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newApplication: Application = {
        ...applicationData,
        id: `app_${Date.now()}`,
        status: 'pending',
        submittedDate: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0],
        trackingNumber: `ZF-${applicationData.type.toUpperCase()}-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`
      };

      setApplications(prev => [newApplication, ...prev]);
      return newApplication.trackingNumber;
    } catch (error) {
      console.error('Error submitting application:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const getApplicationByTrackingNumber = (trackingNumber: string) => {
    return applications.find(app => app.trackingNumber === trackingNumber);
  };

  const getApplicationsByType = (type: Application['type']) => {
    return applications.filter(app => app.type === type);
  };

  const getApplicationsByStatus = (status: Application['status']) => {
    return applications.filter(app => app.status === status);
  };

  const updateApplicationStatus = (id: string, status: Application['status'], notes?: string) => {
    setApplications(prev => prev.map(app => 
      app.id === id 
        ? { 
            ...app, 
            status, 
            lastUpdated: new Date().toISOString().split('T')[0],
            notes: notes || app.notes 
          }
        : app
    ));
  };

  const generateTrackingNumber = (type: string) => {
    const timestamp = Date.now();
    return `ZF-${type.toUpperCase()}-${new Date().getFullYear()}-${String(timestamp).slice(-6)}`;
  };

  return {
    applications,
    isLoading,
    submitApplication,
    getApplicationByTrackingNumber,
    getApplicationsByType,
    getApplicationsByStatus,
    updateApplicationStatus,
    generateTrackingNumber,
    refreshApplications: loadApplications
  };
};
