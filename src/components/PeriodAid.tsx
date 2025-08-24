import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useWallet } from "@/hooks/useWallet";
// [Injected] Web3 contract helpers
import { useContracts } from '@/hooks/useContracts';
import ERC20ABI from '@/abi/ERC20.json';
import PeriodAidABI from '@/abi/PeriodAidDonations.json';
import contracts from '@/config/contracts.json';
import { ethers } from 'ethers';

import { useToast } from "@/hooks/use-toast";
import { 
  Heart, 
  Shield, 
  Users, 
  Target, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  Clock, 
  FileText, 
  Zap,
  TrendingUp,
  Globe,
  Lock,
  RefreshCw
} from "lucide-react";
import { useState } from "react";

interface AidRequest {
  id: string;
  title: string;
  description: string;
  goalAmount: number;
  raisedAmount: number;
  category: string;
  location: string;
  isAnonymous: boolean;
  isVerified: boolean;
  ngoName?: string;
  timeLeft: string;
  supportersCount: number;
  proofDocuments: string[];
}

interface RecurringDonation {
  id: string;
  amount: number;
  frequency: 'monthly' | 'weekly';
  isActive: boolean;
  totalDonated: number;
  startDate: string;
}

const PeriodAid = () => {
  const network = (contracts as any).defaultNetwork as 'sepolia'|'polygonMumbai';
  const PAD_ADDR = (contracts as any).contracts?.PeriodAidDonations?.[network] || '';
  const USDC_ADDR = (contracts as any).contracts?.USDC?.[network] || '';
  const { periodAid, withSigner } = useContracts();
  const { isConnected, connectWallet, usdcBalance, ethBalance } = useWallet();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("browse");
  const [selectedRequest, setSelectedRequest] = useState<AidRequest | null>(null);
  const [donationAmount, setDonationAmount] = useState("");
  const [recurringAmount, setRecurringAmount] = useState("");
  const [recurringFrequency, setRecurringFrequency] = useState<'monthly' | 'weekly'>('monthly');

  // Mock data for aid requests
  const aidRequests: AidRequest[] = [
    {
      id: "1",
      title: "Emergency Period Care for Rural School",
      description: "Supporting 200 girls in rural KwaZulu-Natal with menstrual products for 6 months",
      goalAmount: 500,
      raisedAmount: 320,
      category: "Menstrual Products",
      location: "KwaZulu-Natal, SA",
      isAnonymous: false,
      isVerified: true,
      ngoName: "Rural Education Foundation",
      timeLeft: "12 days left",
      supportersCount: 45,
      proofDocuments: ["receipt1.pdf", "delivery_proof.jpg"]
    },
    {
      id: "2",
      title: "Anonymous Community Support Request",
      description: "Help needed for monthly menstrual health supplies in underserved community",
      goalAmount: 150,
      raisedAmount: 80,
      category: "Menstrual Products",
      location: "Western Cape, SA",
      isAnonymous: true,
      isVerified: true,
      ngoName: "Community Health Partners",
      timeLeft: "8 days left",
      supportersCount: 23,
      proofDocuments: []
    },
    {
      id: "3",
      title: "University Student Emergency Fund",
      description: "Supporting female university students during exam period",
      goalAmount: 200,
      raisedAmount: 200,
      category: "Menstrual Products",
      location: "Gauteng, SA",
      isAnonymous: false,
      isVerified: true,
      ngoName: "Student Aid Network",
      timeLeft: "Completed",
      supportersCount: 67,
      proofDocuments: ["distribution_report.pdf", "receipts.zip"]
    }
  ];

  // Mock recurring donations
  const recurringDonations: RecurringDonation[] = [
    {
      id: "1",
      amount: 20,
      frequency: 'monthly',
      isActive: true,
      totalDonated: 140,
      startDate: "2024-01-15"
    }
  ];

  const handleDonate = async (requestId: string, amount: number) => {
  if (!isConnected) {
    toast({ title: "Wallet Required", description: "Connect your wallet to donate." });
    return;
  }
  try {
    if (!periodAid) throw new Error("Contract not configured");
    const signerC = await withSigner(periodAid as any);
    if (!signerC) throw new Error("No signer");
    // NOTE: User must have approved USDC to this contract beforehand; UI for approve can be added as needed.
    const tx = await (signerC as any).donate(Number(requestId), BigInt(Math.floor(amount * 1e6)));
    await tx.wait();
    toast({ title: "Donation successful", description: `Donated ${amount} USDC` });
  } catch (e:any) {
    toast({ title: "Donation failed", description: e?.message || "Try again" });
  }
};


  const handleRecurringSetup = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to set up recurring donations",
        variant: "destructive"
      });
      return;
    }

    const amount = parseFloat(recurringAmount);
    if (amount > usdcBalance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough USDC for this recurring donation",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Recurring Donation Set Up!",
      description: `${amount} USDC will be donated ${recurringFrequency} to verified requests`,
    });
  };

  const completedRequests = aidRequests.filter(req => req.raisedAmount >= req.goalAmount);
  const activeRequests = aidRequests.filter(req => req.raisedAmount < req.goalAmount);
  const totalRaised = aidRequests.reduce((sum, req) => sum + req.raisedAmount, 0);
  const totalSupporters = aidRequests.reduce((sum, req) => sum + req.supportersCount, 0);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            PeriodAid
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90">
            Blockchain Donations for Menstrual Health
          </p>
          <p className="text-lg mb-8 max-w-3xl mx-auto text-primary-foreground/80">
            Fighting Period Poverty through transparent blockchain donations. 
            Support women with menstrual health needs through verified NGOs and direct impact tracking.
          </p>
          
          {!isConnected && (
            <Button 
              variant="secondary" 
              size="lg" 
              onClick={connectWallet}
              className="gap-2"
            >
              <Shield className="w-5 h-5" />
              Connect Wallet to Donate
            </Button>
          )}
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="py-12 bg-background/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-primary">{totalRaised} USDC</CardTitle>
                <CardDescription>Total Raised</CardDescription>
              </CardHeader>
              <CardContent>
                <TrendingUp className="w-6 h-6 text-emerald-500" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-primary">{activeRequests.length}</CardTitle>
                <CardDescription>Active Campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <Target className="w-6 h-6 text-blue-500" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-primary">{totalSupporters}</CardTitle>
                <CardDescription>Total Supporters</CardDescription>
              </CardHeader>
              <CardContent>
                <Users className="w-6 h-6 text-purple-500" />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl font-bold text-primary">{completedRequests.length}</CardTitle>
                <CardDescription>Completed Campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <CheckCircle className="w-6 h-6 text-green-500" />
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="browse">Browse Requests</TabsTrigger>
              <TabsTrigger value="recurring">Recurring Donations</TabsTrigger>
              <TabsTrigger value="submit">Submit Request</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="impact">Impact Dashboard</TabsTrigger>
            </TabsList>

            {/* Browse Aid Requests */}
            <TabsContent value="browse" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aidRequests.map((request) => (
                  <Card key={request.id} className="hover:shadow-elegant transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{request.title}</CardTitle>
                          <CardDescription className="mb-3">{request.description}</CardDescription>
                        </div>
                        {request.isVerified && (
                          <Badge variant="secondary" className="gap-1">
                            <Shield className="w-3 h-3" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{request.raisedAmount}/{request.goalAmount} USDC</span>
                        </div>
                        <Progress 
                          value={(request.raisedAmount / request.goalAmount) * 100} 
                          className="h-2"
                        />
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Globe className="w-4 h-4" />
                          {request.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {request.supportersCount}
                        </div>
                      </div>
                      
                      {request.isAnonymous && (
                        <Badge variant="outline" className="gap-1">
                          <Lock className="w-3 h-3" />
                          Anonymous Request
                        </Badge>
                      )}
                      
                      {!request.isAnonymous && request.ngoName && (
                        <div className="text-sm">
                          <span className="text-muted-foreground">NGO: </span>
                          <span className="font-medium">{request.ngoName}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {request.timeLeft}
                        </span>
                        
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="empowerment" 
                              size="sm"
                              onClick={() => setSelectedRequest(request)}
                            >
                              <Heart className="w-4 h-4 mr-2" />
                              Donate
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Donate to: {request.title}</DialogTitle>
                              <DialogDescription>
                                Support menstrual health through secure blockchain donations
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="amount">Donation Amount (USDC)</Label>
                                <Input
                                  id="amount"
                                  type="number"
                                  placeholder="Enter amount"
                                  value={donationAmount}
                                  onChange={(e) => setDonationAmount(e.target.value)}
                                />
                              </div>
                              
                              <div className="text-sm text-muted-foreground">
                                Your wallet balance: {usdcBalance.toFixed(2)} USDC
                              </div>
                              
                              <Button 
                                onClick={() => handleDonate(request.id, parseFloat(donationAmount))}
                                disabled={!isConnected || !donationAmount}
                                className="w-full"
                              >
                                {!isConnected ? "Connect Wallet" : "Donate Now"}
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                      
                      {request.proofDocuments.length > 0 && (
                        <div className="pt-2 border-t">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <FileText className="w-4 h-4" />
                            <span>{request.proofDocuments.length} proof document(s) available</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Recurring Donations */}
            <TabsContent value="recurring" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Set Up Recurring Donations</CardTitle>
                  <CardDescription>
                    Automatically support new verified requests with monthly or weekly donations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="recurring-amount">Amount (USDC)</Label>
                      <Input
                        id="recurring-amount"
                        type="number"
                        placeholder="e.g., 20"
                        value={recurringAmount}
                        onChange={(e) => setRecurringAmount(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="frequency">Frequency</Label>
                      <Select value={recurringFrequency} onValueChange={(value: 'monthly' | 'weekly') => setRecurringFrequency(value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleRecurringSetup}
                    disabled={!isConnected || !recurringAmount}
                    className="w-full"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Set Up Recurring Donation
                  </Button>
                </CardContent>
              </Card>

              {/* Active Recurring Donations */}
              {recurringDonations.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Your Recurring Donations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {recurringDonations.map((donation) => (
                      <div key={donation.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">{donation.amount} USDC {donation.frequency}</div>
                          <div className="text-sm text-muted-foreground">
                            Total donated: {donation.totalDonated} USDC since {donation.startDate}
                          </div>
                        </div>
                        <Badge variant={donation.isActive ? "default" : "secondary"}>
                          {donation.isActive ? "Active" : "Paused"}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Submit Request */}
            <TabsContent value="submit" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Submit Aid Request</CardTitle>
                  <CardDescription>
                    Request support for menstrual health needs. All requests are reviewed by verified NGOs.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="request-title">Request Title</Label>
                    <Input id="request-title" placeholder="e.g., Emergency Period Care for School" />
                  </div>
                  
                  <div>
                    <Label htmlFor="request-description">Description</Label>
                    <Textarea 
                      id="request-description" 
                      placeholder="Describe your menstrual health support needs..."
                      rows={4}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="funding-goal">Funding Goal (USDC)</Label>
                      <Input id="funding-goal" type="number" placeholder="e.g., 150" />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" placeholder="e.g., Western Cape, SA" />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="anonymous" />
                    <Label htmlFor="anonymous">Submit anonymously (protects identity)</Label>
                  </div>
                  
                  <Button className="w-full" disabled={!isConnected}>
                    {!isConnected ? "Connect Wallet to Submit" : "Submit Request for Review"}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Education */}
            <TabsContent value="education" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Menstrual Health Education</CardTitle>
                    <CardDescription>Essential information for menstrual health and hygiene</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Key Topics:</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                        <li>Understanding menstrual cycles</li>
                        <li>Proper hygiene practices</li>
                        <li>Managing period pain</li>
                        <li>Menstrual product options</li>
                        <li>Breaking the stigma</li>
                      </ul>
                    </div>
                    <Button variant="outline" className="w-full">
                      Access Educational Resources
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Community Support</CardTitle>
                    <CardDescription>Connect with others and share experiences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold">Get Support:</h4>
                      <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                        <li>Anonymous community forums</li>
                        <li>Expert Q&A sessions</li>
                        <li>Peer support groups</li>
                        <li>Local resource directories</li>
                      </ul>
                    </div>
                    <Button variant="outline" className="w-full">
                      Join Community
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Impact Dashboard */}
            <TabsContent value="impact" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold text-primary">2,340</CardTitle>
                    <CardDescription>Menstrual products distributed</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary">This month: +340</Badge>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold text-primary">890</CardTitle>
                    <CardDescription>Women and girls supported</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary">This month: +120</Badge>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold text-primary">45</CardTitle>
                    <CardDescription>Partner NGOs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary">Verified organizations</Badge>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recent Impact Reports</CardTitle>
                  <CardDescription>Transparency through blockchain-verified delivery reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {completedRequests.map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <div className="font-medium">{request.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {request.raisedAmount} USDC raised • {request.supportersCount} supporters
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="default" className="mb-2">Completed</Badge>
                          <div className="text-sm text-muted-foreground">
                            {request.proofDocuments.length} proof docs
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PeriodAid;

// Approve USDC spending helper
async function approveUSDC(amountUSDC: number) {
  try {
    if (!window.ethereum) throw new Error('No wallet');
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    if (!USDC_ADDR || !PAD_ADDR) throw new Error('Configure USDC and PeriodAid addresses in src/config/contracts.json');
    const erc20 = new ethers.Contract(USDC_ADDR, ERC20ABI as any, signer);
    const decimals = 6;
    const amount = ethers.parseUnits(String(amountUSDC), decimals);
    const tx = await erc20.approve(PAD_ADDR, amount);
    await tx.wait();
    alert('Approval successful');
  } catch (e:any) {
    alert('Approval failed: ' + (e?.message || 'unknown'));
  }
}
