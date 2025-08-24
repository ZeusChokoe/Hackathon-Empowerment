import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Link, 
  Zap, 
  Globe, 
  Heart, 
  TrendingUp,
  Users,
  Lock,
  Coins,
  Database,
  X
} from "lucide-react";

interface BlockchainEducationProps {
  onClose: () => void;
}

export const BlockchainEducation = ({ onClose }: BlockchainEducationProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Understanding Blockchain & FemEmpowerChain</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="p-6 space-y-8">
          {/* What is Blockchain */}
          <section>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              What is Blockchain?
            </h3>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  Blockchain is a revolutionary technology that creates a secure, transparent, and unchangeable digital ledger. 
                  Think of it as a digital notebook that everyone can read, but no one can erase or fake entries.
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                    <h4 className="font-semibold">Secure</h4>
                    <p className="text-sm text-muted-foreground">Protected by advanced cryptography</p>
                  </div>
                  <div className="text-center p-4 bg-secondary/5 rounded-lg">
                    <Globe className="w-8 h-8 text-secondary mx-auto mb-2" />
                    <h4 className="font-semibold">Transparent</h4>
                    <p className="text-sm text-muted-foreground">All transactions are publicly visible</p>
                  </div>
                  <div className="text-center p-4 bg-accent/5 rounded-lg">
                    <Lock className="w-8 h-8 text-accent mx-auto mb-2" />
                    <h4 className="font-semibold">Immutable</h4>
                    <p className="text-sm text-muted-foreground">Records cannot be changed or deleted</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Our Mission */}
          <section>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              Our Mission: Empowering South African Women
            </h3>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-6">
                  FemEmpowerChain harnesses blockchain technology to create financial opportunities and support systems 
                  specifically designed for South African women, addressing historical inequalities and creating sustainable empowerment.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-lg mb-3">🎯 Our Goals</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Badge className="bg-primary/10 text-primary text-xs">•</Badge>
                        <span>Provide accessible micro-loans without traditional banking barriers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge className="bg-primary/10 text-primary text-xs">•</Badge>
                        <span>Create transparent aid distribution systems</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge className="bg-primary/10 text-primary text-xs">•</Badge>
                        <span>Support education and skill development programs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge className="bg-primary/10 text-primary text-xs">•</Badge>
                        <span>Ensure financial inclusion for underserved communities</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg mb-3">🌍 Impact in South Africa</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Badge className="bg-secondary/10 text-secondary text-xs">•</Badge>
                        <span>Bridge the gap for the 11 million unbanked South Africans</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge className="bg-secondary/10 text-secondary text-xs">•</Badge>
                        <span>Support women entrepreneurs in townships and rural areas</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge className="bg-secondary/10 text-secondary text-xs">•</Badge>
                        <span>Create economic opportunities in local currencies (ZAR)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge className="bg-secondary/10 text-secondary text-xs">•</Badge>
                        <span>Build financial literacy and digital skills</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* How It Works */}
          <section>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              How FemEmpowerChain Works
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Coins className="w-5 h-5 text-primary" />
                    Smart Contract Loans
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3 text-sm">
                    <li className="flex gap-3">
                      <Badge className="bg-primary/10 text-primary min-w-[20px] h-5 flex items-center justify-center text-xs">1</Badge>
                      <span>Apply through our secure platform with your MetaMask wallet</span>
                    </li>
                    <li className="flex gap-3">
                      <Badge className="bg-primary/10 text-primary min-w-[20px] h-5 flex items-center justify-center text-xs">2</Badge>
                      <span>Smart contracts automatically assess your eligibility</span>
                    </li>
                    <li className="flex gap-3">
                      <Badge className="bg-primary/10 text-primary min-w-[20px] h-5 flex items-center justify-center text-xs">3</Badge>
                      <span>Receive instant approval and funds in ZAR-backed tokens</span>
                    </li>
                    <li className="flex gap-3">
                      <Badge className="bg-primary/10 text-primary min-w-[20px] h-5 flex items-center justify-center text-xs">4</Badge>
                      <span>Automated repayments with transparent, fair terms</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users className="w-5 h-5 text-secondary" />
                    Community Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3 text-sm">
                    <li className="flex gap-3">
                      <Badge className="bg-secondary/10 text-secondary min-w-[20px] h-5 flex items-center justify-center text-xs">1</Badge>
                      <span>Join a network of supportive women entrepreneurs</span>
                    </li>
                    <li className="flex gap-3">
                      <Badge className="bg-secondary/10 text-secondary min-w-[20px] h-5 flex items-center justify-center text-xs">2</Badge>
                      <span>Access mentorship and business guidance</span>
                    </li>
                    <li className="flex gap-3">
                      <Badge className="bg-secondary/10 text-secondary min-w-[20px] h-5 flex items-center justify-center text-xs">3</Badge>
                      <span>Participate in skill-building workshops</span>
                    </li>
                    <li className="flex gap-3">
                      <Badge className="bg-secondary/10 text-secondary min-w-[20px] h-5 flex items-center justify-center text-xs">4</Badge>
                      <span>Build your reputation and credit score</span>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Key Benefits */}
          <section>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Why Choose Blockchain-Powered Finance?
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold">No Bank Requirements</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Access finance without traditional credit checks or extensive paperwork
                </p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  <h4 className="font-semibold">Instant Processing</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Smart contracts process applications and disburse funds within minutes
                </p>
              </Card>

              <Card className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <h4 className="font-semibold">Full Transparency</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  All transactions and terms are visible on the blockchain
                </p>
              </Card>
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
              <h3 className="text-xl font-semibold mb-4">Ready to Get Started?</h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of South African women who are building better financial futures through blockchain technology.
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="empowerment" size="lg" className="gap-2">
                  <Link className="w-4 h-4" />
                  Connect Your Wallet
                </Button>
                <Button variant="outline" size="lg" onClick={onClose}>
                  Continue Learning
                </Button>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};