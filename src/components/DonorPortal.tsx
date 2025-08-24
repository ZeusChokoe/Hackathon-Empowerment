import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { useToast } from "@/hooks/use-toast";
import { useLiveData } from "@/hooks/useLiveData";
import { 
  Heart, 
  Gift, 
  TrendingUp, 
  Users, 
  Award,
  Shield,
  Zap,
  Target,
  Star,
  Eye,
  Wallet,
  AlertCircle
} from "lucide-react";

const DonorPortal = () => {
  const [donationAmount, setDonationAmount] = useState(1000);
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isDonating, setIsDonating] = useState(false);
  
  const { isConnected, connectWallet, usdcBalance, convertUSDToZAR, estimateGas } = useWallet();
  const { stats } = useLiveData();
  const { toast } = useToast();
  
  const campaigns = [
    {
      id: 1,
      title: "Women's Business Expansion Fund",
      description: "Supporting 50 women entrepreneurs to scale their businesses across rural South Africa",
      raised: 85000,
      goal: 150000,
      donors: 234,
      impact: "12 businesses already expanded",
      category: "Business",
      urgency: "high",
      nftReward: "Empowerment Champion NFT",
      daysLeft: 15
    },
    {
      id: 2,
      title: "Healthcare Emergency Fund",
      description: "Providing immediate healthcare assistance to women in underserved communities",
      raised: 120000,
      goal: 200000,
      donors: 456,
      impact: "89 women received emergency care",
      category: "Healthcare",
      urgency: "critical",
      nftReward: "Healthcare Hero NFT",
      daysLeft: 8
    },
    {
      id: 3,
      title: "Tech Education Scholarships",
      description: "Funding coding bootcamps and tech skills training for young women",
      raised: 65000,
      goal: 100000,
      donors: 187,
      impact: "32 women completed training",
      category: "Education",
      urgency: "medium",
      nftReward: "Tech Enabler NFT",
      daysLeft: 30
    }
  ];

  const impactStats = {
    totalDonated: stats.totalDonations,
    womenHelped: stats.womenEmpowered,
    businessesStarted: Math.floor(stats.womenEmpowered * 0.23),
    loansRepaid: stats.totalRepaymentRate,
    nftsIssued: Math.floor(stats.womenEmpowered * 0.67)
  };

  const donationTiers = [
    { amount: 500, tier: "Supporter", perks: ["Impact updates", "Community access"] },
    { amount: 2000, tier: "Advocate", perks: ["Monthly reports", "Donor meetups", "NFT rewards"] },
    { amount: 5000, tier: "Champion", perks: ["Quarterly calls", "Visit opportunities", "Limited NFTs"] },
    { amount: 10000, tier: "Partner", perks: ["Strategic input", "Brand visibility", "Exclusive NFTs"] }
  ];

  const calculateProgress = (raised: number, goal: number) => (raised / goal) * 100;

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'text-destructive';
      case 'high': return 'text-accent';
      default: return 'text-secondary';
    }
  };

  const handleViewDetails = (campaign: typeof campaigns[0]) => {
    setSelectedCampaign(campaign);
    setShowDetails(true);
  };

  const handleDonate = async (campaign?: typeof campaigns[0]) => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to make donations",
        variant: "destructive"
      });
      return;
    }

    const availableBalance = convertUSDToZAR(usdcBalance);
    const gasEstimate = estimateGas(donationAmount, 'USDC');
    
    if (availableBalance < donationAmount + gasEstimate.gasFeeZAR) {
      toast({
        title: "Insufficient Balance",
        description: `You need R ${(donationAmount + gasEstimate.gasFeeZAR).toFixed(2)} (including gas fees). Your balance is R ${availableBalance.toFixed(2)}`,
        variant: "destructive"
      });
      return;
    }

    try {
      setIsDonating(true);
      
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Donation Successful!",
        description: `You've donated R ${donationAmount.toLocaleString()} to ${campaign?.title || 'general fund'}. Thank you for making a difference!`
      });
      
      // Update campaign data (in real app, this would come from blockchain)
      if (campaign) {
        campaign.raised += donationAmount;
        campaign.donors += 1;
      }
      
    } catch (error) {
      toast({
        title: "Donation Failed",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsDonating(false);
    }
  };

  return (
    <section id="donate" className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Make a Difference Through Blockchain</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your donations are secured by smart contracts and tracked transparently. Receive NFT rewards that prove your impact in empowering South African women.
          </p>
        </div>

        {/* Impact Dashboard */}
        <Card className="mb-8 bg-gradient-hero text-primary-foreground">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Collective Impact</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold">R {(impactStats.totalDonated / 1000000).toFixed(1)}M</div>
                <div className="text-sm opacity-90">Total Donated</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{impactStats.womenHelped.toLocaleString()}</div>
                <div className="text-sm opacity-90">Women Helped</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{impactStats.businessesStarted}</div>
                <div className="text-sm opacity-90">Businesses Started</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{impactStats.loansRepaid}%</div>
                <div className="text-sm opacity-90">Repayment Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold">{impactStats.nftsIssued}</div>
                <div className="text-sm opacity-90">NFTs Issued</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Campaigns */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-semibold">Active Campaigns</h3>
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="hover:shadow-card transition-smooth">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-lg">{campaign.title}</h4>
                        <Badge variant="outline" className={getUrgencyColor(campaign.urgency)}>
                          {campaign.urgency}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{campaign.description}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress: R {campaign.raised.toLocaleString()} of R {campaign.goal.toLocaleString()}</span>
                        <span>{Math.round(calculateProgress(campaign.raised, campaign.goal))}%</span>
                      </div>
                      <Progress value={calculateProgress(campaign.raised, campaign.goal)} className="h-3" />
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {campaign.donors} donors
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          {campaign.daysLeft} days left
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-4 h-4 text-accent" />
                        <span className="font-medium text-sm">Impact So Far</span>
                      </div>
                      <p className="text-sm">{campaign.impact}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        NFT Reward: {campaign.nftReward}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button 
                        variant="donate" 
                        className="flex-1"
                        onClick={() => handleDonate(campaign)}
                        disabled={!isConnected || isDonating}
                      >
                        {isDonating ? "Donating..." : "Donate Now"}
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => handleViewDetails(campaign)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Donation Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  Quick Donation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="amount">Donation Amount (ZAR)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(Number(e.target.value))}
                    min={50}
                    step={50}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {[500, 1000, 2500, 5000].map((amount) => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setDonationAmount(amount)}
                      className={donationAmount === amount ? 'ring-2 ring-primary' : ''}
                    >
                      R {amount}
                    </Button>
                  ))}
                </div>

                <div className="p-3 bg-gradient-primary rounded-lg text-primary-foreground">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-4 h-4" />
                    <span className="font-medium text-sm">Blockchain Security</span>
                  </div>
                  <p className="text-xs opacity-90">
                    Your donation is secured by smart contracts and fully traceable on the blockchain.
                  </p>
                </div>

                <Button 
                  variant="empowerment" 
                  size="lg" 
                  className="w-full gap-2"
                  onClick={() => handleDonate()}
                  disabled={!isConnected || isDonating}
                >
                  {!isConnected ? (
                    <>
                      <Wallet className="w-4 h-4" />
                      Connect Wallet to Donate
                    </>
                  ) : isDonating ? (
                    "Processing Donation..."
                  ) : (
                    <>
                      <Heart className="w-4 h-4" />
                      Donate R {donationAmount.toLocaleString()}
                    </>
                  )}
                </Button>

                <div className="text-center text-xs text-muted-foreground">
                  You'll receive an NFT certificate of impact
                </div>
              </CardContent>
            </Card>

            {/* Donation Tiers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Donor Tiers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {donationTiers.map((tier, index) => (
                  <div 
                    key={index} 
                    className={`p-3 border rounded-lg transition-smooth ${
                      donationAmount >= tier.amount ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">{tier.tier}</span>
                      <Badge variant={donationAmount >= tier.amount ? "default" : "outline"}>
                        R {tier.amount.toLocaleString()}+
                      </Badge>
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {tier.perks.map((perk, pIndex) => (
                        <li key={pIndex} className="flex items-center gap-1">
                          <div className="w-1 h-1 bg-primary rounded-full" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Blockchain Features */}
            <Card className="bg-gradient-secondary text-secondary-foreground">
              <CardContent className="p-6 text-center">
                <Zap className="w-8 h-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Powered by BlockDAG</h4>
                <p className="text-sm opacity-90 mb-4">
                  Ultra-fast transactions with minimal fees. Your donations reach recipients instantly.
                </p>
                <Button variant="outline" size="sm" className="bg-transparent border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary">
                  Learn About Our Tech
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Campaign Details Modal */}
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedCampaign?.title}</DialogTitle>
            </DialogHeader>
            {selectedCampaign && (
              <div className="space-y-6">
                <div>
                  <p className="text-muted-foreground mb-4">{selectedCampaign.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">Campaign Progress</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Raised:</span>
                          <span>R {selectedCampaign.raised.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Goal:</span>
                          <span>R {selectedCampaign.goal.toLocaleString()}</span>
                        </div>
                        <Progress value={calculateProgress(selectedCampaign.raised, selectedCampaign.goal)} />
                      </div>
                    </div>
                    
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">Impact Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Donors:</span>
                          <span>{selectedCampaign.donors}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Days Left:</span>
                          <span>{selectedCampaign.daysLeft}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Category:</span>
                          <span>{selectedCampaign.category}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Current Impact
                    </h4>
                    <p className="text-sm">{selectedCampaign.impact}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      NFT Reward for donors: {selectedCampaign.nftReward}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    variant="empowerment" 
                    className="flex-1"
                    onClick={() => {
                      setShowDetails(false);
                      handleDonate(selectedCampaign);
                    }}
                    disabled={!isConnected || isDonating}
                  >
                    {!isConnected ? "Connect Wallet" : isDonating ? "Processing..." : `Donate R ${donationAmount.toLocaleString()}`}
                  </Button>
                  <Button variant="outline" onClick={() => setShowDetails(false)}>
                    Close
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default DonorPortal;