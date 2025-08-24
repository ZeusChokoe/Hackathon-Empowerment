import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  ArrowLeft, 
  Wallet, 
  User, 
  Target, 
  CheckCircle2,
  Sparkles,
  Shield,
  Heart
} from "lucide-react";

interface OnboardingFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  {
    id: 1,
    title: "Welcome to FemEmpowerChain",
    subtitle: "Let's get you started on your empowerment journey",
    icon: Sparkles
  },
  {
    id: 2,
    title: "Connect Your Wallet",
    subtitle: "Secure your account with blockchain technology",
    icon: Wallet
  },
  {
    id: 3,
    title: "Tell Us About Yourself",
    subtitle: "Help us personalize your experience",
    icon: User
  },
  {
    id: 4,
    title: "Set Your Goals",
    subtitle: "What would you like to achieve?",
    icon: Target
  },
  {
    id: 5,
    title: "You're All Set!",
    subtitle: "Welcome to the community of empowered women",
    icon: CheckCircle2
  }
];

export const OnboardingFlow = ({ isOpen, onClose }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    goals: "",
    experience: ""
  });

  const progress = (currentStep / steps.length) * 100;
  const currentStepData = steps.find(step => step.id === currentStep);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Welcome to your empowerment journey!</h3>
              <p className="text-muted-foreground">
                Join thousands of South African women accessing secure micro-loans, 
                education, and healthcare through blockchain technology.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 rounded-lg bg-gradient-primary/10">
                <Shield className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">100% Secure</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-secondary/10">
                <Target className="w-6 h-6 text-secondary mx-auto mb-2" />
                <p className="text-sm font-medium">Goal-Oriented</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-impact/10">
                <Heart className="w-6 h-6 text-accent mx-auto mb-2" />
                <p className="text-sm font-medium">Community-Driven</p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto">
              <Wallet className="w-8 h-8 text-secondary-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Connect Your Blockchain Wallet</h3>
              <p className="text-muted-foreground">
                Your wallet ensures secure, transparent transactions and protects your privacy.
              </p>
            </div>
            <div className="space-y-3">
              <Button variant="empowerment" className="w-full gap-2">
                <Wallet className="w-4 h-4" />
                Connect MetaMask
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <Wallet className="w-4 h-4" />
                Use WalletConnect
              </Button>
              <p className="text-xs text-muted-foreground">
                Don't have a wallet? We'll help you set one up safely.
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-impact rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Tell Us About Yourself</h3>
              <p className="text-muted-foreground">Help us personalize your experience</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  placeholder="e.g., Cape Town, Western Cape"
                />
              </div>
              <div>
                <Label htmlFor="experience">Previous Experience</Label>
                <Textarea
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => handleInputChange("experience", e.target.value)}
                  placeholder="Tell us about your business or educational background (optional)"
                  rows={3}
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">What Are Your Goals?</h3>
              <p className="text-muted-foreground">Select what you'd like to achieve</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                "Start a Business",
                "Education & Skills",
                "Healthcare Support",
                "Emergency Fund",
                "Home Improvement",
                "Technology Access"
              ].map((goal) => (
                <Button
                  key={goal}
                  variant="outline"
                  className="h-auto p-4 text-left hover:bg-primary/5 hover:border-primary"
                  onClick={() => handleInputChange("goals", goal)}
                >
                  <div>
                    <div className="font-medium">{goal}</div>
                  </div>
                </Button>
              ))}
            </div>
            {formData.goals && (
              <Badge variant="secondary" className="mx-auto">
                Selected: {formData.goals}
              </Badge>
            )}
          </div>
        );

      case 5:
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Welcome to FemEmpowerChain, {formData.name}!</h3>
              <p className="text-muted-foreground">
                You're now part of a community of empowered women. Start exploring your personalized dashboard.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-primary/5 rounded-lg">
                <div className="font-medium text-primary">Next Steps</div>
                <ul className="text-left mt-2 space-y-1 text-muted-foreground">
                  <li>• Explore loan options</li>
                  <li>• Browse education resources</li>
                  <li>• Connect with mentors</li>
                </ul>
              </div>
              <div className="p-3 bg-secondary/5 rounded-lg">
                <div className="font-medium text-secondary">Your Impact</div>
                <p className="text-left mt-2 text-muted-foreground">
                  Every success story creates opportunities for other women in your community.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              {currentStepData?.icon && <currentStepData.icon className="w-5 h-5" />}
              Step {currentStep} of {steps.length}
            </DialogTitle>
          </div>
          <Progress value={progress} className="mt-2" />
        </DialogHeader>

        <div className="py-6">
          {renderStepContent()}
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            className="gap-2"
            variant={currentStep === steps.length ? "empowerment" : "default"}
          >
            {currentStep === steps.length ? "Start Journey" : "Continue"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};