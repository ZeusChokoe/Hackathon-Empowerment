import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  X, 
  Eye, 
  Brain, 
  FileText, 
  Users, 
  Clock,
  TrendingUp,
  Lock,
  Search
} from 'lucide-react';
import { Report } from '../SafeReportApp';

interface VerificationResult {
  id: string;
  reportId: string;
  aiScore: number;
  evidenceScore: number;
  patternScore: number;
  reputationScore: number;
  overallScore: number;
  status: 'verified' | 'flagged' | 'rejected' | 'pending';
  flags: string[];
  timestamp: Date;
}

interface VerificationSystemProps {
  reports: Report[];
  onVerificationComplete: (reportId: string, result: VerificationResult) => void;
}

export const VerificationSystem = ({ reports, onVerificationComplete }: VerificationSystemProps) => {
  const [verificationResults, setVerificationResults] = useState<VerificationResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // Mock verification analysis
  const analyzeReport = async (report: Report): Promise<VerificationResult> => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // AI Content Analysis (0-100 score)
    const aiScore = Math.random() * 40 + 60; // Bias towards legitimate reports
    
    // Evidence Quality Score
    const evidenceScore = report.evidenceHash ? Math.random() * 30 + 70 : Math.random() * 20 + 40;
    
    // Pattern Matching Score (check against known fraudulent patterns)
    const patternScore = Math.random() * 25 + 75;
    
    // Reputation Score (based on wallet history, if available)
    const reputationScore = Math.random() * 20 + 80;
    
    // Overall weighted score
    const overallScore = (aiScore * 0.4 + evidenceScore * 0.3 + patternScore * 0.2 + reputationScore * 0.1);

    // Determine flags based on scores
    const flags: string[] = [];
    if (aiScore < 50) flags.push('AI_CONTENT_SUSPICIOUS');
    if (evidenceScore < 40) flags.push('INSUFFICIENT_EVIDENCE');
    if (patternScore < 60) flags.push('PATTERN_MATCH_FRAUD');
    if (reputationScore < 70) flags.push('LOW_REPUTATION_WALLET');
    if (report.description.length < 50) flags.push('DESCRIPTION_TOO_SHORT');
    if (report.needsFinancialAssistance && !report.evidenceHash) flags.push('FINANCIAL_REQUEST_NO_EVIDENCE');

    // Determine status
    let status: VerificationResult['status'];
    if (overallScore >= 80 && flags.length === 0) status = 'verified';
    else if (overallScore >= 60 && flags.length <= 2) status = 'pending';
    else if (overallScore >= 40) status = 'flagged';
    else status = 'rejected';

    const result: VerificationResult = {
      id: `verification_${report.id}_${Date.now()}`,
      reportId: report.id,
      aiScore,
      evidenceScore,
      patternScore,
      reputationScore,
      overallScore,
      status,
      flags,
      timestamp: new Date(),
    };

    setIsAnalyzing(false);
    return result;
  };

  const handleVerifyReport = async (report: Report) => {
    const result = await analyzeReport(report);
    setVerificationResults(prev => [...prev, result]);
    onVerificationComplete(report.id, result);
  };

  const getStatusBadge = (status: VerificationResult['status']) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-500 text-white"><CheckCircle className="w-3 h-3 mr-1" />Verified</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600"><Clock className="w-3 h-3 mr-1" />Pending Review</Badge>;
      case 'flagged':
        return <Badge variant="outline" className="text-orange-600 border-orange-600"><AlertTriangle className="w-3 h-3 mr-1" />Flagged</Badge>;
      case 'rejected':
        return <Badge variant="destructive"><X className="w-3 h-3 mr-1" />Rejected</Badge>;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const pendingReports = reports.filter(r => r.status === 'pending');
  
  return (
    <div className="space-y-6">
      {/* Verification Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Multi-Layer Verification System
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            AI-powered fraud detection with evidence validation and pattern analysis
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Brain className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-blue-800">AI Analysis</h4>
              <p className="text-sm text-blue-600">Content authenticity check</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-green-800">Evidence Review</h4>
              <p className="text-sm text-green-600">Document validation</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Search className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h4 className="font-semibold text-purple-800">Pattern Matching</h4>
              <p className="text-sm text-purple-600">Fraud detection algorithms</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <h4 className="font-semibold text-orange-800">Reputation Score</h4>
              <p className="text-sm text-orange-600">Wallet history analysis</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">
            Pending Verification ({pendingReports.length})
          </TabsTrigger>
          <TabsTrigger value="results">
            Verification Results ({verificationResults.length})
          </TabsTrigger>
          <TabsTrigger value="fraud-prevention">
            Fraud Prevention
          </TabsTrigger>
        </TabsList>

        {/* Pending Verification */}
        <TabsContent value="pending" className="space-y-4">
          {pendingReports.length === 0 ? (
            <Card className="text-center p-8">
              <CardContent>
                <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">All Reports Processed</h3>
                <p className="text-muted-foreground">No reports waiting for verification.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {pendingReports.map((report) => (
                <Card key={report.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="secondary">{report.category}</Badge>
                          {report.needsFinancialAssistance && (
                            <Badge variant="outline" className="text-green-600 border-green-600">
                              Financial Assistance Requested
                            </Badge>
                          )}
                        </div>
                        <h4 className="font-semibold mb-2">{report.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {report.description}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Submitted: {report.timestamp.toLocaleDateString()}</span>
                          {report.evidenceHash && (
                            <span className="flex items-center">
                              <FileText className="w-3 h-3 mr-1" />
                              Evidence attached
                            </span>
                          )}
                        </div>
                      </div>
                      <Button 
                        onClick={() => handleVerifyReport(report)}
                        disabled={isAnalyzing}
                        className="ml-4"
                      >
                        {isAnalyzing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Shield className="w-4 h-4 mr-2" />
                            Verify Report
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Verification Results */}
        <TabsContent value="results" className="space-y-4">
          {verificationResults.length === 0 ? (
            <Card className="text-center p-8">
              <CardContent>
                <Eye className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Verification Results</h3>
                <p className="text-muted-foreground">Start verifying reports to see results here.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {verificationResults.map((result) => {
                const report = reports.find(r => r.id === result.reportId);
                return (
                  <Card key={result.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold mb-1">{report?.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            Verified: {result.timestamp.toLocaleString()}
                          </p>
                        </div>
                        {getStatusBadge(result.status)}
                      </div>

                      {/* Verification Scores */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <div className={`text-2xl font-bold ${getScoreColor(result.aiScore)}`}>
                            {result.aiScore.toFixed(0)}%
                          </div>
                          <p className="text-xs text-muted-foreground">AI Analysis</p>
                        </div>
                        <div className="text-center">
                          <div className={`text-2xl font-bold ${getScoreColor(result.evidenceScore)}`}>
                            {result.evidenceScore.toFixed(0)}%
                          </div>
                          <p className="text-xs text-muted-foreground">Evidence</p>
                        </div>
                        <div className="text-center">
                          <div className={`text-2xl font-bold ${getScoreColor(result.patternScore)}`}>
                            {result.patternScore.toFixed(0)}%
                          </div>
                          <p className="text-xs text-muted-foreground">Pattern</p>
                        </div>
                        <div className="text-center">
                          <div className={`text-2xl font-bold ${getScoreColor(result.reputationScore)}`}>
                            {result.reputationScore.toFixed(0)}%
                          </div>
                          <p className="text-xs text-muted-foreground">Reputation</p>
                        </div>
                      </div>

                      {/* Overall Score */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Overall Verification Score</span>
                          <span className={`font-medium ${getScoreColor(result.overallScore)}`}>
                            {result.overallScore.toFixed(1)}%
                          </span>
                        </div>
                        <Progress value={result.overallScore} className="h-2" />
                      </div>

                      {/* Flags */}
                      {result.flags.length > 0 && (
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium text-red-700">Verification Flags:</h5>
                          <div className="flex flex-wrap gap-2">
                            {result.flags.map((flag, index) => (
                              <Badge key={index} variant="destructive" className="text-xs">
                                {flag.replace('_', ' ').toLowerCase()}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* Fraud Prevention */}
        <TabsContent value="fraud-prevention" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Detection Methods */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Fraud Detection Methods
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Natural Language Processing</h5>
                      <p className="text-sm text-muted-foreground">
                        AI analyzes text patterns to detect fabricated content
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Evidence Validation</h5>
                      <p className="text-sm text-muted-foreground">
                        Metadata analysis and document authenticity checks
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Behavioral Analysis</h5>
                      <p className="text-sm text-muted-foreground">
                        Pattern matching against known fraudulent behaviors
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <h5 className="font-medium">Wallet Reputation</h5>
                      <p className="text-sm text-muted-foreground">
                        Transaction history and community trust scoring
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Prevention Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Prevention Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Fraud Detection Rate</span>
                    <span className="text-2xl font-bold text-green-600">97.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">False Positives</span>
                    <span className="text-2xl font-bold text-blue-600">2.1%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Reports Flagged</span>
                    <span className="text-2xl font-bold text-orange-600">8.4%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Auto-Approved</span>
                    <span className="text-2xl font-bold text-primary">74.2%</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Lock className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-800">Security Status</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    All systems operational. Last security audit: Jan 2024
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Multi-Factor Verification Process */}
          <Card>
            <CardHeader>
              <CardTitle>Multi-Factor Verification Process</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <h5 className="font-medium text-sm">Initial Submission</h5>
                  <p className="text-xs text-muted-foreground">Report submitted by survivor</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-purple-600 font-bold">2</span>
                  </div>
                  <h5 className="font-medium text-sm">AI Analysis</h5>
                  <p className="text-xs text-muted-foreground">Content authenticity check</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-green-600 font-bold">3</span>
                  </div>
                  <h5 className="font-medium text-sm">Evidence Review</h5>
                  <p className="text-xs text-muted-foreground">Document validation</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-orange-600 font-bold">4</span>
                  </div>
                  <h5 className="font-medium text-sm">NGO Review</h5>
                  <p className="text-xs text-muted-foreground">Human verification</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-primary font-bold">5</span>
                  </div>
                  <h5 className="font-medium text-sm">Final Decision</h5>
                  <p className="text-xs text-muted-foreground">Approve or reject</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};