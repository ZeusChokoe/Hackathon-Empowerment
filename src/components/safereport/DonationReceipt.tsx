import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Receipt, Download, Share2, ExternalLink, CheckCircle } from 'lucide-react';
import { Report, Donation } from '../SafeReportApp';

interface DonationReceiptProps {
  donation: Donation;
  report: Report;
  txHash: string;
  gasUsed: number;
  gasFeeZAR: number;
  timestamp: Date;
  onClose: () => void;
}

export const DonationReceipt = ({ 
  donation, 
  report, 
  txHash, 
  gasUsed, 
  gasFeeZAR, 
  timestamp, 
  onClose 
}: DonationReceiptProps) => {
  const zarAmount = donation.amount * 18.5; // USD to ZAR conversion

  const handleDownload = () => {
    // Create downloadable receipt
    const receiptData = {
      donationId: donation.id,
      reportId: report.id,
      amount: donation.amount,
      zarAmount,
      txHash,
      timestamp: timestamp.toISOString(),
      donor: donation.donor,
      category: report.category,
    };
    
    const blob = new Blob([JSON.stringify(receiptData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SafeReport-Donation-${donation.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    const shareText = `I just donated R${zarAmount.toLocaleString('en-ZA')} to support a survivor through SafeReport! 🤝💙 #SafeReport #SurvivorSupport`;
    
    if (navigator.share) {
      navigator.share({
        title: 'SafeReport Donation',
        text: shareText,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(shareText);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <CardTitle className="text-xl text-green-700">Donation Successful!</CardTitle>
        <p className="text-sm text-muted-foreground">
          Your contribution is making a difference
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4 pt-6">
        {/* Donation Details */}
        <div className="text-center">
          <div className="text-3xl font-bold text-primary mb-2">
            R{zarAmount.toLocaleString('en-ZA')}
          </div>
          <p className="text-sm text-muted-foreground">
            ${donation.amount} USD donated to survivor support
          </p>
        </div>

        <Separator />

        {/* Transaction Info */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Case Category:</span>
            <Badge variant="secondary">{report.category}</Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Transaction ID:</span>
            <div className="flex items-center space-x-1">
              <code className="text-xs bg-muted px-2 py-1 rounded">
                {txHash.slice(0, 8)}...{txHash.slice(-6)}
              </code>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Gas Used:</span>
            <span className="text-sm font-medium">
              {gasUsed.toLocaleString()} units (R{gasFeeZAR.toFixed(2)})
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Timestamp:</span>
            <span className="text-sm font-medium">
              {timestamp.toLocaleString('en-ZA')}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">From Wallet:</span>
            <code className="text-xs bg-muted px-2 py-1 rounded">
              {donation.donor.slice(0, 6)}...{donation.donor.slice(-4)}
            </code>
          </div>
        </div>

        <Separator />

        {/* Impact Statement */}
        <div className="bg-primary/5 rounded-lg p-4 text-center">
          <h4 className="font-semibold text-primary mb-2">Your Impact</h4>
          <p className="text-sm text-muted-foreground">
            This donation helps provide immediate support for survivors, including emergency housing, 
            legal assistance, and medical care. Thank you for making a difference! 🙏
          </p>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleDownload} className="flex-1">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" onClick={handleShare} className="flex-1">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>

        <Button onClick={onClose} className="w-full" variant="default">
          Continue
        </Button>

        {/* Tax Info */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            🧾 Tax receipt available for South African donors above R1,000
          </p>
        </div>
      </CardContent>
    </Card>
  );
};