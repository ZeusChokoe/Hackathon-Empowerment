import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const networks: Record<string, any> = {
  sepolia: {
    chainId: "0xaa36a7",
    chainName: "Ethereum Sepolia",
    rpcUrls: ["https://rpc.sepolia.org"],
    nativeCurrency: { name: "SepoliaETH", symbol: "ETH", decimals: 18 },
    blockExplorerUrls: ["https://sepolia.etherscan.io"]
  },
  mumbai: {
    chainId: "0x13881",
    chainName: "Polygon Mumbai",
    rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    blockExplorerUrls: ["https://mumbai.polygonscan.com"]
  }
};

export default function NetworkSwitcher() {
  const [loading, setLoading] = useState<string | null>(null);

  async function switchNetwork(key: string) {
    if (!(window as any).ethereum) {
      alert("No wallet found. Please install MetaMask or another Web3 wallet.");
      return;
    }
    
    const net = networks[key];
    try {
      setLoading(key);
      
      await (window as any).ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: net.chainId }]
      });
      
      // Refresh the page to reload with new network
      window.location.reload();
    } catch (err: any) {
      if (err.code === 4902) {
        // Chain not added to wallet, add it
        try {
          await (window as any).ethereum.request({
            method: "wallet_addEthereumChain",
            params: [net]
          });
          window.location.reload();
        } catch (addError) {
          console.error("Failed to add network:", addError);
          alert("Failed to add network to wallet");
        }
      } else if (err.code === 4001) {
        // User rejected the request
        console.log("User rejected network switch");
      } else {
        console.error("Failed to switch network:", err);
        alert("Failed to switch network");
      }
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Network:</span>
      <div className="flex space-x-1">
        <Button 
          onClick={() => switchNetwork("sepolia")} 
          disabled={loading === "sepolia"}
          variant="outline"
          size="sm"
          className="text-xs"
        >
          {loading === "sepolia" ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            "Sepolia"
          )}
        </Button>
        <Button 
          onClick={() => switchNetwork("mumbai")} 
          disabled={loading === "mumbai"}
          variant="outline"
          size="sm"
          className="text-xs"
        >
          {loading === "mumbai" ? (
            <Loader2 className="h-3 w-3 animate-spin" />
          ) : (
            "Mumbai"
          )}
        </Button>
      </div>
    </div>
  );
}