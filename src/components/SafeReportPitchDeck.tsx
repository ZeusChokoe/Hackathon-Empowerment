import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  Users, 
  Globe, 
  Lock, 
  Heart, 
  TrendingUp, 
  CheckCircle, 
  AlertTriangle,
  DollarSign,
  Calendar,
  Target,
  BarChart3,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const SafeReportPitchDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: "title",
      title: "SafeReport",
      subtitle: "Anonymous, tamper-proof reporting and support for women and vulnerable communities",
      icon: Shield,
      content: (
        <div className="text-center space-y-6">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
            <Shield className="w-16 h-16 text-white" />
          </div>
          <p className="text-xl text-muted-foreground">
            Empowering survivors through blockchain technology
          </p>
        </div>
      )
    },
    {
      id: "problem",
      title: "The Problem",
      subtitle: "Women face harassment, abuse, and violence daily",
      icon: AlertTriangle,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-destructive/20">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-destructive">80%</div>
                  <p className="text-sm text-muted-foreground">
                    Of cases go unreported due to fear and retaliation
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-destructive/20">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <AlertTriangle className="w-12 h-12 text-destructive mx-auto" />
                  <p className="text-sm text-muted-foreground">
                    Mistrust in institutions prevents reporting
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="bg-muted/50 p-6 rounded-lg">
            <h4 className="font-semibold mb-3">Current Gaps:</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-destructive rounded-full" />
                Centralized systems are unsafe and tamperable
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-destructive rounded-full" />
                No feedback or follow-up for survivors
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-destructive rounded-full" />
                Survivors lack control over their data
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-destructive rounded-full" />
                NGOs lack reliable, verified data
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: "solution",
      title: "Our Solution",
      subtitle: "SafeReport - A decentralized, anonymous reporting platform",
      icon: Shield,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-primary/20">
              <CardContent className="pt-6 text-center">
                <Lock className="w-10 h-10 text-primary mx-auto mb-3" />
                <h4 className="font-semibold">Anonymous Reporting</h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Encrypted submissions with zero-knowledge proofs
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="pt-6 text-center">
                <Shield className="w-10 h-10 text-primary mx-auto mb-3" />
                <h4 className="font-semibold">Tamper-Proof Storage</h4>
                <p className="text-sm text-muted-foreground mt-2">
                  IPFS + blockchain hash for immutable records
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="pt-6 text-center">
                <Users className="w-10 h-10 text-primary mx-auto mb-3" />
                <h4 className="font-semibold">DAO Governance</h4>
                <p className="text-sm text-muted-foreground mt-2">
                  Transparent, community-driven oversight
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="bg-primary/5 p-6 rounded-lg">
            <h4 className="font-semibold mb-3 text-primary">Built with Solidity</h4>
            <p className="text-sm text-muted-foreground">
              Smart contracts ensure data integrity, anonymous reporting, and transparent fund distribution 
              while maintaining survivor privacy and security.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "features",
      title: "Core Features",
      subtitle: "Comprehensive tools for survivors and NGOs",
      icon: CheckCircle,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Lock className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Anonymous Reporting</h4>
                <p className="text-sm text-muted-foreground">End-to-end encrypted submissions</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Tamper-Proof Storage</h4>
                <p className="text-sm text-muted-foreground">Immutable blockchain records</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">DAO Governance</h4>
                <p className="text-sm text-muted-foreground">Community-driven transparency</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Globe className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Multilingual UI</h4>
                <p className="text-sm text-muted-foreground">Global accessibility</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Target className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">NGO Routing</h4>
                <p className="text-sm text-muted-foreground">Intelligent case distribution</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">AI Evidence Checks</h4>
                <p className="text-sm text-muted-foreground">Automated validation systems</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Donation Integration</h4>
                <p className="text-sm text-muted-foreground">Direct support for survivors</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold">Reputation System</h4>
                <p className="text-sm text-muted-foreground">Anti-fraud protection</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "safeguards",
      title: "False Accusation Safeguards",
      subtitle: "Multiple layers of protection and verification",
      icon: Shield,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-amber-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Lock className="w-5 h-5 text-amber-500" />
                  Evidence Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Encrypted evidence submission mandatory for all reports
                </p>
              </CardContent>
            </Card>
            <Card className="border-amber-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-amber-500" />
                  Pattern Detection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Multi-report thresholds trigger advanced analysis
                </p>
              </CardContent>
            </Card>
            <Card className="border-amber-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-500" />
                  DAO Verification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  NGO and DAO verification before case escalation
                </p>
              </CardContent>
            </Card>
            <Card className="border-amber-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-500" />
                  Zero-Knowledge Proofs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Verify real users without revealing identity
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg">
            <h4 className="font-semibold text-amber-800 dark:text-amber-200 mb-2">
              Reputation System
            </h4>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Sophisticated scoring system blocks malicious actors while protecting legitimate survivors. 
              False reports result in permanent platform bans.
            </p>
          </div>
        </div>
      )
    },
    {
      id: "impact-metrics",
      title: "Impact Metrics",
      subtitle: "Projected outcomes over 5 years",
      icon: TrendingUp,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">1M+</div>
                <p className="text-sm font-medium">Safe Reports Filed</p>
                <p className="text-xs text-muted-foreground mt-1">Anonymous, verified reports</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
                <p className="text-sm font-medium">NGO Partnerships</p>
                <p className="text-xs text-muted-foreground mt-1">Global support network</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-500/5 to-blue-500/10">
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">20+</div>
                <p className="text-sm font-medium">Countries</p>
                <p className="text-xs text-muted-foreground mt-1">Global presence</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-primary">For Survivors</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Safe, anonymous reporting
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Validated experiences
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Direct financial support
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-primary">For NGOs</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Early incident data
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Actionable insights
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Transparent operations
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-primary">For Society</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Increased accountability
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Data-driven policies
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Cultural change
                </li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "donations",
      title: "Donation Feature",
      subtitle: "Transparent, corruption-free fund distribution",
      icon: Heart,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-green-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-green-600">For Survivors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Request support for medical needs</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Legal assistance funding</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Recovery and therapy support</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-blue-500/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-base text-blue-600">For Donors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Track exact fund usage</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Corruption-free distribution</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Real-time impact metrics</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 p-6 rounded-lg">
            <h4 className="font-semibold mb-3">Smart Contract Features</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Badge variant="secondary" className="w-fit">Transparent Distribution</Badge>
                <p className="text-sm text-muted-foreground">
                  Every transaction recorded on blockchain for full transparency
                </p>
              </div>
              <div className="space-y-2">
                <Badge variant="secondary" className="w-fit">DAO Emergency Pool</Badge>
                <p className="text-sm text-muted-foreground">
                  Community-managed funds for urgent cases
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "roadmap",
      title: "Development Roadmap",
      subtitle: "2024 Quarterly Milestones",
      icon: Calendar,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-primary/20">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Q1 2024</CardTitle>
                  <Badge>MVP</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Core reporting system
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Encrypted storage on IPFS
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    Basic dashboard for NGOs
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-green-500/20">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Q2 2024</CardTitle>
                  <Badge variant="secondary">Governance</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    DAO governance implementation
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Multilingual user interface
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    Community voting system
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-blue-500/20">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Q3 2024</CardTitle>
                  <Badge variant="outline">Integration</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    NGO partnership platform
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    AI validation system
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    Advanced analytics
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-purple-500/20">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Q4 2024</CardTitle>
                  <Badge className="bg-purple-500">Global</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    Donation module launch
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    Survivor DAO governance
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    Zero-knowledge network
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">25%</span>
            </div>
            <Progress value={25} className="h-2" />
          </div>
        </div>
      )
    },
    {
      id: "ask",
      title: "The Ask",
      subtitle: "Partnership and funding requirements",
      icon: Target,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20">
              <CardContent className="pt-6 text-center">
                <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-green-600 mb-2">R250K</div>
                <p className="text-sm font-medium">Development Funding</p>
                <p className="text-xs text-muted-foreground mt-2">
                  For MVP development and initial deployment
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20">
              <CardContent className="pt-6 text-center">
                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-blue-600 mb-2">NGO</div>
                <p className="text-sm font-medium">Partnerships</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Strategic alliances with impact organizations
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-500/5 to-purple-500/10 border-purple-500/20">
              <CardContent className="pt-6 text-center">
                <Shield className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <div className="text-2xl font-bold text-purple-600 mb-2">Legal</div>
                <p className="text-sm font-medium">Advisory Support</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Privacy and compliance expertise
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-gradient-to-r from-primary/5 to-primary-glow/5 p-6 rounded-lg border border-primary/10">
            <h4 className="font-semibold text-primary mb-4">Potential Partners</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                <Globe className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">UN Women</p>
              </div>
              <div className="text-center p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Amnesty Int'l</p>
              </div>
              <div className="text-center p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Local NGOs</p>
              </div>
              <div className="text-center p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                <Users className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">Gov Agencies</p>
              </div>
            </div>
          </div>
          
          <div className="text-center p-6 bg-gradient-to-r from-primary to-primary-glow text-white rounded-lg">
            <h4 className="text-xl font-bold mb-2">Our Vision</h4>
            <p className="text-sm opacity-90">
              "In 5 years, SafeReport will be the global standard for anonymous reporting and support, 
              empowering millions of survivors worldwide with both a voice and financial assistance they can trust."
            </p>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentSlideData = slides[currentSlide];
  const Icon = currentSlideData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-2">
            SafeReport Pitch Deck
          </h1>
          <p className="text-muted-foreground">
            Empowering survivors through blockchain technology
          </p>
        </div>

        {/* Slide Navigation */}
        <div className="flex flex-wrap justify-center mb-8 gap-2">
          {slides.map((slide, index) => (
            <Button
              key={slide.id}
              variant={currentSlide === index ? "default" : "outline"}
              size="sm"
              onClick={() => goToSlide(index)}
              className="text-xs"
            >
              {index + 1}
            </Button>
          ))}
        </div>

        {/* Main Slide */}
        <Card className="max-w-6xl mx-auto mb-8">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">{currentSlideData.title}</CardTitle>
                <p className="text-muted-foreground mt-1">{currentSlideData.subtitle}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="min-h-[400px]">
            {currentSlideData.content}
          </CardContent>
        </Card>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <Button
            variant="outline"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <div className="text-sm text-muted-foreground">
            {currentSlide + 1} of {slides.length}
          </div>
          
          <Button
            variant="outline"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SafeReportPitchDeck;