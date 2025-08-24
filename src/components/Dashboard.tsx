import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { DashboardSkeleton } from "@/components/LoadingStates";
import { ImpactCharts } from "@/components/ImpactCharts";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import { useWallet } from "@/hooks/useWallet";
import { useLiveData } from "@/hooks/useLiveData";
import { 
  TrendingUp, 
  Heart, 
  BookOpen, 
  Shield, 
  Wallet, 
  Plus,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Sparkles,
  AlertCircle
} from "lucide-react";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { isConnected, connectWallet, usdcBalance, convertUSDToZAR } = useWallet();
  const { stats } = useLiveData();
  
  const userStats = {
    totalLoans: 3,
    activeLoans: 1,
    completedLoans: 2,
    totalBorrowed: 15000,
    totalRepaid: 10000,
    creditScore: 850,
    impact: {
      womenHelped: 12,
      educationGrants: 2,
      healthcareAccess: 5
    }
  };

  const activeLoans = [
    {
      id: "L001",
      amount: 5000,
      purpose: "Small Business Expansion",
      progress: 60,
      nextPayment: "2024-09-15",
      monthlyPayment: 520,
      status: "active"
    }
  ];

  const completedLoans = [
    {
      id: "L002",
      amount: 3000,
      purpose: "Skills Training Course",
      completedDate: "2024-07-20",
      status: "completed"
    },
    {
      id: "L003",
      amount: 7000,
      purpose: "Healthcare Emergency",
      completedDate: "2024-05-15",
      status: "completed"
    }
  ];

  if (!isConnected) {
    return (
      <section id="dashboard" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Card className="max-w-md mx-auto p-8">
              <Wallet className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
              <p className="text-muted-foreground mb-6">
                Connect your wallet to access your personalized dashboard and track your financial journey.
              </p>
              <Button onClick={connectWallet} variant="empowerment" size="lg" className="w-full">
                Connect Wallet
              </Button>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="dashboard" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Your Empowerment Dashboard</h2>
          <p className="text-muted-foreground">Track your financial journey and impact in the community</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 hover-lift micro-bounce group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available Balance</p>
                <p className="text-2xl font-bold text-primary">R {convertUSDToZAR(usdcBalance).toFixed(0)}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary group-hover:animate-bounce" />
            </div>
          </Card>
          
          <Card className="p-6 hover-lift micro-bounce group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Credit Score</p>
                <p className="text-2xl font-bold text-secondary">{userStats.creditScore}</p>
              </div>
              <Shield className="w-8 h-8 text-secondary group-hover:pulse-glow" />
            </div>
          </Card>
          
          <Card className="p-6 hover-lift micro-bounce group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Loans</p>
                <p className="text-2xl font-bold text-accent">{userStats.activeLoans}</p>
              </div>
              <Wallet className="w-8 h-8 text-accent group-hover:float-gentle" />
            </div>
          </Card>
          
          <Card className="p-6 hover-lift micro-bounce group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Women Helped</p>
                <p className="text-2xl font-bold text-primary">{userStats.impact.womenHelped}</p>
              </div>
              <Heart className="w-8 h-8 text-primary group-hover:bounce-gentle" />
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Active Loans */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Active Loans</CardTitle>
              <Button 
                variant="empowerment" 
                size="sm" 
                className="gap-2 hover-glow micro-bounce"
                onClick={() => setShowOnboarding(true)}
              >
                <Plus className="w-4 h-4" />
                Apply for Loan
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeLoans.map((loan) => (
                <div key={loan.id} className="p-4 border border-border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">{loan.purpose}</h4>
                      <p className="text-sm text-muted-foreground">Loan ID: {loan.id}</p>
                    </div>
                    <Badge variant="secondary">
                      <Clock className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Amount: R {loan.amount.toLocaleString()}</span>
                      <span>Progress: {loan.progress}%</span>
                    </div>
                    <Progress value={loan.progress} className="h-2" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Next Payment: {loan.nextPayment}</span>
                      <span>R {loan.monthlyPayment}/month</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm" className="mt-3 w-full">
                    Make Payment
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Impact & Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Your Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-gradient-primary rounded-lg text-primary-foreground">
                <h3 className="text-2xl font-bold">{userStats.impact.womenHelped}</h3>
                <p className="text-sm opacity-90">Women Empowered Through Your Success</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Education Grants</span>
                  <Badge variant="secondary">{userStats.impact.educationGrants}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Healthcare Access</span>
                  <Badge variant="secondary">{userStats.impact.healthcareAccess}</Badge>
                </div>
              </div>
              
              <Button variant="donate" size="sm" className="w-full gap-2">
                <Heart className="w-4 h-4" />
                Support Others
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Impact Charts */}
        <ImpactCharts />

        {/* Loan History */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Loan History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {completedLoans.map((loan) => (
                <div key={loan.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary" />
                    <div>
                      <p className="font-medium">{loan.purpose}</p>
                      <p className="text-sm text-muted-foreground">Completed on {loan.completedDate}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">R {loan.amount.toLocaleString()}</p>
                    <Badge variant="outline" className="text-xs">
                      Completed
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Onboarding Flow */}
        <OnboardingFlow 
          isOpen={showOnboarding} 
          onClose={() => setShowOnboarding(false)} 
        />
      </div>
    </section>
  );
};

export default Dashboard;