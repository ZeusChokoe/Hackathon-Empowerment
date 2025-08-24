import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Wallet, Fuel, Coins, DollarSign, RefreshCw, TrendingUp } from 'lucide-react';
import { WalletState } from '@/hooks/useWallet';

interface WalletBalanceProps {
  wallet: WalletState & {
    connectWallet: () => Promise<string | undefined>;
    disconnectWallet: () => void;
    formatAddress: (address: string) => string;
    updateBalances: () => Promise<void>;
    convertUSDToZAR: (usd: number) => number;
    convertETHToZAR: (eth: number) => number;
  };
}

export const WalletBalance = ({ wallet }: WalletBalanceProps) => {
  if (!wallet.isConnected) return null;

  const handleRefreshBalances = async () => {
    await wallet.updateBalances();
  };

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center">
            <Wallet className="w-5 h-5 mr-2" />
            Wallet Overview
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleRefreshBalances}
            className="hover:bg-primary/10"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {wallet.formatAddress(wallet.address!)}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Token Balances */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-background/60 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground">ETH Balance</span>
              <Coins className="w-4 h-4 text-blue-500" />
            </div>
            <p className="font-bold text-lg">{wallet.ethBalance.toFixed(4)} ETH</p>
            <p className="text-xs text-muted-foreground">
              ≈ R{wallet.convertETHToZAR(wallet.ethBalance).toLocaleString('en-ZA', { maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className="bg-background/60 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground">USDC Balance</span>
              <DollarSign className="w-4 h-4 text-green-500" />
            </div>
            <p className="font-bold text-lg">{wallet.usdcBalance.toLocaleString()} USDC</p>
            <p className="text-xs text-muted-foreground">
              ≈ R{wallet.convertUSDToZAR(wallet.usdcBalance).toLocaleString('en-ZA', { maximumFractionDigits: 0 })}
            </p>
          </div>

          <div className="bg-background/60 rounded-lg p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-muted-foreground">SAFE Tokens</span>
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <p className="font-bold text-lg">{wallet.tokenBalance.toFixed(2)} SAFE</p>
            <p className="text-xs text-muted-foreground">
              Governance + Rewards
            </p>
          </div>
        </div>

        {/* Gas Information */}
        <div className="bg-background/60 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Fuel className="w-4 h-4 text-orange-500 mr-2" />
              <span className="text-sm font-medium">Network Gas</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {wallet.gasPrice} Gwei
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div>
              <span>Standard Transfer:</span>
              <p className="font-medium">~R{(wallet.gasPrice * 21000 / 1e9 * 45000).toFixed(2)}</p>
            </div>
            <div>
              <span>Token Transfer:</span>
              <p className="font-medium">~R{(wallet.gasPrice * 65000 / 1e9 * 45000).toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <DollarSign className="w-4 h-4 mr-1" />
            Buy USDC
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Coins className="w-4 h-4 mr-1" />
            Bridge ETH
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};