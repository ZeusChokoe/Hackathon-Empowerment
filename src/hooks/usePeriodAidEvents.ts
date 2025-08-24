import { useEffect, useState } from "react";
import { ethers } from "ethers";
import PeriodAidABI from "@/abi/PeriodAidDonations.json";
import contracts from "@/config/contracts.json";

type EventLog = {
  name: string;
  args: any;
  txHash: string;
  blockNumber: number;
  timestamp?: number;
};

export function usePeriodAidEvents() {
  const [events, setEvents] = useState<EventLog[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || !(window as any).ethereum) return;
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const network = (contracts as any).defaultNetwork as 'sepolia'|'polygonMumbai';
    const addr = (contracts as any).contracts?.PeriodAidDonations?.[network];
    if (!addr) return;

    const iface = new ethers.Interface(PeriodAidABI as any);

    (async () => {
      const ethProv = await provider;
      // Subscribe to logs for all contract events
      const filter = {
        address: addr,
        topics: [] as string[]
      };
      const onLog = async (log: any) => {
        try {
          const parsed = iface.parseLog(log);
          const block = await (await provider).getBlock(log.blockNumber);
          const item: EventLog = {
            name: parsed?.name || "Unknown",
            args: parsed?.args ? JSON.parse(JSON.stringify(parsed.args)) : {},
            txHash: log.transactionHash,
            blockNumber: log.blockNumber,
            timestamp: Number(block?.timestamp ?? 0) * 1000
          };
          setEvents((prev) => [item, ...prev].slice(0, 200));
        } catch (e) {
          // ignore parse errors
        }
      };
      ethProv.on(filter, onLog);
      return () => {
        ethProv.off(filter, onLog);
      };
    })();
  }, []);

  return { events };
}
