import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Shield,
  Zap,
  Heart
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">F</span>
              </div>
              <span className="text-xl font-bold">FemEmpowerChain</span>
            </div>
            <p className="text-background/80 max-w-sm">
              Empowering South African women through blockchain technology, providing secure access to micro-loans, education, and healthcare.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="text-background hover:text-foreground hover:bg-background/10">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-foreground hover:bg-background/10">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-foreground hover:bg-background/10">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background hover:text-foreground hover:bg-background/10">
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <nav className="space-y-2">
              <a href="#dashboard" className="block text-background/80 hover:text-background transition-smooth">
                Dashboard
              </a>
              <a href="#loans" className="block text-background/80 hover:text-background transition-smooth">
                Apply for Loans
              </a>
              <a href="#education" className="block text-background/80 hover:text-background transition-smooth">
                Education Hub
              </a>
              <a href="#donate" className="block text-background/80 hover:text-background transition-smooth">
                Donate & Support
              </a>
              <a href="#impact" className="block text-background/80 hover:text-background transition-smooth">
                Impact Metrics
              </a>
            </nav>
          </div>

          {/* Support & Resources */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <nav className="space-y-2">
              <a href="#" className="block text-background/80 hover:text-background transition-smooth">
                Help Center
              </a>
              <a href="#" className="block text-background/80 hover:text-background transition-smooth">
                Privacy Policy
              </a>
              <a href="#" className="block text-background/80 hover:text-background transition-smooth">
                Terms of Service
              </a>
              <a href="#" className="block text-background/80 hover:text-background transition-smooth">
                Smart Contract Audit
              </a>
              <a href="#" className="block text-background/80 hover:text-background transition-smooth">
                Blockchain Explorer
              </a>
            </nav>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Connected</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-background/80">
                <Mail className="w-4 h-4" />
                <span className="text-sm">hello@femempowerchain.org</span>
              </div>
              <div className="flex items-center gap-2 text-background/80">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+27 (0) 11 123 4567</span>
              </div>
              <div className="flex items-center gap-2 text-background/80">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Cape Town, South Africa</span>
              </div>
            </div>
            
            <div>
              <p className="text-background/80 text-sm mb-3">Subscribe for impact updates</p>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Your email"
                  className="bg-background/10 border-background/20 text-background placeholder:text-background/60"
                />
                <Button variant="secondary" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-background/80 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Blockchain Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>BlockDAG Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>Made in South Africa</span>
              </div>
            </div>
            
            <div className="text-background/60 text-sm">
              © 2024 FemEmpowerChain. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;