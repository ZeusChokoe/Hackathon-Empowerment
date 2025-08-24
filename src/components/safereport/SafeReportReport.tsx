import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Shield, Upload, Send, CheckCircle, Wallet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SafeReportPage, Report } from '../SafeReportApp';
import { useWallet } from '@/hooks/useWallet';
import { WalletBalance } from './WalletBalance';

interface SafeReportReportProps {
  navigateTo: (page: SafeReportPage) => void;
  addReport: (report: Omit<Report, 'id' | 'timestamp' | 'status'>) => void;
}

export const SafeReportReport = ({ navigateTo, addReport }: SafeReportReportProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [needsFinancialAssistance, setNeedsFinancialAssistance] = useState(false);
  const [requestedAmount, setRequestedAmount] = useState('');
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const wallet = useWallet();

  const categories = [
    'Harassment',
    'Violence', 
    'Workplace Abuse',
    'Domestic Abuse',
    'Sexual Assault',
    'Discrimination',
    'Others'
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setEvidenceFile(file);
      toast({
        title: "File Uploaded",
        description: `${file.name} has been encrypted and prepared for submission.`,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate encryption and blockchain submission
    setTimeout(() => {
      const newReport: Omit<Report, 'id' | 'timestamp' | 'status'> = {
        title,
        description,
        category,
        needsFinancialAssistance,
        requestedAmount: needsFinancialAssistance ? Number(requestedAmount) : undefined,
        raisedAmount: 0,
        evidenceHash: evidenceFile ? `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}` : undefined
      };

      addReport(newReport);
      setIsSubmitting(false);

      toast({
        title: "Report Submitted Successfully",
        description: "Your anonymous report has been encrypted and stored securely on the blockchain. Case ID: " + Math.random().toString(16).substr(2, 8),
      });

      // Reset form
      setTitle('');
      setDescription('');
      setCategory('');
      setNeedsFinancialAssistance(false);
      setRequestedAmount('');
      setEvidenceFile(null);

      // Navigate back to home after successful submission
      setTimeout(() => navigateTo('home'), 2000);
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Button variant="ghost" onClick={() => navigateTo('home')} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold">File Anonymous Report</h1>
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
              variant="outline" 
              onClick={wallet.connectWallet}
              disabled={wallet.isConnecting}
            >
              <Wallet className="w-4 h-4 mr-2" />
              {wallet.isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </Button>
          )}
        </div>
      </div>

      {/* Wallet Balance */}
      {wallet.isConnected && (
        <WalletBalance wallet={wallet} />
      )}

      {/* Privacy Notice */}
      <Card className="mb-8 bg-primary/5 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-primary mb-2">Your Privacy & Safety</h3>
              <p className="text-sm text-muted-foreground">
                This report is completely anonymous. Your identity will never be stored or linked to this report. 
                All data is encrypted and stored securely on the blockchain. Only verified NGOs and DAO members 
                can access reports for validation purposes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Form */}
      <Card>
        <CardHeader>
          <CardTitle>Report Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Selection */}
            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Brief title for your report"
                maxLength={100}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed description of the incident. Include when, where (general location), and what happened."
                rows={6}
                maxLength={2000}
              />
              <p className="text-sm text-muted-foreground">
                {description.length}/2000 characters
              </p>
            </div>

            {/* Evidence Upload */}
            <div className="space-y-2">
              <Label htmlFor="evidence">Evidence (Optional)</Label>
              <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-2">
                  Upload photos, documents, or other evidence (encrypted automatically)
                </p>
                <input
                  type="file"
                  id="evidence"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => document.getElementById('evidence')?.click()}
                >
                  Choose File
                </Button>
                {evidenceFile && (
                  <p className="text-sm text-primary mt-2">
                    📎 {evidenceFile.name} (encrypted)
                  </p>
                )}
              </div>
            </div>

            {/* Financial Assistance */}
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="financial-assistance"
                  checked={needsFinancialAssistance}
                  onCheckedChange={(checked) => setNeedsFinancialAssistance(checked as boolean)}
                />
                <Label htmlFor="financial-assistance" className="text-sm">
                  I need financial assistance for medical, legal, or recovery needs
                </Label>
              </div>

              {needsFinancialAssistance && (
                <div className="space-y-2">
                  <Label htmlFor="requested-amount">Requested Amount (ZAR)</Label>
                  <Input
                    id="requested-amount"
                    type="number"
                    value={requestedAmount}
                    onChange={(e) => setRequestedAmount(e.target.value)}
                    placeholder="e.g., 9250"
                    min="100"
                    max="185000"
                  />
                  <p className="text-xs text-muted-foreground">
                    Briefly explain what the funds will be used for in your description above.
                  </p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigateTo('home')}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="empowerment"
                disabled={isSubmitting}
                className="min-w-[140px]"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Report
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};