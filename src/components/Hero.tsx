import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, TrendingUp, Heart, BookOpen, Wallet, Check } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { useLiveData } from "@/hooks/useLiveData";
import { BlockchainEducation } from "@/components/BlockchainEducation";
import heroImage from "@/assets/hero-empowerment.jpg";

const Hero = () => {
  const { address, isConnected, isConnecting, connectWallet, formatAddress } = useWallet();
  const { stats } = useLiveData();
  const [showWalletSuccess, setShowWalletSuccess] = useState(false);
  const [showEducation, setShowEducation] = useState(false);

  const handleGetStarted = async () => {
    if (isConnected) {
      setShowWalletSuccess(true);
      return;
    }
    
    const connectedAddress = await connectWallet();
    if (connectedAddress) {
      setShowWalletSuccess(true);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Empowering{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  South African Women
                </span>{" "}
                Through Blockchain
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                Access secure micro-loans, educational resources, healthcare support, and transparent aid distribution powered by blockchain technology.
              </p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{stats.womenEmpowered.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Women Empowered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">R {(stats.totalLoansDistributed / 1000000).toFixed(1)}M</div>
                <div className="text-sm text-muted-foreground">Loans Distributed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">{stats.totalRepaymentRate}%</div>
                <div className="text-sm text-muted-foreground">Repayment Rate</div>
              </div>
            </div>

            {/* Wallet Connection Section */}
            {showWalletSuccess && isConnected ? (
              <div className="space-y-4">
                <Card className="p-6 bg-gradient-primary/10 border-primary/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Wallet Connected!</h3>
                      <p className="text-sm text-muted-foreground">You're now ready to access all features</p>
                    </div>
                  </div>
                  
                  <div className="bg-background/50 rounded-lg p-3 mb-4">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                      Connected Address
                    </div>
                    <div className="font-mono text-sm font-medium">
                      {address}
                    </div>
                  </div>

                  <Button variant="empowerment" size="lg" className="w-full gap-2">
                    Continue to Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Card>
              </div>
            ) : (
              <>
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    variant="hero" 
                    size="lg" 
                    className="gap-2 hover-glow pulse-glow micro-bounce group"
                    onClick={handleGetStarted}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Connecting...
                      </>
                    ) : isConnected ? (
                      <>
                        <Check className="w-4 h-4" />
                        Connected ({formatAddress(address!)})
                      </>
                    ) : (
                      <>
                        <Wallet className="w-4 h-4 group-hover:rotate-6 transition-transform" />
                        Connect Wallet
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="hover-lift micro-bounce"
                    onClick={() => setShowEducation(true)}
                  >
                    Learn More
                  </Button>
                </div>

                {isConnected && !showWalletSuccess && (
                  <Card className="p-4 bg-muted/30 border-muted">
                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">
                        Wallet Connected: {formatAddress(address!)}
                      </span>
                    </div>
                  </Card>
                )}
              </>
            )}
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-empowerment">
              <img 
                src={heroImage} 
                alt="Empowered South African women using blockchain technology"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            
            {/* Floating Cards */}
            <Card className="absolute -top-4 -right-4 p-4 bg-card/90 backdrop-blur-sm shadow-card">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-secondary" />
                <div>
                  <div className="font-semibold text-sm">100% Secure</div>
                  <div className="text-xs text-muted-foreground">Blockchain Protected</div>
                </div>
              </div>
            </Card>
            
            <Card className="absolute -bottom-4 -left-4 p-4 bg-card/90 backdrop-blur-sm shadow-card">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <div>
                  <div className="font-semibold text-sm">Low Interest</div>
                  <div className="text-xs text-muted-foreground">From 2.5% APR</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Blockchain Education Modal */}
      {showEducation && (
        <BlockchainEducation onClose={() => setShowEducation(false)} />
      )}

      {/* Features Preview */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="p-6 text-center hover-lift micro-bounce group">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:pulse-glow">
              <TrendingUp className="w-6 h-6 text-primary-foreground group-hover:float-gentle" />
            </div>
            <h3 className="font-semibold mb-2">Micro-Loans</h3>
            <p className="text-sm text-muted-foreground">Smart contract-powered loans with transparent terms</p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-card transition-smooth">
            <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center mx-auto mb-4">
              <Heart className="w-6 h-6 text-secondary-foreground" />
            </div>
            <h3 className="font-semibold mb-2">Aid Distribution</h3>
            <p className="text-sm text-muted-foreground">Direct, traceable assistance to those who need it most</p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-card transition-smooth">
            <div className="w-12 h-12 bg-gradient-impact rounded-lg flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="font-semibold mb-2">Education Hub</h3>
            <p className="text-sm text-muted-foreground">Skills training and educational scholarships</p>
          </Card>
          
          <Card className="p-6 text-center hover:shadow-card transition-smooth">
            <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-semibold mb-2">Privacy First</h3>
            <p className="text-sm text-muted-foreground">Zero-knowledge proofs protect your data</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Hero;