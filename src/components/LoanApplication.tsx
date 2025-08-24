import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useWallet } from "@/hooks/useWallet";
import { useApplicationTracker } from "@/hooks/useApplicationTracker";
import { useToast } from "@/hooks/use-toast";
import { FormSkeleton } from "@/components/LoadingStates";
import { 
  Calculator, 
  Shield, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Wallet
} from "lucide-react";

const LoanApplication = () => {
  const [loanAmount, setLoanAmount] = useState(5000);
  const [loanTerm, setLoanTerm] = useState(12);
  const [loanPurpose, setLoanPurpose] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  
  const { isConnected, connectWallet, usdcBalance, convertUSDToZAR, estimateGas } = useWallet();
  const { submitApplication } = useApplicationTracker();
  const { toast } = useToast();

  const initialFormData = {
    amount: loanAmount.toString(),
    purpose: loanPurpose,
    term: loanTerm.toString(),
    income: "",
    employment: "",
    description: ""
  };

  const validationRules = {
    amount: {
      required: true,
      custom: (value: string) => {
        const num = parseFloat(value);
        if (isNaN(num)) return "Please enter a valid amount";
        if (num < 500) return "Minimum loan amount is R 500";
        if (num > 50000) return "Maximum loan amount is R 50,000";
        return null;
      }
    },
    purpose: { required: true, minLength: 3 },
    term: { required: true },
    income: {
      required: true,
      custom: (value: string) => {
        const num = parseFloat(value);
        if (isNaN(num)) return "Please enter a valid income";
        if (num < 1000) return "Minimum monthly income requirement is R 1,000";
        return null;
      }
    },
    employment: { required: true },
    description: { required: true, minLength: 20, maxLength: 500 }
  };

  const { 
    data, 
    errors, 
    touched, 
    isSubmitting, 
    isValid, 
    handleChange, 
    handleBlur, 
    handleSubmit 
  } = useFormValidation(initialFormData, validationRules);

  const handleLoanSubmit = async (formData: any) => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to submit loan application",
        variant: "destructive"
      });
      return;
    }

    const availableBalance = convertUSDToZAR(usdcBalance);
    const gasEstimate = estimateGas(loanAmount, 'USDC');
    
    if (availableBalance < gasEstimate.gasFeeZAR) {
      toast({
        title: "Insufficient Balance",
        description: `You need at least R ${gasEstimate.gasFeeZAR.toFixed(2)} for transaction fees`,
        variant: "destructive"
      });
      return;
    }

    try {
      const applicationData = {
        type: 'loan' as const,
        title: `${loanPurpose} - R ${loanAmount.toLocaleString()}`,
        description: `Loan application for ${loanPurpose} with ${loanTerm} month term`,
        amount: loanAmount,
        documents: ['Application Form', 'Identity Document', 'Proof of Income']
      };

      const trackingNum = await submitApplication(applicationData);
      setTrackingNumber(trackingNum);
      setShowSuccess(true);
      
      toast({
        title: "Application Submitted Successfully!",
        description: `Your tracking number is: ${trackingNum}`
      });
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  const handleSaveDraft = () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to save draft",
        variant: "destructive"
      });
      return;
    }
    
    // Save to local storage or blockchain
    localStorage.setItem('loanDraft', JSON.stringify({
      loanAmount,
      loanTerm,
      loanPurpose,
      formData: data
    }));
    
    toast({
      title: "Draft Saved",
      description: "Your application has been saved locally"
    });
  };

  const calculateMonthlyPayment = () => {
    const interestRate = 0.025; // 2.5% annual rate
    const monthlyRate = interestRate / 12;
    const payment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / 
                   (Math.pow(1 + monthlyRate, loanTerm) - 1);
    return Math.round(payment);
  };

  const loanTypes = [
    {
      title: "Business Expansion",
      description: "Grow your existing business",
      maxAmount: 50000,
      rate: "2.5%",
      term: "6-24 months",
      icon: TrendingUp
    },
    {
      title: "Education & Skills",
      description: "Invest in your future",
      maxAmount: 25000,
      rate: "2.0%",
      term: "12-36 months",
      icon: CheckCircle
    },
    {
      title: "Healthcare Emergency",
      description: "Urgent medical expenses",
      maxAmount: 30000,
      rate: "1.5%",
      term: "6-18 months",
      icon: Shield
    },
    {
      title: "Technology & Equipment",
      description: "Digital tools and equipment",
      maxAmount: 40000,
      rate: "2.8%",
      term: "12-24 months",
      icon: Zap
    }
  ];

  if (!isConnected) {
    return (
      <section id="loans" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Card className="max-w-md mx-auto p-8">
              <Wallet className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
              <p className="text-muted-foreground mb-6">
                Please connect your wallet to apply for micro-loans and access smart contract features.
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

  if (showSuccess) {
    return (
      <section id="loans" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Card className="max-w-md mx-auto p-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Application Submitted Successfully!</h3>
              <p className="text-muted-foreground mb-4">
                Your loan application has been submitted to the blockchain for processing.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 mb-4">
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                  Tracking Number
                </div>
                <div className="font-mono text-lg font-bold">
                  {trackingNumber}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Save this tracking number to monitor your application status. Processing typically takes 24-48 hours.
              </p>
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowSuccess(false)}
                  className="flex-1"
                >
                  Submit Another
                </Button>
                <Button 
                  variant="empowerment" 
                  onClick={() => window.location.href = '#dashboard'}
                  className="flex-1"
                >
                  Go to Dashboard
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="loans" className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Apply for a Micro-Loan</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Smart contract-powered loans with transparent terms, competitive rates, and instant approval for eligible applicants.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Loan Types */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Choose Your Loan Type</h3>
            {loanTypes.map((type, index) => (
              <Card 
                key={index} 
                className={`cursor-pointer transition-all hover:shadow-card ${
                  loanPurpose === type.title ? 'ring-2 ring-primary shadow-empowerment' : ''
                }`}
                onClick={() => setLoanPurpose(type.title)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <type.icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold mb-1">{type.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{type.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="text-xs">
                          Max R {type.maxAmount.toLocaleString()}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {type.rate} APR
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Application Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-5 h-5" />
                Loan Application
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Loan Calculator */}
              <div className="p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-4">Loan Calculator</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="amount">Loan Amount (ZAR)</Label>
                    <Input
                      id="amount"
                      name="amount"
                      type="number"
                      value={data.amount || loanAmount}
                      onChange={(e) => {
                        setLoanAmount(Number(e.target.value));
                        handleChange(e.target.name, e.target.value);
                      }}
                      onBlur={(e) => handleBlur(e.target.name)}
                      min={1000}
                      max={50000}
                      step={1000}
                      className={errors.amount && touched.amount ? "border-red-500" : ""}
                    />
                    {errors.amount && touched.amount && (
                      <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="term">Loan Term (months)</Label>
                    <Select 
                      name="term"
                      value={(data.term || loanTerm).toString()} 
                      onValueChange={(value) => {
                        setLoanTerm(Number(value));
                        handleChange('term', value);
                      }}
                    >
                      <SelectTrigger className={errors.term && touched.term ? "border-red-500" : ""}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 months</SelectItem>
                        <SelectItem value="12">12 months</SelectItem>
                        <SelectItem value="18">18 months</SelectItem>
                        <SelectItem value="24">24 months</SelectItem>
                        <SelectItem value="36">36 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-gradient-primary rounded-lg text-primary-foreground">
                  <div className="flex justify-between items-center">
                    <span>Monthly Payment:</span>
                    <span className="text-xl font-bold">R {calculateMonthlyPayment().toLocaleString()}</span>
                  </div>
                  <div className="text-sm opacity-90 mt-1">
                    Total: R {(calculateMonthlyPayment() * loanTerm).toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Application Form */}
              <div className="space-y-4">
                  <div>
                    <Label htmlFor="purpose">Loan Purpose</Label>
                    <Input
                      id="purpose"
                      name="purpose"
                      value={data.purpose || loanPurpose}
                      onChange={(e) => {
                        setLoanPurpose(e.target.value);
                        handleChange(e.target.name, e.target.value);
                      }}
                      onBlur={(e) => handleBlur(e.target.name)}
                      placeholder="Select a loan type above or enter custom purpose"
                      className={errors.purpose && touched.purpose ? "border-red-500" : ""}
                    />
                    {errors.purpose && touched.purpose && (
                      <p className="text-red-500 text-sm mt-1">{errors.purpose}</p>
                    )}
                  </div>

                <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="income">Monthly Income (ZAR)</Label>
                  <Input 
                    id="income" 
                    name="income"
                    type="number" 
                    placeholder="8000"
                    value={data.income}
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    onBlur={(e) => handleBlur(e.target.name)}
                    className={errors.income && touched.income ? "border-red-500" : ""}
                  />
                  {errors.income && touched.income && (
                    <p className="text-red-500 text-sm mt-1">{errors.income}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="employment">Employment Status</Label>
                  <Select 
                    name="employment"
                    value={String(data.employment || "")}
                    onValueChange={(value) => handleChange('employment', value)}
                  >
                    <SelectTrigger className={errors.employment && touched.employment ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employed">Employed</SelectItem>
                      <SelectItem value="self-employed">Self-Employed</SelectItem>
                      <SelectItem value="business-owner">Business Owner</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.employment && touched.employment && (
                    <p className="text-red-500 text-sm mt-1">{errors.employment}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="business-plan">Business Plan / Usage Description</Label>
                <Textarea 
                  id="business-plan"
                  name="description"
                  placeholder="Describe how you plan to use this loan and how it will help you achieve your goals..."
                  rows={4}
                  value={data.description}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  onBlur={(e) => handleBlur(e.target.name)}
                  className={errors.description && touched.description ? "border-red-500" : ""}
                />
                {errors.description && touched.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>

                <div className="flex items-start gap-3 p-4 bg-secondary/10 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium mb-1">Smart Contract Terms</p>
                    <p className="text-muted-foreground">
                      This loan will be governed by an immutable smart contract ensuring transparent terms, 
                      automatic payments, and fair treatment for all parties.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button 
                    variant="empowerment" 
                    size="lg" 
                    className="flex-1 gap-2"
                    onClick={() => handleSubmit(handleLoanSubmit)}
                    disabled={!isValid || isSubmitting}
                  >
                    <Clock className="w-4 h-4" />
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={handleSaveDraft}
                  >
                    Save Draft
                  </Button>
                </div>

                <div className="text-center text-sm text-muted-foreground">
                  <p>Applications are typically processed within 24 hours</p>
                  <p>Zero-knowledge proofs protect your privacy throughout the process</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LoanApplication;