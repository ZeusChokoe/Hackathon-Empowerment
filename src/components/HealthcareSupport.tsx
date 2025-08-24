import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { useApplicationTracker } from "@/hooks/useApplicationTracker";
import { useToast } from "@/hooks/use-toast";
import { 
  Heart, 
  Shield, 
  Phone, 
  MapPin, 
  DollarSign,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  Stethoscope,
  Pill,
  Activity
} from "lucide-react";

export const HealthcareSupport = () => {
  const [selectedService, setSelectedService] = useState("");
  const [emergencyType, setEmergencyType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isConnected, connectWallet, usdcBalance, convertUSDToZAR } = useWallet();
  const { submitApplication } = useApplicationTracker();
  const { toast } = useToast();

  const healthcareServices = [
    {
      id: 'mental_health',
      title: 'Mental Health Support',
      description: 'Professional counseling and therapy services',
      icon: Heart,
      providers: 12,
      avgCost: 450,
      waitTime: '2-3 days',
      coverage: 'Partial'
    },
    {
      id: 'maternal_care',
      title: 'Maternal & Child Healthcare',
      description: 'Prenatal, postnatal, and pediatric care',
      icon: Shield,
      providers: 8,
      avgCost: 850,
      waitTime: '1-2 days',
      coverage: 'Full'
    },
    {
      id: 'emergency_care',
      title: 'Emergency Medical Care',
      description: '24/7 emergency medical assistance',
      icon: Activity,
      providers: 15,
      avgCost: 1200,
      waitTime: 'Immediate',
      coverage: 'Partial'
    },
    {
      id: 'chronic_care',
      title: 'Chronic Disease Management',
      description: 'Ongoing care for diabetes, hypertension, etc.',
      icon: Pill,
      providers: 10,
      avgCost: 320,
      waitTime: '3-5 days',
      coverage: 'Full'
    }
  ];

  const emergencyTypes = [
    { value: 'medical', label: 'Medical Emergency' },
    { value: 'mental', label: 'Mental Health Crisis' },
    { value: 'maternity', label: 'Maternity Emergency' },
    { value: 'chronic', label: 'Chronic Condition Flare-up' },
    { value: 'other', label: 'Other Healthcare Need' }
  ];

  const handleAccessSupport = async (serviceId: string) => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to access healthcare support",
        variant: "destructive"
      });
      return;
    }

    const service = healthcareServices.find(s => s.id === serviceId);
    if (!service) return;

    const availableBalance = convertUSDToZAR(usdcBalance);
    
    if (availableBalance < service.avgCost) {
      toast({
        title: "Insufficient Balance",
        description: `You need at least R ${service.avgCost} for this service. Consider applying for emergency healthcare funding.`,
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const applicationData = {
        type: 'healthcare' as const,
        title: `Healthcare Support - ${service.title}`,
        description: `Request for ${service.description.toLowerCase()}`,
        amount: service.avgCost,
        documents: ['Medical History', 'ID Document', 'Healthcare Request Form']
      };

      const trackingNumber = await submitApplication(applicationData);
      
      toast({
        title: "Healthcare Support Requested",
        description: `Your request has been submitted. Tracking: ${trackingNumber}`,
      });
      
    } catch (error) {
      toast({
        title: "Request Failed",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFindProviders = (serviceId: string) => {
    const service = healthcareServices.find(s => s.id === serviceId);
    toast({
      title: "Provider Search",
      description: `Found ${service?.providers} providers for ${service?.title} in your area`,
    });
  };

  const handleGetQuote = (serviceId: string) => {
    const service = healthcareServices.find(s => s.id === serviceId);
    toast({
      title: "Healthcare Quote",
      description: `Estimated cost: R ${service?.avgCost} | Wait time: ${service?.waitTime}`,
    });
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Healthcare Support Resources</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access quality healthcare services powered by blockchain technology and community support
          </p>
        </div>

        {/* Emergency Contact */}
        <Card className="mb-8 border-red-200 bg-red-50/50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-800">24/7 Emergency Helpline</h3>
                <p className="text-red-600">For immediate medical emergencies</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="destructive" size="lg" className="gap-2">
                <Phone className="w-4 h-4" />
                Call 10177 (Emergency)
              </Button>
              <Button variant="outline" className="gap-2 border-red-200 text-red-600 hover:bg-red-50">
                <Heart className="w-4 h-4" />
                Mental Health Crisis: 0800 567 567
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Healthcare Services */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {healthcareServices.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <service.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{service.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{service.providers} Providers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span>~R {service.avgCost}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{service.waitTime}</span>
                  </div>
                  <div>
                    <Badge 
                      variant={service.coverage === 'Full' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {service.coverage} Coverage
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="empowerment" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleAccessSupport(service.id)}
                    disabled={!isConnected || isSubmitting}
                  >
                    Access Support
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleFindProviders(service.id)}
                  >
                    Find Providers
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleGetQuote(service.id)}
                  >
                    Get Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Healthcare Funding */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-primary" />
              Emergency Healthcare Funding
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Quick Emergency Funding</h4>
                <p className="text-muted-foreground mb-4">
                  Fast-track funding for urgent medical needs when you don't have sufficient balance.
                </p>
                
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="emergency-type">Emergency Type</Label>
                    <Select value={emergencyType} onValueChange={setEmergencyType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select emergency type" />
                      </SelectTrigger>
                      <SelectContent>
                        {emergencyTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="amount-needed">Amount Needed (ZAR)</Label>
                    <Input
                      id="amount-needed"
                      type="number"
                      placeholder="5000"
                      min="500"
                      max="50000"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="medical-details">Medical Details</Label>
                    <Textarea
                      id="medical-details"
                      placeholder="Briefly describe your medical situation and why funding is needed..."
                      rows={3}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <h5 className="font-semibold mb-2">Emergency Funding Features</h5>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>24-hour processing for emergencies</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>No collateral required</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Flexible repayment terms</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Direct payment to healthcare providers</span>
                    </li>
                  </ul>
                </div>
                
                <Button 
                  variant="empowerment" 
                  size="lg" 
                  className="w-full gap-2"
                  disabled={!isConnected || !emergencyType}
                >
                  <AlertCircle className="w-4 h-4" />
                  {isConnected ? "Apply for Emergency Funding" : "Connect Wallet to Apply"}
                </Button>
                
                <p className="text-xs text-muted-foreground text-center">
                  Emergency applications are prioritized and typically processed within 4-6 hours
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Community Health Network */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Community Health Network
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary-foreground" />
                </div>
                <h4 className="font-semibold mb-2">Local Health Clinics</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Find nearby community health centers and clinics
                </p>
                <Button variant="outline" size="sm">
                  Find Nearby Clinics
                </Button>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h4 className="font-semibold mb-2">Support Groups</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Join women's health support communities
                </p>
                <Button variant="outline" size="sm">
                  Join Groups
                </Button>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="w-8 h-8 text-accent-foreground" />
                </div>
                <h4 className="font-semibold mb-2">Telemedicine</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Remote consultations with healthcare professionals
                </p>
                <Button variant="outline" size="sm">
                  Start Consultation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};