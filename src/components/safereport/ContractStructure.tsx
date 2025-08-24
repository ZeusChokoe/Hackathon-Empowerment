import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Code, Shield, Lock, Users, ExternalLink, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const ContractStructure = () => {
  const { toast } = useToast();

  const contracts = [
    {
      name: 'SafeReportCore',
      address: '0x742d35Cc6635C0532925a3b8D91CA2F0b24cA231',
      purpose: 'Main reporting contract with encrypted data storage',
      verified: true,
      functions: ['submitReport', 'verifyReport', 'updateStatus'],
    },
    {
      name: 'DonationManager',
      address: '0x8f2A4e6b9C7d3E1F5a9B8C6D4E2F3A1B5C7D9E8F',
      purpose: 'Handles donations and fund distribution',
      verified: true,
      functions: ['donate', 'claimFunds', 'trackDonations'],
    },
    {
      name: 'SAFEToken',
      address: '0x1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B',
      purpose: 'Governance token for DAO voting',
      verified: true,
      functions: ['transfer', 'delegate', 'vote'],
    },
    {
      name: 'SafeReportDAO',
      address: '0xF1E2D3C4B5A69788C7D6E5F4A3B2C1D0E9F8A7B6',
      purpose: 'Decentralized governance and proposal system',
      verified: true,
      functions: ['createProposal', 'vote', 'executeProposal'],
    },
  ];

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address Copied",
      description: "Contract address copied to clipboard",
    });
  };

  return (
    <div className="space-y-6">
      {/* Smart Contract Architecture */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Code className="w-5 h-5 mr-2" />
            Smart Contract Architecture
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {contracts.map((contract, index) => (
            <div key={contract.address}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold">{contract.name}</h4>
                    {contract.verified && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {contract.purpose}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <code className="bg-muted px-2 py-1 rounded font-mono">
                      {contract.address}
                    </code>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyAddress(contract.address)}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 px-2">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Etherscan
                    </Button>
                  </div>
                  <div className="flex items-center space-x-1 mt-2">
                    {contract.functions.map((func) => (
                      <Badge key={func} variant="secondary" className="text-xs">
                        {func}()
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              {index < contracts.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Security Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lock className="w-5 h-5 mr-2" />
            Security Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h5 className="font-medium">Multi-Signature Protection</h5>
                  <p className="text-sm text-muted-foreground">
                    Requires 3/5 NGO signatures for critical operations
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h5 className="font-medium">Time-lock Delays</h5>
                  <p className="text-sm text-muted-foreground">
                    48-hour delay for governance proposal execution
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h5 className="font-medium">Encrypted Storage</h5>
                  <p className="text-sm text-muted-foreground">
                    All sensitive data encrypted before blockchain storage
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h5 className="font-medium">Audit Trail</h5>
                  <p className="text-sm text-muted-foreground">
                    Immutable record of all transactions and votes
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h5 className="font-medium">Emergency Pause</h5>
                  <p className="text-sm text-muted-foreground">
                    Circuit breaker to halt operations if needed
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h5 className="font-medium">Access Control</h5>
                  <p className="text-sm text-muted-foreground">
                    Role-based permissions for different user types
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Governance Structure */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Governance Structure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h5 className="font-semibold mb-1">NGO Council</h5>
                <p className="text-sm text-muted-foreground">
                  Verified organizations with report validation rights
                </p>
                <Badge variant="outline" className="mt-2">5 Active NGOs</Badge>
              </div>
              
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h5 className="font-semibold mb-1">Token Holders</h5>
                <p className="text-sm text-muted-foreground">
                  SAFE token holders with governance voting power
                </p>
                <Badge variant="outline" className="mt-2">247 Holders</Badge>
              </div>
              
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <h5 className="font-semibold mb-1">Multi-Sig</h5>
                <p className="text-sm text-muted-foreground">
                  Emergency council for critical security decisions
                </p>
                <Badge variant="outline" className="mt-2">3/5 Required</Badge>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <h5 className="font-semibold mb-2">Voting Thresholds</h5>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Report Verification:</span>
                  <p className="font-medium">3 NGO approvals</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Funding Release:</span>
                  <p className="font-medium">5 DAO votes (51% majority)</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Policy Changes:</span>
                  <p className="font-medium">66% token holder approval</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Emergency Actions:</span>
                  <p className="font-medium">3/5 Multi-sig + 24h delay</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};