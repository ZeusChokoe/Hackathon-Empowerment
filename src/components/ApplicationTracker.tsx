import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useApplicationTracker } from "@/hooks/useApplicationTracker";
import { useWallet } from "@/hooks/useWallet";
import { 
  Search, 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye,
  Calendar,
  DollarSign,
  AlertCircle,
  Download
} from "lucide-react";

export const ApplicationTracker = () => {
  const { applications, isLoading, getApplicationByTrackingNumber } = useApplicationTracker();
  const { isConnected, connectWallet } = useWallet();
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'in_review':
        return <Eye className="w-4 h-4 text-blue-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'in_review':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-900 border-green-300';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'loan':
        return '💰';
      case 'education':
        return '📚';
      case 'scholarship':
        return '🎓';
      case 'healthcare':
        return '🏥';
      default:
        return '📄';
    }
  };

  const filteredApplications = applications.filter(app => 
    app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isConnected) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Card className="max-w-md mx-auto p-8">
              <AlertCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
              <p className="text-muted-foreground mb-6">
                Please connect your wallet to view your application history and track progress.
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
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Application Tracker</h2>
          <p className="text-muted-foreground">
            Track all your applications for loans, education programs, scholarships, and healthcare support
          </p>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by title, tracking number, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Applications Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All ({applications.length})</TabsTrigger>
            <TabsTrigger value="loan">Loans ({applications.filter(a => a.type === 'loan').length})</TabsTrigger>
            <TabsTrigger value="education">Education ({applications.filter(a => a.type === 'education').length})</TabsTrigger>
            <TabsTrigger value="scholarship">Scholarships ({applications.filter(a => a.type === 'scholarship').length})</TabsTrigger>
            <TabsTrigger value="healthcare">Healthcare ({applications.filter(a => a.type === 'healthcare').length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <ApplicationList applications={filteredApplications} getStatusIcon={getStatusIcon} getStatusColor={getStatusColor} getTypeIcon={getTypeIcon} />
          </TabsContent>

          <TabsContent value="loan" className="mt-6">
            <ApplicationList applications={filteredApplications.filter(a => a.type === 'loan')} getStatusIcon={getStatusIcon} getStatusColor={getStatusColor} getTypeIcon={getTypeIcon} />
          </TabsContent>

          <TabsContent value="education" className="mt-6">
            <ApplicationList applications={filteredApplications.filter(a => a.type === 'education')} getStatusIcon={getStatusIcon} getStatusColor={getStatusColor} getTypeIcon={getTypeIcon} />
          </TabsContent>

          <TabsContent value="scholarship" className="mt-6">
            <ApplicationList applications={filteredApplications.filter(a => a.type === 'scholarship')} getStatusIcon={getStatusIcon} getStatusColor={getStatusColor} getTypeIcon={getTypeIcon} />
          </TabsContent>

          <TabsContent value="healthcare" className="mt-6">
            <ApplicationList applications={filteredApplications.filter(a => a.type === 'healthcare')} getStatusIcon={getStatusIcon} getStatusColor={getStatusColor} getTypeIcon={getTypeIcon} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

interface ApplicationListProps {
  applications: any[];
  getStatusIcon: (status: string) => JSX.Element;
  getStatusColor: (status: string) => string;
  getTypeIcon: (type: string) => string;
}

const ApplicationList = ({ applications, getStatusIcon, getStatusColor, getTypeIcon }: ApplicationListProps) => {
  if (applications.length === 0) {
    return (
      <Card className="p-8 text-center">
        <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Applications Found</h3>
        <p className="text-muted-foreground">
          You haven't submitted any applications yet, or none match your search criteria.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {applications.map((application) => (
        <Card key={application.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">{getTypeIcon(application.type)}</div>
                <div>
                  <h3 className="font-semibold text-lg">{application.title}</h3>
                  <p className="text-muted-foreground">{application.description}</p>
                </div>
              </div>
              <Badge className={`${getStatusColor(application.status)} flex items-center gap-1`}>
                {getStatusIcon(application.status)}
                {application.status.replace('_', ' ').toUpperCase()}
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">Tracking Number</div>
                  <div className="font-mono text-sm">{application.trackingNumber}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">Submitted</div>
                  <div className="text-sm">{application.submittedDate}</div>
                </div>
              </div>

              {application.amount && (
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Amount</div>
                    <div className="text-sm font-medium">R {application.amount.toLocaleString()}</div>
                  </div>
                </div>
              )}

              {application.estimatedDecision && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <div className="text-xs text-muted-foreground">Est. Decision</div>
                    <div className="text-sm">{application.estimatedDecision}</div>
                  </div>
                </div>
              )}
            </div>

            {application.notes && (
              <div className="p-3 bg-muted/50 rounded-lg mb-4">
                <div className="text-xs text-muted-foreground mb-1">Latest Update</div>
                <p className="text-sm">{application.notes}</p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Documents:</span>
                <div className="flex gap-1">
                  {application.documents.map((doc: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {doc}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-1" />
                  View Details
                </Button>
                {application.status === 'approved' && (
                  <Button variant="empowerment" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};