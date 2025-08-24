import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Shield, Home, ExternalLink } from 'lucide-react';
import { SafeReportPage } from '../SafeReportApp';

interface NavigationHeaderProps {
  currentPage: SafeReportPage;
  navigateTo: (page: SafeReportPage) => void;
  title: string;
  subtitle?: string;
}

export const NavigationHeader = ({ currentPage, navigateTo, title, subtitle }: NavigationHeaderProps) => {
  const handleBackToMain = () => {
    // Navigate back to the main FemEmpowerChain site
    window.location.href = '/';
  };

  const getPageIcon = () => {
    switch (currentPage) {
      case 'home': return <Home className="w-6 h-6" />;
      case 'report': return <Shield className="w-6 h-6" />;
      case 'donate': return <Shield className="w-6 h-6" />;
      case 'ngo': return <Shield className="w-6 h-6" />;
      case 'dao': return <Shield className="w-6 h-6" />;
      default: return <Shield className="w-6 h-6" />;
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-primary/20 sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Navigation */}
          <div className="flex items-center space-x-4">
            {/* Back to Main Site */}
            <Button 
              variant="ghost" 
              onClick={handleBackToMain}
              className="text-primary hover:text-primary/80 hover:bg-primary/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              FemEmpowerChain
            </Button>
            
            <div className="h-6 w-px bg-border"></div>
            
            {/* Current Page Info */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                {getPageIcon()}
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">{title}</h1>
                {subtitle && (
                  <p className="text-sm text-muted-foreground">{subtitle}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Section - Page Navigation */}
          <div className="flex items-center space-x-2">
            <Button
              variant={currentPage === 'home' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => navigateTo('home')}
              className="hidden sm:flex"
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            
            <Button
              variant={currentPage === 'report' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => navigateTo('report')}
              className="hidden sm:flex"
            >
              Report
            </Button>
            
            <Button
              variant={currentPage === 'donate' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => navigateTo('donate')}
              className="hidden sm:flex"
            >
              Donate
            </Button>
            
            <Button
              variant={currentPage === 'ngo' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => navigateTo('ngo')}
              className="hidden sm:flex"
            >
              NGO
            </Button>
            
            <Button
              variant={currentPage === 'dao' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => navigateTo('dao')}
              className="hidden sm:flex"
            >
              DAO
            </Button>

            {/* Status Badge */}
            <Badge variant="outline" className="text-green-600 border-green-600 hidden md:flex">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              System Online
            </Badge>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex sm:hidden mt-4 space-x-2 overflow-x-auto pb-2">
          <Button
            variant={currentPage === 'home' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => navigateTo('home')}
            className="flex-shrink-0"
          >
            <Home className="w-4 h-4 mr-1" />
            Home
          </Button>
          <Button
            variant={currentPage === 'report' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => navigateTo('report')}
            className="flex-shrink-0"
          >
            Report
          </Button>
          <Button
            variant={currentPage === 'donate' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => navigateTo('donate')}
            className="flex-shrink-0"
          >
            Donate
          </Button>
          <Button
            variant={currentPage === 'ngo' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => navigateTo('ngo')}
            className="flex-shrink-0"
          >
            NGO
          </Button>
          <Button
            variant={currentPage === 'dao' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => navigateTo('dao')}
            className="flex-shrink-0"
          >
            DAO
          </Button>
        </div>
      </div>
    </div>
  );
};