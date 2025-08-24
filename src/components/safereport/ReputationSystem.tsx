import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Star, 
  Shield, 
  TrendingUp, 
  Award, 
  Users, 
  CheckCircle,
  AlertTriangle,
  Heart,
  Vote
} from 'lucide-react';

interface ReputationScore {
  walletAddress: string;
  overallScore: number;
  donationHistory: number;
  verificationAccuracy: number;
  communityTrust: number;
  timeOnPlatform: number;
  badges: string[];
  trustLevel: 'new' | 'trusted' | 'verified' | 'guardian';
  totalDonated: number;
  reportsVerified: number;
  votesAccurate: number;
}

interface ReputationSystemProps {
  walletAddress?: string;
}

export const ReputationSystem = ({ walletAddress }: ReputationSystemProps) => {
  const [reputation, setReputation] = useState<ReputationScore | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (walletAddress) {
      loadReputationScore(walletAddress);
    } else {
      setIsLoading(false);
    }
  }, [walletAddress]);

  const loadReputationScore = async (address: string) => {
    setIsLoading(true);
    
    // Simulate API call to load reputation
    setTimeout(() => {
      const mockReputation: ReputationScore = {
        walletAddress: address,
        overallScore: Math.random() * 30 + 70, // 70-100 range
        donationHistory: Math.random() * 25 + 75,
        verificationAccuracy: Math.random() * 20 + 80,
        communityTrust: Math.random() * 15 + 85,
        timeOnPlatform: Math.random() * 40 + 60,
        badges: generateBadges(),
        trustLevel: getTrustLevel(Math.random() * 30 + 70),
        totalDonated: Math.random() * 5000 + 500,
        reportsVerified: Math.floor(Math.random() * 50 + 10),
        votesAccurate: Math.floor(Math.random() * 30 + 15),
      };
      
      setReputation(mockReputation);
      setIsLoading(false);
    }, 1500);
  };

  const generateBadges = (): string[] => {
    const allBadges = [
      'First Donor',
      'Generous Heart',
      'Verification Expert',
      'Community Guardian',
      'Early Adopter',
      'Top Contributor',
      'Trust Builder',
      'Pattern Detective',
      'NGO Partner',
      'DAO Member'
    ];
    
    const numBadges = Math.floor(Math.random() * 5) + 2;
    return allBadges.sort(() => 0.5 - Math.random()).slice(0, numBadges);
  };

  const getTrustLevel = (score: number): ReputationScore['trustLevel'] => {
    if (score >= 95) return 'guardian';
    if (score >= 85) return 'verified';
    if (score >= 70) return 'trusted';
    return 'new';
  };

  const getTrustLevelBadge = (level: ReputationScore['trustLevel']) => {
    switch (level) {
      case 'guardian':
        return <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <Award className="w-3 h-3 mr-1" />Guardian
        </Badge>;
      case 'verified':
        return <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <CheckCircle className="w-3 h-3 mr-1" />Verified
        </Badge>;
      case 'trusted':
        return <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
          <Shield className="w-3 h-3 mr-1" />Trusted
        </Badge>;
      case 'new':
        return <Badge variant="outline">
          <Users className="w-3 h-3 mr-1" />New Member
        </Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-orange-600';
  };

  if (!walletAddress) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <Shield className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Connect Wallet for Reputation</h3>
          <p className="text-muted-foreground">
            Connect your wallet to view your community reputation and trust score.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading reputation data...</p>
        </CardContent>
      </Card>
    );
  }

  if (!reputation) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <AlertTriangle className="w-16 h-16 mx-auto text-orange-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Reputation Data</h3>
          <p className="text-muted-foreground">
            Start participating in the SafeReport community to build your reputation.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Reputation Score */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle>Community Reputation</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </p>
              </div>
            </div>
            {getTrustLevelBadge(reputation.trustLevel)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className={`text-6xl font-bold ${getScoreColor(reputation.overallScore)} mb-2`}>
              {reputation.overallScore.toFixed(0)}
            </div>
            <p className="text-muted-foreground">Overall Trust Score</p>
            <Progress value={reputation.overallScore} className="mt-2" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                R{reputation.totalDonated.toLocaleString('en-ZA')}
              </div>
              <p className="text-xs text-muted-foreground">Total Donated</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {reputation.reportsVerified}
              </div>
              <p className="text-xs text-muted-foreground">Reports Verified</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {reputation.votesAccurate}
              </div>
              <p className="text-xs text-muted-foreground">Accurate Votes</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {reputation.badges.length}
              </div>
              <p className="text-xs text-muted-foreground">Badges Earned</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Scores */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Reputation Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Donation History</span>
                <span className={getScoreColor(reputation.donationHistory)}>
                  {reputation.donationHistory.toFixed(0)}%
                </span>
              </div>
              <Progress value={reputation.donationHistory} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Verification Accuracy</span>
                <span className={getScoreColor(reputation.verificationAccuracy)}>
                  {reputation.verificationAccuracy.toFixed(0)}%
                </span>
              </div>
              <Progress value={reputation.verificationAccuracy} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Community Trust</span>
                <span className={getScoreColor(reputation.communityTrust)}>
                  {reputation.communityTrust.toFixed(0)}%
                </span>
              </div>
              <Progress value={reputation.communityTrust} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Platform Experience</span>
                <span className={getScoreColor(reputation.timeOnPlatform)}>
                  {reputation.timeOnPlatform.toFixed(0)}%
                </span>
              </div>
              <Progress value={reputation.timeOnPlatform} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Badges & Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="w-5 h-5 mr-2" />
              Badges & Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {reputation.badges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-2 bg-primary/5 rounded-lg"
                >
                  {getBadgeIcon(badge)}
                  <span className="text-sm font-medium">{badge}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <h4 className="font-semibold text-primary mb-2">Next Achievement</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Donate R1,000 more to unlock "Super Supporter" badge
              </p>
              <Progress value={75} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">75% complete</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trust Level Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Trust Level Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg opacity-60">
              <Users className="w-8 h-8 text-gray-500 mx-auto mb-2" />
              <h5 className="font-semibold text-gray-700">New Member</h5>
              <p className="text-xs text-gray-600">Basic platform access</p>
            </div>

            <div className={`text-center p-4 rounded-lg ${reputation.trustLevel === 'trusted' || reputation.trustLevel === 'verified' || reputation.trustLevel === 'guardian' ? 'bg-blue-50 border-2 border-blue-200' : 'bg-gray-50 opacity-60'}`}>
              <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h5 className="font-semibold text-blue-700">Trusted</h5>
              <p className="text-xs text-blue-600">Higher donation limits</p>
            </div>

            <div className={`text-center p-4 rounded-lg ${reputation.trustLevel === 'verified' || reputation.trustLevel === 'guardian' ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50 opacity-60'}`}>
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h5 className="font-semibold text-green-700">Verified</h5>
              <p className="text-xs text-green-600">NGO partnership access</p>
            </div>

            <div className={`text-center p-4 rounded-lg ${reputation.trustLevel === 'guardian' ? 'bg-purple-50 border-2 border-purple-200' : 'bg-gray-50 opacity-60'}`}>
              <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h5 className="font-semibold text-purple-700">Guardian</h5>
              <p className="text-xs text-purple-600">DAO governance rights</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const getBadgeIcon = (badge: string) => {
  switch (badge.toLowerCase()) {
    case 'first donor':
    case 'generous heart':
    case 'top contributor':
      return <Heart className="w-4 h-4 text-red-500" />;
    case 'verification expert':
    case 'pattern detective':
      return <Shield className="w-4 h-4 text-blue-500" />;
    case 'community guardian':
    case 'trust builder':
      return <Users className="w-4 h-4 text-green-500" />;
    case 'dao member':
      return <Vote className="w-4 h-4 text-purple-500" />;
    default:
      return <Star className="w-4 h-4 text-yellow-500" />;
  }
};