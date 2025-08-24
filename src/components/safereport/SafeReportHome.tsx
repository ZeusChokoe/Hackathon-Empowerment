import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, FileText, Heart, Users, Lock, Globe, CheckCircle, Vote } from 'lucide-react';
import { SafeReportPage } from '../SafeReportApp';

interface SafeReportHomeProps {
  navigateTo: (page: SafeReportPage) => void;
}

export const SafeReportHome = ({ navigateTo }: SafeReportHomeProps) => {
  return (
    <div className="space-y-16">{/* Header */}
      <header className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Shield className="w-12 h-12 text-primary mr-3" />
          <h1 className="text-4xl font-bold">SafeReport</h1>
        </div>
        <p className="text-xl text-muted-foreground mb-8">
          Report Anonymously. Get Support. Drive Change.
        </p>
        
        {/* Main CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            variant="empowerment"
            onClick={() => navigateTo('report')}
            className="text-lg px-8 py-6"
          >
            <FileText className="w-5 h-5 mr-2" />
            File a Report
          </Button>
          <Button 
            size="lg" 
            variant="donate"
            onClick={() => navigateTo('donate')}
            className="text-lg px-8 py-6"
          >
            <Heart className="w-5 h-5 mr-2" />
            Donate
          </Button>
          <Button 
            size="lg" 
            variant="secondary"
            onClick={() => navigateTo('ngo')}
            className="text-lg px-8 py-6"
          >
            <Users className="w-5 h-5 mr-2" />
            NGO Login
          </Button>
        </div>

        {/* Advanced Features */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
          <Button 
            variant="outline"
            onClick={() => navigateTo('verification')}
            className="px-6 py-3"
          >
            <Shield className="w-4 h-4 mr-2" />
            Verification System
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigateTo('reputation')}
            className="px-6 py-3"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Reputation Center
          </Button>
          <Button 
            variant="outline"
            onClick={() => navigateTo('dao')}
            className="px-6 py-3"
          >
            <Vote className="w-4 h-4 mr-2" />
            DAO Governance
          </Button>
        </div>
      </header>

      {/* How It Works Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">How SafeReport Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Secure & Anonymous</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Your identity remains completely anonymous. Reports are encrypted and stored securely on the blockchain.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Verified & Transparent</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                NGOs and DAO members verify reports and approve financial assistance requests transparently.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Global Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Connect survivors worldwide with donors and support organizations for maximum impact.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Key Features */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Anonymous Reporting</h3>
              <p className="text-muted-foreground">No personal identity required - your safety is our priority.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Tamper-Proof Records</h3>
              <p className="text-muted-foreground">Reports stored on blockchain and IPFS cannot be altered or deleted.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Financial Assistance</h3>
              <p className="text-muted-foreground">Request and receive donations for medical, legal, or recovery needs.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">AI-Powered Verification</h3>
              <p className="text-muted-foreground">Advanced fraud detection ensures authentic reports only.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Vote className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold mb-2">Community Reputation</h3>
              <p className="text-muted-foreground">Trust scoring system for verified community members.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Anti-Fraud Features */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">Anti-Fraud Protection</h2>
        <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-semibold mb-2 text-red-800">Multi-Layer Verification</h3>
              <p className="text-sm text-red-700">AI analysis, evidence validation, and human review</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2 text-orange-800">Reputation Scoring</h3>
              <p className="text-sm text-orange-700">Trust levels based on community participation</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="font-semibold mb-2 text-yellow-800">Pattern Detection</h3>
              <p className="text-sm text-yellow-700">Advanced algorithms identify suspicious patterns</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="bg-primary/5 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-8">Verified Impact</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">1,247</div>
            <div className="text-muted-foreground">Reports Verified</div>
            <div className="text-sm text-green-600 mt-1">97.3% accuracy rate</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">R2.3M</div>
            <div className="text-muted-foreground">Donated (ZAR)</div>
            <div className="text-sm text-green-600 mt-1">100% tracked</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">87</div>
            <div className="text-muted-foreground">NGO Partners</div>
            <div className="text-sm text-green-600 mt-1">Verified organizations</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">31</div>
            <div className="text-muted-foreground">Cases Prevented</div>
            <div className="text-sm text-red-600 mt-1">Fraud attempts blocked</div>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <footer className="text-center">
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="ghost" onClick={() => navigateTo('verification')}>
            Verification System
          </Button>
          <Button variant="ghost" onClick={() => navigateTo('reputation')}>
            Reputation Center
          </Button>
          <Button variant="ghost" onClick={() => navigateTo('dao')}>
            DAO Governance
          </Button>
          <Button variant="ghost" onClick={() => navigateTo('report')}>
            File Report
          </Button>
          <Button variant="ghost" onClick={() => navigateTo('donate')}>
            View Cases
          </Button>
        </div>
      </footer>
    </div>
  );
};