import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ethers } from 'ethers';

declare global {
  interface Window { ethereum?: any; }
}

export interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  ethBalance: number;
  tokenBalance: number;
  usdcBalance: number;
  network: string | null;
  gasPrice: number | null;
}

export const useWallet = () => {
  const { toast } = useToast();
  const [state, setState] = useState<WalletState>({
    address: null,
    isConnected: false,
    isConnecting: false,
    error: null,
    ethBalance: 0,
    tokenBalance: 0,
    usdcBalance: 0,
    network: null,
    gasPrice: null
  });

  const connect = async () => {
    if (!window.ethereum) {
      setState((s) => ({ ...s, error: "No wallet found" }));
      toast({ title: "Wallet not found", description: "Install MetaMask or a compatible wallet." });
      return;
    }
    try {
      setState((s) => ({ ...s, isConnecting: true, error: null }));
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const net = await provider.getNetwork();
      const bal = await provider.getBalance(address);
      const gasPrice = (await provider.getFeeData()).gasPrice ?? null;
      setState((s) => ({
        ...s,
        address,
        isConnected: true,
        isConnecting: false,
        network: net.name?.toString() || String(net.chainId),
        ethBalance: Number(ethers.formatEther(bal)),
        gasPrice: gasPrice ? Number(ethers.formatUnits(gasPrice, "gwei")) : null
      }));
      toast({ title: "Wallet Connected", description: address });
    } catch (e:any) {
      setState((s) => ({ ...s, isConnecting: false, error: e?.message || "Failed to connect" }));
      toast({ title: "Connection failed", description: e?.message || "Try again." });
    }
  };

  const disconnect = async () => {
    setState({
      address: null,
      isConnected: false,
      isConnecting: false,
      error: null,
      ethBalance: 0,
      tokenBalance: 0,
      usdcBalance: 0,
      network: null,
      gasPrice: null
    });
    toast({ title: "Wallet Disconnected", description: "Your wallet has been disconnected." });
  };

  const updateBalances = async () => {
    try {
      if (!window.ethereum || !state.address) return;
      const provider = new ethers.BrowserProvider(window.ethereum);
      const bal = await provider.getBalance(state.address);
      setState((s) => ({ ...s, ethBalance: Number(ethers.formatEther(bal)) }));
    } catch {}
  };

  useEffect(() => {
    if (!window.ethereum) return;
    const onAccountsChanged = (accounts:any[]) => {
      if (accounts.length === 0) disconnect();
      else setState((s) => ({ ...s, address: accounts[0] }));
    };
    const onChainChanged = (_chainId:string) => {
      window.location.reload();
    };
    window.ethereum.on?.('accountsChanged', onAccountsChanged);
    window.ethereum.on?.('chainChanged', onChainChanged);
    return () => {
      window.ethereum?.removeListener?.('accountsChanged', onAccountsChanged);
      window.ethereum?.removeListener?.('chainChanged', onChainChanged);
    };
  }, [state.address]);

  return {
    ...state,
    connect,
    disconnect,
    updateBalances
  };
};
