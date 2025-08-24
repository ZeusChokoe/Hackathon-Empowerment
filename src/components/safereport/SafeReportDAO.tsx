import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Vote, CheckCircle, X, Clock, Users, Trophy, BarChart3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SafeReportPage, Vote as VoteType } from '../SafeReportApp';
import { WalletState } from '@/hooks/useWallet';
import { WalletBalance } from './WalletBalance';

interface SafeReportDAOProps {
  navigateTo: (page: SafeReportPage) => void;
  votes: VoteType[];
  addVote: (vote: Omit<VoteType, 'id' | 'timestamp'>) => void;
  wallet: WalletState & {
    connectWallet: () => Promise<string | undefined>;
    disconnectWallet: () => void;
    formatAddress: (address: string) => string;
    updateBalances: () => Promise<void>;
    convertUSDToZAR: (usd: number) => number;
    convertETHToZAR: (eth: number) => number;
  };
}

interface Proposal {
  id: string;
  title: string;
  description: string;
  type: 'report_verification' | 'funding_release' | 'policy_change' | 'ngo_approval';
  status: 'active' | 'passed' | 'rejected' | 'expired';
  createdAt: Date;
  expiresAt: Date;
  requiredVotes: number;
  reportId?: string;
}

export const SafeReportDAO = ({ navigateTo, votes, addVote, wallet }: SafeReportDAOProps) => {
  const [isVoting, setIsVoting] = useState(false);
  const [votingProposal, setVotingProposal] = useState<string | null>(null);
  
  const { toast } = useToast();

  // Mock proposals data
  const proposals: Proposal[] = [
    {
      id: 'proposal-1',
      title: 'Verify Report: Workplace Harassment Case #001',
      description: 'Review and verify workplace harassment report submitted on Jan 15, 2024. Evidence provided includes documentation and witness statements.',
      type: 'report_verification',
      status: 'active',
      createdAt: new Date('2024-01-16'),
      expiresAt: new Date('2024-01-30'),
      requiredVotes: 3,
      reportId: '1'
    },
    {
      id: 'proposal-2',
      title: 'Release Emergency Funding for Domestic Violence Case',
      description: 'Approve release of R9,250 emergency funding for survivor requiring immediate temporary housing and legal assistance.',
      type: 'funding_release',
      status: 'active',
      createdAt: new Date('2024-01-20'),
      expiresAt: new Date('2024-01-27'),
      requiredVotes: 5,
      reportId: '2'
    },
    {
      id: 'proposal-3',
      title: 'Approve New NGO Partner: Women\'s Safety Network',
      description: 'Review application from Women\'s Safety Network to join as verified NGO partner for report validation.',
      type: 'ngo_approval',
      status: 'passed',
      createdAt: new Date('2024-01-10'),
      expiresAt: new Date('2024-01-17'),
      requiredVotes: 4
    },
    {
      id: 'proposal-4',
      title: 'Update Minimum Evidence Requirements',
      description: 'Proposal to update minimum evidence requirements for financial assistance requests to include additional verification steps.',
      type: 'policy_change',
      status: 'active',
      createdAt: new Date('2024-01-22'),
      expiresAt: new Date('2024-02-05'),
      requiredVotes: 7
    }
  ];

  const getProposalVotes = (proposalId: string) => {
    return votes.filter(vote => vote.proposalId === proposalId);
  };

  const getVoteCount = (proposalId: string, voteType: 'approve' | 'reject') => {
    return getProposalVotes(proposalId).filter(vote => vote.vote === voteType).length;
  };

  const hasUserVoted = (proposalId: string) => {
    if (!wallet.address) return false;
    return getProposalVotes(proposalId).some(vote => vote.voter === wallet.address);
  };

  const getProposalProgress = (proposal: Proposal) => {
    const approveVotes = getVoteCount(proposal.id, 'approve');
    const rejectVotes = getVoteCount(proposal.id, 'reject');
    const totalVotes = approveVotes + rejectVotes;
    
    if (totalVotes === 0) return 0;
    return (approveVotes / (approveVotes + rejectVotes)) * 100;
  };

  const getProposalStatus = (proposal: Proposal) => {
    const approveVotes = getVoteCount(proposal.id, 'approve');
    const rejectVotes = getVoteCount(proposal.id, 'reject');
    
    if (proposal.status !== 'active') return proposal.status;
    if (approveVotes >= proposal.requiredVotes) return 'ready_to_pass';
    if (rejectVotes >= proposal.requiredVotes) return 'ready_to_reject';
    if (new Date() > proposal.expiresAt) return 'expired';
    return 'active';
  };

  const handleVote = async (proposalId: string, voteType: 'approve' | 'reject') => {
    if (!wallet.isConnected || hasUserVoted(proposalId)) return;

    setIsVoting(true);
    setVotingProposal(proposalId);

    // Simulate blockchain transaction
    setTimeout(() => {
      addVote({
        proposalId,
        voter: wallet.address!,
        vote: voteType
      });

      toast({
        title: "Vote Recorded",
        description: `Your ${voteType} vote has been recorded on the blockchain.`,
      });

      setIsVoting(false);
      setVotingProposal(null);
    }, 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="text-blue-600 border-blue-600"><Clock className="w-3 h-3 mr-1" />Active</Badge>;
      case 'ready_to_pass':
        return <Badge variant="outline" className="text-green-600 border-green-600"><CheckCircle className="w-3 h-3 mr-1" />Ready to Pass</Badge>;
      case 'ready_to_reject':
        return <Badge variant="outline" className="text-red-600 border-red-600"><X className="w-3 h-3 mr-1" />Ready to Reject</Badge>;
      case 'passed':
        return <Badge variant="outline" className="text-green-600 border-green-600"><Trophy className="w-3 h-3 mr-1" />Passed</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-600"><X className="w-3 h-3 mr-1" />Rejected</Badge>;
      case 'expired':
        return <Badge variant="outline" className="text-gray-600 border-gray-600"><Clock className="w-3 h-3 mr-1" />Expired</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'report_verification':
        return '🛡️';
      case 'funding_release':
        return '💰';
      case 'ngo_approval':
        return '🤝';
      case 'policy_change':
        return '📋';
      default:
        return '📄';
    }
  };

  const activeProposals = proposals.filter(p => ['active', 'ready_to_pass', 'ready_to_reject'].includes(getProposalStatus(p)));
  const completedProposals = proposals.filter(p => ['passed', 'rejected', 'expired'].includes(getProposalStatus(p)));

  const ProposalCard = ({ proposal }: { proposal: Proposal }) => {
    const status = getProposalStatus(proposal);
    const approveVotes = getVoteCount(proposal.id, 'approve');
    const rejectVotes = getVoteCount(proposal.id, 'reject');
    const progress = getProposalProgress(proposal);
    const userVoted = hasUserVoted(proposal.id);
    const isExpired = new Date() > proposal.expiresAt;

    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg">{getTypeIcon(proposal.type)}</span>
                <Badge variant="secondary">
                  {proposal.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
              </div>
              <CardTitle className="text-lg leading-tight">
                {proposal.title}
              </CardTitle>
            </div>
            {getStatusBadge(status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {proposal.description}
          </p>

          {/* Voting Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Support</span>
              <span className="font-medium">
                {approveVotes} approve • {rejectVotes} reject
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{Math.round(progress)}% support</span>
              <span>{proposal.requiredVotes} votes needed</span>
            </div>
          </div>

          {/* Timeline */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Created:</span>
              <p className="font-medium">{proposal.createdAt.toLocaleDateString()}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Expires:</span>
              <p className={`font-medium ${isExpired ? 'text-red-600' : ''}`}>
                {proposal.expiresAt.toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Voting Buttons */}
          {wallet.isConnected && status === 'active' && !userVoted && !isExpired && (
            <div className="flex space-x-2">
              <Button 
                variant="outline"
                className="flex-1 text-red-600 hover:text-red-700"
                onClick={() => handleVote(proposal.id, 'reject')}
                disabled={isVoting && votingProposal === proposal.id}
              >
                <X className="w-4 h-4 mr-2" />
                {isVoting && votingProposal === proposal.id ? 'Voting...' : 'Reject'}
              </Button>
              <Button 
                variant="empowerment"
                className="flex-1"
                onClick={() => handleVote(proposal.id, 'approve')}
                disabled={isVoting && votingProposal === proposal.id}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {isVoting && votingProposal === proposal.id ? 'Voting...' : 'Approve'}
              </Button>
            </div>
          )}

          {userVoted && (
            <div className="text-center p-2 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                ✅ You have already voted on this proposal
              </p>
            </div>
          )}

          {!wallet.isConnected && (
            <div className="text-center p-2 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Connect wallet to vote
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => navigateTo('home')} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center">
            <Vote className="w-8 h-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold">DAO Governance</h1>
          </div>
        </div>

        {/* Wallet Connection */}
        <div className="flex items-center space-x-4">
          {wallet.isConnected ? (
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-muted-foreground">
                DAO Member: {wallet.formatAddress(wallet.address!)}
              </span>
              <Button variant="outline" size="sm" onClick={wallet.disconnectWallet}>
                Disconnect
              </Button>
            </div>
          ) : (
            <Button variant="empowerment" onClick={wallet.connectWallet} disabled={wallet.isConnecting}>
              {wallet.isConnecting ? 'Connecting...' : 'Connect to Vote'}
            </Button>
          )}
        </div>
      </div>

      {/* Wallet Balance */}
      {wallet.isConnected && (
        <WalletBalance wallet={wallet} />
      )}

      {/* DAO Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Vote className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{activeProposals.length}</p>
                <p className="text-sm text-muted-foreground">Active Proposals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">DAO Members</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{completedProposals.filter(p => getProposalStatus(p) === 'passed').length}</p>
                <p className="text-sm text-muted-foreground">Proposals Passed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{votes.length}</p>
                <p className="text-sm text-muted-foreground">Total Votes Cast</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Governance Description */}
      <Card className="mb-8 bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Vote className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-primary mb-2">Transparent Governance</h3>
              <p className="text-sm text-muted-foreground">
                The SafeReport DAO ensures transparent decision-making for report verification, funding releases, 
                and platform policies. NGO partners and trusted community members vote on proposals to maintain 
                the integrity and effectiveness of the platform.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Proposals Tabs */}
      <Tabs defaultValue="active" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">
            Active Proposals ({activeProposals.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedProposals.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeProposals.length === 0 ? (
            <Card className="text-center p-8">
              <CardContent>
                <Vote className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Active Proposals</h3>
                <p className="text-muted-foreground">All proposals have been resolved.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeProposals.map((proposal) => (
                <ProposalCard key={proposal.id} proposal={proposal} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completedProposals.map((proposal) => (
              <ProposalCard key={proposal.id} proposal={proposal} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Recent Votes */}
      {votes.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Voting Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {votes.slice().reverse().slice(0, 10).map((vote) => {
                const proposal = proposals.find(p => p.id === vote.proposalId);
                return (
                  <div key={vote.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${vote.vote === 'approve' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <div>
                        <p className="text-sm font-medium">
                          {wallet.formatAddress(vote.voter)} voted to {vote.vote}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {proposal?.title.substring(0, 50)}...
                        </p>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {vote.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};