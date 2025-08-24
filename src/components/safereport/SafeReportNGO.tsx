import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, Users, CheckCircle, X, Clock, DollarSign, FileText, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SafeReportPage, Report, Donation } from '../SafeReportApp';
import { WalletState } from '@/hooks/useWallet';
import { WalletBalance } from './WalletBalance';

interface SafeReportNGOProps {
  navigateTo: (page: SafeReportPage) => void;
  reports: Report[];
  donations: Donation[];
  updateReportStatus: (reportId: string, status: Report['status']) => void;
  wallet: WalletState & {
    connectWallet: () => Promise<string | undefined>;
    disconnectWallet: () => void;
    formatAddress: (address: string) => string;
    updateBalances: () => Promise<void>;
    convertUSDToZAR: (usd: number) => number;
    convertETHToZAR: (eth: number) => number;
  };
}

export const SafeReportNGO = ({ navigateTo, reports, donations, updateReportStatus, wallet }: SafeReportNGOProps) => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { toast } = useToast();

  const pendingReports = reports.filter(report => report.status === 'pending');
  const verifiedReports = reports.filter(report => report.status === 'verified');
  const rejectedReports = reports.filter(report => report.status === 'rejected');

  const getReportDonations = (reportId: string) => {
    return donations.filter(donation => donation.reportId === reportId);
  };

  const getTotalRaised = (reportId: string) => {
    return getReportDonations(reportId).reduce((sum, donation) => sum + donation.amount, 0);
  };

  const handleStatusUpdate = async (reportId: string, status: Report['status']) => {
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      updateReportStatus(reportId, status);
      setIsProcessing(false);
      setSelectedReport(null);
      
      toast({
        title: "Status Updated",
        description: `Report has been ${status}.`,
      });
    }, 1500);
  };

  const getStatusBadge = (status: Report['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600"><Clock className="w-3 h-3 mr-1" />Pending Review</Badge>;
      case 'verified':
        return <Badge variant="outline" className="text-green-600 border-green-600"><CheckCircle className="w-3 h-3 mr-1" />Verified</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="text-red-600 border-red-600"><X className="w-3 h-3 mr-1" />Rejected</Badge>;
    }
  };

  const ReportCard = ({ report }: { report: Report }) => {
    const reportDonations = getReportDonations(report.id);
    const totalRaised = getTotalRaised(report.id);
    
    return (
      <Card className="hover:shadow-lg transition-shadow">
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
            {getStatusBadge(report.status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {report.description}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Reported:</span>
              <p className="font-medium">{report.timestamp.toLocaleDateString()}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Case ID:</span>
              <p className="font-mono text-xs">{report.id}</p>
            </div>
          </div>

          {report.needsFinancialAssistance && (
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Financial Aid:</span>
                <span className="font-medium">
                  R{totalRaised.toLocaleString()} / R{report.requestedAmount?.toLocaleString() || 0}
                </span>
              </div>
              {reportDonations.length > 0 && (
                <p className="text-xs text-muted-foreground mt-1">
                  {reportDonations.length} donation{reportDonations.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          )}

          <div className="flex justify-between">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setSelectedReport(report)}>
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </DialogTrigger>
            </Dialog>

            {report.status === 'pending' && (
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="text-red-600 hover:text-red-700"
                  onClick={() => handleStatusUpdate(report.id, 'rejected')}
                  disabled={isProcessing}
                >
                  <X className="w-4 h-4 mr-1" />
                  Reject
                </Button>
                <Button 
                  size="sm" 
                  variant="empowerment"
                  onClick={() => handleStatusUpdate(report.id, 'verified')}
                  disabled={isProcessing}
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Verify
                </Button>
              </div>
            )}
          </div>
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
            <Users className="w-8 h-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold">NGO Dashboard</h1>
          </div>
        </div>

        {/* Wallet Connection */}
        <div className="flex items-center space-x-4">
          {wallet.isConnected ? (
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-muted-foreground">
                NGO: {wallet.formatAddress(wallet.address!)}
              </span>
              <Button variant="outline" size="sm" onClick={wallet.disconnectWallet}>
                Disconnect
              </Button>
            </div>
          ) : (
            <Button variant="empowerment" onClick={wallet.connectWallet} disabled={wallet.isConnecting}>
              {wallet.isConnecting ? 'Connecting...' : 'Connect NGO Wallet'}
            </Button>
          )}
        </div>
      </div>

      {/* Access Control */}
      {!wallet.isConnected ? (
        <Card className="text-center p-8">
          <CardContent>
            <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">NGO Access Required</h3>
            <p className="text-muted-foreground mb-4">
              Please connect your verified NGO wallet to access the dashboard and review reports.
            </p>
            <Button variant="empowerment" onClick={wallet.connectWallet} disabled={wallet.isConnecting}>
              Connect NGO Wallet
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Wallet Balance */}
          <WalletBalance wallet={wallet} />

          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-yellow-500" />
                  <div>
                    <p className="text-2xl font-bold">{pendingReports.length}</p>
                    <p className="text-sm text-muted-foreground">Pending Review</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-2xl font-bold">{verifiedReports.length}</p>
                    <p className="text-sm text-muted-foreground">Verified</p>
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
                      R{donations.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">Total Raised (ZAR)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{reports.length}</p>
                    <p className="text-sm text-muted-foreground">Total Reports</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reports Tabs */}
          <Tabs defaultValue="pending" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">
                Pending Review ({pendingReports.length})
              </TabsTrigger>
              <TabsTrigger value="verified">
                Verified ({verifiedReports.length})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected ({rejectedReports.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              {pendingReports.length === 0 ? (
                <Card className="text-center p-8">
                  <CardContent>
                    <Clock className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">No Pending Reports</h3>
                    <p className="text-muted-foreground">All reports have been reviewed.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingReports.map((report) => (
                    <ReportCard key={report.id} report={report} />
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="verified" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {verifiedReports.map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rejected" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rejectedReports.map((report) => (
                  <ReportCard key={report.id} report={report} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}

      {/* Report Details Dialog */}
      {selectedReport && (
        <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-start justify-between">
                <div>
                  <DialogTitle className="text-xl">{selectedReport.title}</DialogTitle>
                  <Badge variant="secondary" className="mt-2">
                    {selectedReport.category}
                  </Badge>
                </div>
                {getStatusBadge(selectedReport.status)}
              </div>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Report Details</h4>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {selectedReport.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Submitted:</span>
                  <p className="font-medium">{selectedReport.timestamp.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Case ID:</span>
                  <p className="font-mono text-sm">{selectedReport.id}</p>
                </div>
              </div>

              {selectedReport.evidenceHash && (
                <div>
                  <span className="text-sm text-muted-foreground">Evidence Hash:</span>
                  <p className="font-mono text-sm bg-muted p-2 rounded">
                    {selectedReport.evidenceHash}
                  </p>
                </div>
              )}

              {selectedReport.needsFinancialAssistance && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-2">Financial Assistance Request</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-muted-foreground">Requested:</span>
                      <p className="font-medium">R{selectedReport.requestedAmount?.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Raised:</span>
                      <p className="font-medium">R{getTotalRaised(selectedReport.id).toLocaleString()}</p>
                    </div>
                  </div>
                  
                  {getReportDonations(selectedReport.id).length > 0 && (
                    <div className="mt-4">
                      <h5 className="font-medium mb-2">Recent Donations</h5>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                         {getReportDonations(selectedReport.id).map((donation) => (
                           <div key={donation.id} className="flex justify-between text-sm p-2 bg-muted/30 rounded">
                             <span>{wallet.formatAddress(donation.donor)}</span>
                             <span className="font-medium">R{donation.amount.toLocaleString()}</span>
                           </div>
                         ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedReport.status === 'pending' && (
                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button 
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleStatusUpdate(selectedReport.id, 'rejected')}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Reject Report'}
                  </Button>
                  <Button 
                    variant="empowerment"
                    onClick={() => handleStatusUpdate(selectedReport.id, 'verified')}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'Verify Report'}
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};