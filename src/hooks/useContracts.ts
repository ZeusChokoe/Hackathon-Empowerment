import { useMemo } from "react";
import { ethers } from "ethers";
import contracts from "@/config/contracts.json";
import PeriodAidABI from "@/abi/PeriodAidDonations.json";
import SafeReportABI from "@/abi/SafeReportRegistry.json";

export function useProvider() {
  const provider = useMemo(() => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      const eth = (window as any).ethereum;
      const prov = new ethers.BrowserProvider(eth);
      return prov;
    }
    return null;
  }, []);
  return provider;
}

export function useContracts() {
  const provider = useProvider();
  const signerPromise = useMemo(async () => {
    if (!provider) return null;
    try {
      return await provider.getSigner();
    } catch {
      return null;
    }
  }, [provider]);

  const network = contracts.defaultNetwork as keyof typeof contracts["contracts"]["PeriodAidDonations"];
  const addresses = contracts.contracts as any;

  const periodAid = useMemo(() => {
    const addr = addresses?.PeriodAidDonations?.[network];
    if (!provider || !addr) return null;
    return new ethers.Contract(addr, PeriodAidABI as any, provider);
  }, [provider, network]);

  const safeReport = useMemo(() => {
    const addr = addresses?.SafeReportRegistry?.[network];
    if (!provider || !addr) return null;
    return new ethers.Contract(addr, SafeReportABI as any, provider);
  }, [provider, network]);

  async function withSigner<T extends ethers.Contract>(contract: T): Promise<T | null> {
    if (!contract || !provider) return null as any;
    const signer = await signerPromise;
    if (!signer) return null as any;
    return contract.connect(signer) as T;
  }

  return { provider, periodAid, safeReport, withSigner };
}
