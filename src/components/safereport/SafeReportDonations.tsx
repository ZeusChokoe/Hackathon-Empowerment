import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Heart, Wallet, CheckCircle, Clock, DollarSign, Fuel, Info, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SafeReportPage, Report, Donation } from '../SafeReportApp';
import { WalletState } from '@/hooks/useWallet';
import { WalletBalance } from './WalletBalance';
import { ContractStructure } from './ContractStructure';
import { DonationReceipt } from './DonationReceipt';

interface SafeReportDonationsProps {
  navigateTo: (page: SafeReportPage) => void;
  reports: Report[];
  addDonation: (donation: Omit<Donation, 'id' | 'timestamp'>) => void;
  wallet: WalletState & {
    connectWallet: () => Promise<string | undefined>;
    disconnectWallet: () => void;
    formatAddress: (address: string) => string;
    updateBalances: () => Promise<void>;
    estimateGas: (amount: number, tokenType?: 'ETH' | 'USDC' | 'SAFE') => any;
    convertUSDToZAR: (usd: number) => number;
    convertETHToZAR: (eth: number) => number;
  };
}

export const SafeReportDonations = ({ navigateTo, reports, addDonation, wallet }: SafeReportDonationsProps) => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [tokenType, setTokenType] = useState<'USDC' | 'ETH' | 'SAFE'>('USDC');
  const [isDonating, setIsDonating] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastDonation, setLastDonation] = useState<any>(null);
  const [currentView, setCurrentView] = useState<'donations' | 'contracts'>('donations');
  
  const { toast } = useToast();

  const verifiedReportsNeedingFunds = reports.filter(
    report => report.status === 'verified' && report.needsFinancialAssistance
  );

  const getProgressPercentage = (report: Report) => {
    if (!report.requestedAmount || !report.raisedAmount) return 0;
    return Math.min((report.raisedAmount / report.requestedAmount) * 100, 100);
  };

  const getRemainingAmount = (report: Report) => {
    if (!report.requestedAmount || !report.raisedAmount) return report.requestedAmount || 0;
    return Math.max(report.requestedAmount - report.raisedAmount, 0);
  };

  const convertToZAR = (usdAmount: number) => {
    return wallet.convertUSDToZAR(usdAmount);
  };

  const getTokenBalance = () => {
    switch (tokenType) {
      case 'ETH': return wallet.ethBalance;
      case 'USDC': return wallet.usdcBalance;
      case 'SAFE': return wallet.tokenBalance;
      default: return 0;
    }
  };

  const getTokenValueInZAR = (amount: number) => {
    switch (tokenType) {
      case 'ETH': return wallet.convertETHToZAR(amount);
      case 'USDC': return wallet.convertUSDToZAR(amount);
      case 'SAFE': return amount * 2.5 * 18.5; // Assuming 1 SAFE = $2.5
      default: return 0;
    }
  };

  const handleDonate = async () => {
    if (!selectedReport || !donationAmount || !wallet.isConnected) {
      toast({
        title: "Missing Information",
        description: "Please connect your wallet and enter a donation amount.",
        variant: "destructive"
      });
      return;
    }

    const amount = parseFloat(donationAmount);
    if (amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive"
      });
      return;
    }

    // Check balance
    const tokenBalance = getTokenBalance();
    if (amount > tokenBalance) {
      toast({
        title: "Insufficient Balance",
        description: `You only have ${tokenBalance.toFixed(4)} ${tokenType} available.`,
        variant: "destructive"
      });
      return;
    }

    setIsDonating(true);

    // Estimate gas fees
    const gasEstimate = wallet.estimateGas(amount, tokenType);

    // Simulate blockchain transaction
    setTimeout(() => {
      const zarAmount = getTokenValueInZAR(amount);

      const newDonation = {
        reportId: selectedReport.id,
        amount: zarAmount,
        donor: wallet.address!
      };

      addDonation(newDonation);

      // Create receipt data
      const receiptData = {
        donation: { ...newDonation, id: Date.now().toString() },
        report: selectedReport,
        txHash: `0x${Math.random().toString(16).substr(2, 64)}`,
        gasUsed: gasEstimate.gasLimit,
        gasFeeZAR: gasEstimate.gasFeeZAR,
        timestamp: new Date(),
        tokenType,
        tokenAmount: amount,
      };

      setLastDonation(receiptData);
      setShowReceipt(true);

      toast({
        title: "Donation Successful",
        description: `Successfully donated ${amount} ${tokenType} (R${getTokenValueInZAR(amount).toLocaleString('en-ZA')}) to support this survivor.`,
      });

      setDonationAmount('');
      setSelectedReport(null);
      setIsDonating(false);
      
      // Update balances
      wallet.updateBalances();
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => navigateTo('home')} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center">
            <Heart className="w-8 h-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold">Support Survivors</h1>
          </div>
        </div>

        {/* Wallet Connection */}
        <div className="flex items-center space-x-4">
          {wallet.isConnected ? (
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-muted-foreground">
                {wallet.formatAddress(wallet.address!)}
              </span>
              <Button variant="outline" size="sm" onClick={wallet.disconnectWallet}>
                Disconnect
              </Button>
            </div>
          ) : (
            <Button 
              variant="empowerment" 
              onClick={wallet.connectWallet}
              disabled={wallet.isConnecting}
            >
              <Wallet className="w-4 h-4 mr-2" />
              {wallet.isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={currentView} onValueChange={(value) => setCurrentView(value as 'donations' | 'contracts')} className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="donations">Donate to Cases</TabsTrigger>
          <TabsTrigger value="contracts">Smart Contracts</TabsTrigger>
        </TabsList>

        <TabsContent value="donations" className="space-y-8">
          {/* Wallet Balance */}
          {wallet.isConnected && (
            <WalletBalance wallet={wallet} />
          )}

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{verifiedReportsNeedingFunds.length}</p>
                    <p className="text-sm text-muted-foreground">Cases Need Support</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">
                      R{convertToZAR(verifiedReportsNeedingFunds
                        .reduce((sum, report) => sum + (getRemainingAmount(report) || 0), 0))
                        .toLocaleString('en-ZA')}
                    </p>
                    <p className="text-sm text-muted-foreground">Still Needed (ZAR)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">
                      R{convertToZAR(verifiedReportsNeedingFunds
                        .reduce((sum, report) => sum + (report.raisedAmount || 0), 0))
                        .toLocaleString('en-ZA')}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Raised (ZAR)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {verifiedReportsNeedingFunds.map((report) => {
          const progressPercentage = getProgressPercentage(report);
          const remainingAmount = getRemainingAmount(report);
          
          return (
            <Card key={report.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {report.category}
                    </Badge>
                    <CardTitle className="text-lg leading-tight">
                      {report.title}
                    </CardTitle>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {report.description}
                </p>

                {/* Funding Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">
                      R{convertToZAR(report.raisedAmount || 0).toLocaleString('en-ZA')} / R{convertToZAR(report.requestedAmount || 0).toLocaleString('en-ZA')}
                    </span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{Math.round(progressPercentage)}% funded</span>
                    <span>R{convertToZAR(remainingAmount).toLocaleString('en-ZA')} remaining</span>
                  </div>
                </div>

                {/* Timestamp */}
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 mr-1" />
                  Reported {report.timestamp.toLocaleDateString()}
                </div>

                {/* Donate Button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full" 
                      variant="donate"
                      onClick={() => setSelectedReport(report)}
                      disabled={progressPercentage >= 100}
                    >
                      {progressPercentage >= 100 ? 'Fully Funded' : 'Donate Now'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Support This Survivor</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="p-4 bg-muted/30 rounded-lg">
                        <h4 className="font-medium mb-2">{selectedReport?.title}</h4>
                        <Badge variant="secondary" className="mb-2">
                          {selectedReport?.category}
                        </Badge>
                        <p className="text-sm text-muted-foreground">
                          Still needed: R{convertToZAR(remainingAmount).toLocaleString('en-ZA')}
                        </p>
                      </div>

                      {!wallet.isConnected ? (
                        <div className="text-center py-4">
                          <p className="text-sm text-muted-foreground mb-4">
                            Connect your wallet to make a donation
                          </p>
                          <Button onClick={wallet.connectWallet} disabled={wallet.isConnecting}>
                            <Wallet className="w-4 h-4 mr-2" />
                            {wallet.isConnecting ? 'Connecting...' : 'Connect Wallet'}
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {/* Token Selection */}
                          <div>
                            <Label htmlFor="token">Payment Token</Label>
                            <Select value={tokenType} onValueChange={(value: 'USDC' | 'ETH' | 'SAFE') => setTokenType(value)}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="USDC">
                                  USDC (R{wallet.convertUSDToZAR(wallet.usdcBalance).toFixed(0)} available)
                                </SelectItem>
                                <SelectItem value="ETH">
                                  ETH ({wallet.ethBalance.toFixed(4)} available)
                                </SelectItem>
                                <SelectItem value="SAFE">
                                  SAFE ({wallet.tokenBalance.toFixed(2)} available)
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="amount">Donation Amount ({tokenType})</Label>
                            <Input
                              id="amount"
                              type="number"
                              value={donationAmount}
                              onChange={(e) => setDonationAmount(e.target.value)}
                              placeholder={`Enter ${tokenType} amount`}
                              min="0.001"
                              max={getTokenBalance().toString()}
                              step="0.001"
                            />
                            {donationAmount && (
                              <p className="text-sm text-muted-foreground mt-1">
                                ≈ R{getTokenValueInZAR(parseFloat(donationAmount) || 0).toLocaleString('en-ZA')} ZAR
                              </p>
                            )}
                          </div>

                          {/* Gas Estimation */}
                          {donationAmount && (
                            <div className="bg-muted/30 rounded-lg p-3">
                              <div className="flex items-center space-x-2 mb-2">
                                <Fuel className="w-4 h-4 text-orange-500" />
                                <span className="text-sm font-medium">Transaction Details</span>
                              </div>
                              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                                <div>
                                  <span>Est. Gas Fee:</span>
                                  <p className="font-medium">
                                    R{wallet.estimateGas(parseFloat(donationAmount) || 0, tokenType).gasFeeZAR.toFixed(2)}
                                  </p>
                                </div>
                                <div>
                                  <span>Network:</span>
                                  <p className="font-medium">Ethereum ({wallet.gasPrice} Gwei)</p>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" onClick={() => setSelectedReport(null)}>
                              Cancel
                            </Button>
                            <Button 
                              onClick={handleDonate} 
                              disabled={isDonating || !donationAmount || parseFloat(donationAmount) > getTokenBalance()}
                              variant="donate"
                            >
                              {isDonating ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <Heart className="w-4 h-4 mr-2" />
                                  Donate {donationAmount} {tokenType}
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          );
            })}
          </div>

          {verifiedReportsNeedingFunds.length === 0 && (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Cases Currently Need Funding</h3>
              <p className="text-muted-foreground mb-4">
                All verified cases have been fully funded. Thank you for your generosity!
              </p>
              <Button onClick={() => navigateTo('home')} variant="outline">
                Return to Home
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="contracts">
          <ContractStructure />
        </TabsContent>
      </Tabs>

      {/* Donation Receipt Dialog */}
      {showReceipt && lastDonation && (
        <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
          <DialogContent className="max-w-lg">
            <DonationReceipt
              donation={lastDonation.donation}
              report={lastDonation.report}
              txHash={lastDonation.txHash}
              gasUsed={lastDonation.gasUsed}
              gasFeeZAR={lastDonation.gasFeeZAR}
              timestamp={lastDonation.timestamp}
              onClose={() => setShowReceipt(false)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};