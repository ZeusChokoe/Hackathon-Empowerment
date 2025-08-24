import { useState, useEffect } from 'react';

export interface LiveStats {
  totalUsers: number;
  totalLoansDistributed: number;
  totalRepaymentRate: number;
  activeCampaigns: number;
  womenEmpowered: number;
  totalDonations: number;
}

export interface LiveCampaign {
  id: string;
  title: string;
  description: string;
  target: number;
  raised: number;
  donors: number;
  daysLeft: number;
  location: string;
  urgency: 'high' | 'medium' | 'low';
  category: string;
  image?: string;
}

export interface LiveEducationProgram {
  id: string;
  title: string;
  provider: string;
  duration: string;
  fee: number;
  scholarshipAmount: number;
  participants: number;
  rating: number;
  category: string;
  description: string;
  startDate: string;
  applicationDeadline: string;
  spotsAvailable: number;
  requirements: string[];
  icon: string;
}

export interface LiveScholarship {
  id: string;
  title: string;
  amount: number;
  deadline: string;
  applicants: number;
  available: number;
  provider: string;
  category: string;
  description: string;
  requirements: string[];
}

export const useLiveData = () => {
  const [stats, setStats] = useState<LiveStats>({
    totalUsers: 2847,
    totalLoansDistributed: 1200000,
    totalRepaymentRate: 98.5,
    activeCampaigns: 24,
    womenEmpowered: 2847,
    totalDonations: 890000
  });

  const [campaigns, setCampaigns] = useState<LiveCampaign[]>([
    {
      id: 'camp_001',
      title: 'Emergency Healthcare Fund - Soweto',
      description: 'Providing immediate medical assistance to women and children in Soweto townships who cannot afford private healthcare.',
      target: 50000,
      raised: 32150,
      donors: 127,
      daysLeft: 12,
      location: 'Soweto, Johannesburg',
      urgency: 'high',
      category: 'Healthcare',
    },
    {
      id: 'camp_002', 
      title: 'Rural Education Technology Access',
      description: 'Bridging the digital divide by providing tablets and internet access to rural schools in KwaZulu-Natal.',
      target: 75000,
      raised: 48750,
      donors: 203,
      daysLeft: 28,
      location: 'KwaZulu-Natal',
      urgency: 'medium',
      category: 'Education',
    },
    {
      id: 'camp_003',
      title: 'Women Entrepreneurs Startup Fund',
      description: 'Supporting women-owned small businesses with initial capital and mentorship programs.',
      target: 100000,
      raised: 67890,
      donors: 156,
      daysLeft: 45,
      location: 'Cape Town',
      urgency: 'low',
      category: 'Business',
    }
  ]);

  const [educationPrograms, setEducationPrograms] = useState<LiveEducationProgram[]>([
    {
      id: 'edu_001',
      title: 'Digital Marketing for Small Business',
      provider: 'University of Cape Town',
      duration: '8 weeks',
      fee: 3500,
      scholarshipAmount: 2800,
      participants: 45,
      rating: 4.8,
      category: 'Business',
      description: 'Master digital marketing strategies tailored for South African small businesses',
      startDate: '2024-10-15',
      applicationDeadline: '2024-09-30',
      spotsAvailable: 15,
      requirements: ['Basic computer skills', 'Valid ID', 'Business idea or existing business'],
      icon: 'TrendingUp'
    },
    {
      id: 'edu_002',
      title: 'Financial Literacy & Investment Basics',
      provider: 'ZeusFactor Academy',
      duration: '6 weeks',
      fee: 2500,
      scholarshipAmount: 2000,
      participants: 78,
      rating: 4.9,
      category: 'Finance',
      description: 'Learn personal finance management and basic investment principles',
      startDate: '2024-09-25',
      applicationDeadline: '2024-09-15',
      spotsAvailable: 22,
      requirements: ['Matric certificate', 'Basic numeracy', 'Commitment to full program'],
      icon: 'Award'
    },
    {
      id: 'edu_003',
      title: 'Healthcare Leadership for Women',
      provider: 'Wits University',
      duration: '12 weeks',
      fee: 5000,
      scholarshipAmount: 4000,
      participants: 32,
      rating: 4.7,
      category: 'Healthcare',
      description: 'Develop leadership skills in healthcare management and community health',
      startDate: '2024-11-01',
      applicationDeadline: '2024-10-10',
      spotsAvailable: 18,
      requirements: ['Healthcare background preferred', 'Leadership experience', 'Community involvement'],
      icon: 'Heart'
    }
  ]);

  const [scholarships, setScholarships] = useState<LiveScholarship[]>([
    {
      id: 'sch_001',
      title: 'Women in Technology Excellence Award',
      amount: 25000,
      deadline: '2024-11-30',
      applicants: 89,
      available: 10,
      provider: 'Tech4Good Foundation',
      category: 'Technology',
      description: 'Supporting women pursuing careers in technology and innovation',
      requirements: ['Must be studying or working in tech', 'South African citizen', 'Demonstrate financial need']
    },
    {
      id: 'sch_002',
      title: 'Rural Healthcare Heroes Scholarship',
      amount: 35000,
      deadline: '2024-12-15',
      applicants: 156,
      available: 15,
      provider: 'Health Foundation SA',
      category: 'Healthcare',
      description: 'For women committed to serving rural communities in healthcare',
      requirements: ['Healthcare qualification or studying', 'Commitment to rural service', 'Community recommendation']
    },
    {
      id: 'sch_003',
      title: 'Small Business Innovation Grant',
      amount: 18000,
      deadline: '2024-10-20',
      applicants: 203,
      available: 25,
      provider: 'SA Women Entrepreneurs',
      category: 'Business',
      description: 'Supporting innovative women-led business ventures',
      requirements: ['Original business plan', 'Women-owned business', 'Innovation component']
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update stats with small random variations
      setStats(prev => ({
        ...prev,
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 3),
        totalLoansDistributed: prev.totalLoansDistributed + Math.floor(Math.random() * 1000),
        totalDonations: prev.totalDonations + Math.floor(Math.random() * 500),
        womenEmpowered: prev.womenEmpowered + Math.floor(Math.random() * 2)
      }));

      // Update campaign data
      setCampaigns(prev => prev.map(campaign => ({
        ...campaign,
        raised: Math.min(campaign.raised + Math.floor(Math.random() * 200), campaign.target),
        donors: campaign.donors + Math.floor(Math.random() * 2)
      })));

      // Update education programs
      setEducationPrograms(prev => prev.map(program => ({
        ...program,
        participants: program.participants + Math.floor(Math.random() * 2),
        spotsAvailable: Math.max(program.spotsAvailable - Math.floor(Math.random() * 1), 0)
      })));

      // Update scholarships
      setScholarships(prev => prev.map(scholarship => ({
        ...scholarship,
        applicants: scholarship.applicants + Math.floor(Math.random() * 3)
      })));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return {
    stats,
    campaigns,
    educationPrograms, 
    scholarships,
    refreshData: () => {
      // Force refresh logic here if needed
    }
  };
};