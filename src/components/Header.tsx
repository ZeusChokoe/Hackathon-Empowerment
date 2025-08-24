import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Wallet, Menu, X, Zap } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useWallet } from "@/hooks/useWallet";
import NetworkSwitcher from "./NetworkSwitcher";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
    address,
    isConnected,
    isConnecting,
    connectWallet,
    formatAddress,
    ethBalance,
    tokenBalance,
    usdcBalance
  } = useWallet();

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">F</span>
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              FemEmpowerChain
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/periodaid" className="text-foreground hover:text-primary transition-smooth">
              PeriodAid
            </Link>
            <a href="#loans" className="text-foreground hover:text-primary transition-smooth">
              Loans
            </a>
            <a href="#education" className="text-foreground hover:text-primary transition-smooth">
              Education
            </a>
            <a href="#donate" className="text-foreground hover:text-primary transition-smooth">
              Donate
            </a>
            <Link to="/safereport" className="text-foreground hover:text-primary transition-smooth">
              SafeReport
            </Link>
          </nav>

          {/* Wallet Connection & Network Switcher */}
          <div className="hidden md:flex items-center space-x-4">
            <NetworkSwitcher />
            {isConnected && (
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  R {(usdcBalance * 18.5).toFixed(0)}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  ETH: {ethBalance.toFixed(3)}
                </Badge>
              </div>
            )}
            <Button
              variant={isConnected ? "secondary" : "empowerment"}
              onClick={connectWallet}
              className="gap-2"
              disabled={isConnecting}
            >
              <Wallet className="w-4 h-4" />
              {isConnecting ? "Connecting..." : isConnected ? `Connected (${formatAddress(address!)})` : "Connect Wallet"}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/50">
            <nav className="flex flex-col space-y-4 mt-4">
              <Link to="/periodaid" className="text-foreground hover:text-primary transition-smooth">
                PeriodAid
              </Link>
              <a href="#loans" className="text-foreground hover:text-primary transition-smooth">
                Loans
              </a>
              <a href="#education" className="text-foreground hover:text-primary transition-smooth">
                Education
              </a>
              <a href="#donate" className="text-foreground hover:text-primary transition-smooth">
                Donate
              </a>
              <Link to="/safereport" className="text-foreground hover:text-primary transition-smooth">
                SafeReport
              </Link>
              <div className="pt-4 border-t border-border/50">
                <NetworkSwitcher />
              </div>
              {isConnected && (
                <div className="flex gap-2 mb-4">
                  <Badge variant="outline" className="text-xs">
                    <Zap className="w-3 h-3 mr-1" />
                    R {(usdcBalance * 18.5).toFixed(0)}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    ETH: {ethBalance.toFixed(3)}
                  </Badge>
                </div>
              )}
              <Button
                variant={isConnected ? "secondary" : "empowerment"}
                onClick={connectWallet}
                className="gap-2 w-full"
                disabled={isConnecting}
              >
                <Wallet className="w-4 h-4" />
                {isConnecting ? "Connecting..." : isConnected ? `Connected (${formatAddress(address!)})` : "Connect Wallet"}
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;