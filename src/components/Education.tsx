import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useWallet } from "@/hooks/useWallet";
import { useLiveData } from "@/hooks/useLiveData";
import { useApplicationTracker } from "@/hooks/useApplicationTracker";
import { useToast } from "@/hooks/use-toast";
import { 
  BookOpen, 
  Award, 
  Users, 
  Clock, 
  Star,
  ArrowRight,
  Laptop,
  Heart,
  TrendingUp,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const Education = () => {
  const { educationPrograms, scholarships } = useLiveData();
  const { isConnected, connectWallet } = useWallet();
  const { submitApplication } = useApplicationTracker();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [applicationData, setApplicationData] = useState({
    motivation: "",
    experience: "",
    goals: ""
  });
  const handleApplyProgram = async (programId: string) => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to apply for programs",
        variant: "destructive"
      });
      return;
    }

    const program = educationPrograms.find(p => p.id === programId);
    if (!program) return;

    if (program.spotsAvailable <= 0) {
      toast({
        title: "Program Full",
        description: "This program is currently full. You'll be added to the waiting list.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      setSelectedProgram(programId);
      
      // In a real app, this would open a detailed application form
      const applicationData = {
        type: 'education' as const,
        title: `Education Application - ${program.title}`,
        description: `Application for ${program.title} program with ${program.provider}`,
        amount: program.scholarshipAmount,
        documents: ['Academic Transcript', 'Motivation Letter', 'ID Document']
      };

      const trackingNumber = await submitApplication(applicationData);
      
      toast({
        title: "Application Submitted!",
        description: `Your application has been submitted. Tracking: ${trackingNumber}`,
      });
      
    } catch (error) {
      toast({
        title: "Application Failed",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
      setSelectedProgram(null);
    }
  };

  const handleApplyScholarship = async (scholarshipId: string) => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to apply for scholarships",
        variant: "destructive"
      });
      return;
    }

    const scholarship = scholarships.find(s => s.id === scholarshipId);
    if (!scholarship) return;

    if (scholarship.available <= 0) {
      toast({
        title: "No Scholarships Available",
        description: "All scholarships for this program have been awarded.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      const applicationData = {
        type: 'scholarship' as const,
        title: `Scholarship Application - ${scholarship.title}`,
        description: `Application for ${scholarship.title} worth R ${scholarship.amount.toLocaleString()}`,
        amount: scholarship.amount,
        documents: ['Portfolio', 'Financial Need Statement', 'Recommendation Letters']
      };

      const trackingNumber = await submitApplication(applicationData);
      
      toast({
        title: "Scholarship Application Submitted!",
        description: `Your application has been submitted. Tracking: ${trackingNumber}`,
      });
      
    } catch (error) {
      toast({
        title: "Application Failed",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleHealthcareAction = (action: string) => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to access healthcare features",
        variant: "destructive"
      });
      return;
    }

    switch (action) {
      case 'support':
        toast({
          title: "Mental Health Support",
          description: "Connecting you to counseling services..."
        });
        // Navigate to healthcare support or open modal
        break;
      case 'providers':
        toast({
          title: "Finding Providers",
          description: "Searching for healthcare providers in your area..."
        });
        break;
      case 'quotes':
        toast({
          title: "Getting Quotes",
          description: "Fetching health insurance quotes..."
        });
        break;
    }
  };

  const myProgress = [
    {
      course: "Financial Literacy & Investment Basics",
      progress: 75,
      nextClass: "September 25, 2024",
      instructor: "Dr. Sarah Mthembu"
    },
    {
      course: "Digital Marketing for Small Business",
      progress: 45,
      nextClass: "September 27, 2024",
      instructor: "Prof. Michael Chen"
    }
  ];

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp':
        return TrendingUp;
      case 'Award':
        return Award;
      case 'Heart':
        return Heart;
      case 'Laptop':
        return Laptop;
      default:
        return BookOpen;
    }
  };

  return (
    <section id="education" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Education & Skills Development</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Access world-class education, earn scholarships, and build skills that empower your future through blockchain-verified credentials.
          </p>
        </div>

        {/* My Learning Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              My Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              {myProgress.map((course, index) => (
                <div key={index} className="p-4 border border-border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">{course.course}</h4>
                      <p className="text-sm text-muted-foreground">with {course.instructor}</p>
                    </div>
                    <Badge variant="secondary">{course.progress}%</Badge>
                  </div>
                  <Progress value={course.progress} className="mb-3" />
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Next class: {course.nextClass}</span>
                    <Button variant="outline" size="sm">Continue Learning</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Available Programs */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold mb-6">Available Programs</h3>
            <div className="grid gap-6">
              {educationPrograms.map((program, index) => (
                <Card key={index} className="hover:shadow-card transition-smooth">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        {(() => {
                          const IconComponent = getIconComponent(program.icon);
                          return <IconComponent className="w-6 h-6 text-primary-foreground" />;
                        })()}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-semibold text-lg">{program.title}</h4>
                            <p className="text-sm text-muted-foreground">{program.provider}</p>
                          </div>
                          <Badge variant="outline">{program.category}</Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-4">{program.description}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm mb-4">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-primary" />
                            {program.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-secondary" />
                            {program.participants} participants
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-accent" />
                            {program.rating}
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-lg font-bold text-primary">R {program.scholarshipAmount.toLocaleString()} Scholarship</p>
                            <p className="text-sm text-muted-foreground">Starts {program.startDate}</p>
                          </div>
                          <Button 
                            variant="empowerment" 
                            className="gap-2"
                            onClick={() => handleApplyProgram(program.id)}
                            disabled={!isConnected || isSubmitting || program.spotsAvailable <= 0}
                          >
                            {isSubmitting && selectedProgram === program.id ? "Applying..." : "Apply Now"} 
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Scholarships */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Featured Scholarships</h3>
            <div className="space-y-4">
              {scholarships.map((scholarship, index) => (
                <Card key={index} className="p-4">
                  <div className="mb-3">
                    <h4 className="font-semibold mb-1">{scholarship.title}</h4>
                    <p className="text-2xl font-bold text-primary">R {scholarship.amount.toLocaleString()}</p>
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex justify-between">
                      <span>Deadline:</span>
                      <span>{scholarship.deadline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Applicants:</span>
                      <span>{scholarship.applicants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Available:</span>
                      <Badge variant="secondary" className="text-xs">{scholarship.available} spots</Badge>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => handleApplyScholarship(scholarship.id)}
                    disabled={!isConnected || isSubmitting || scholarship.available <= 0}
                  >
                    {isSubmitting ? "Applying..." : "Apply for Scholarship"}
                  </Button>
                </Card>
              ))}
              
              <Card className="p-4 bg-gradient-secondary text-secondary-foreground">
                <div className="text-center">
                  <Award className="w-8 h-8 mx-auto mb-2" />
                  <h4 className="font-semibold mb-2">Blockchain Certificates</h4>
                  <p className="text-sm opacity-90 mb-3">
                    All our courses issue blockchain-verified certificates that employers trust.
                  </p>
                  <Button variant="outline" size="sm" className="bg-transparent border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary">
                    Learn More
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Healthcare Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              Healthcare Support Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary-foreground" />
                </div>
                <h4 className="font-semibold mb-2">Mental Health Support</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Free counseling sessions and mental health resources for all platform members.
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleHealthcareAction('support')}
                  disabled={!isConnected}
                >
                  Access Support
                </Button>
              </div>
              
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h4 className="font-semibold mb-2">Community Health</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect with local healthcare providers and community health workers.
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleHealthcareAction('providers')}
                  disabled={!isConnected}
                >
                  Find Providers
                </Button>
              </div>
              
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-gradient-impact rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-accent-foreground" />
                </div>
                <h4 className="font-semibold mb-2">Health Insurance</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Affordable health insurance options tailored for women entrepreneurs.
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleHealthcareAction('quotes')}
                  disabled={!isConnected}
                >
                  Get Quotes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Education;