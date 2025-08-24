import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWallet } from "@/hooks/useWallet";
import { useToast } from "@/hooks/use-toast";
import { useContracts } from "@/hooks/useContracts";
import { usePeriodAidEvents } from "@/hooks/usePeriodAidEvents";
import contracts from "@/config/contracts.json";
import PeriodAidABI from "@/abi/PeriodAidDonations.json";

const keccak256 = (s: string) => ethers.keccak256(ethers.toUtf8Bytes(s));

export default function PeriodAidAdmin() {
  const { address, isConnected } = useWallet();
  const { toast } = useToast();
  const { periodAid, withSigner } = useContracts();
  const { events } = usePeriodAidEvents();

  const [isVerifier, setIsVerifier] = useState(false);
  const [isTreasury, setIsTreasury] = useState(false);

  const [requestId, setRequestId] = useState<string>("0");
  const [beneficiary, setBeneficiary] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const network = (contracts as any).defaultNetwork as 'sepolia'|'polygonMumbai';
  const PAD_ADDR = (contracts as any).contracts?.PeriodAidDonations?.[network] || '';

  useEffect(() => {
    (async () => {
      try {
        if (!isConnected || !address || !periodAid) return;
        // Use hasRole via ABI; role hashes computed here
        const vRole = keccak256("VERIFIER_ROLE");
        const tRole = keccak256("TREASURY_ROLE");
        const hasV = await (periodAid as any).hasRole(vRole, address);
        const hasT = await (periodAid as any).hasRole(tRole, address);
        setIsVerifier(Boolean(hasV));
        setIsTreasury(Boolean(hasT));
      } catch (e:any) {
        // If ABI/network not ready, ignore
      }
    })();
  }, [isConnected, address, periodAid]);

  const verify = async () => {
    try {
      setLoading(true);
      const c = await withSigner(periodAid as any);
      const tx = await (c as any).verifyRequest(Number(requestId));
      await tx.wait();
      toast({ title: "Request verified", description: `#${requestId}` });
    } catch (e:any) {
      toast({ title: "Verify failed", description: e?.message || "Try again" });
    } finally {
      setLoading(false);
    }
  };

  const approveForRelease = async () => {
    try {
      setLoading(true);
      const c = await withSigner(periodAid as any);
      const tx = await (c as any).approveForRelease(Number(requestId), beneficiary || ethers.ZeroAddress);
      await tx.wait();
      toast({ title: "Approved for release", description: `#${requestId}` });
    } catch (e:any) {
      toast({ title: "Approve failed", description: e?.message || "Try again" });
    } finally {
      setLoading(false);
    }
  };

  const release = async () => {
    try {
      setLoading(true);
      const c = await withSigner(periodAid as any);
      const tx = await (c as any).release(Number(requestId));
      await tx.wait();
      toast({ title: "Released", description: `#${requestId}` });
    } catch (e:any) {
      toast({ title: "Release failed", description: e?.message || "Try again" });
    } finally {
      setLoading(false);
    }
  };

  const cancel = async () => {
    try {
      setLoading(true);
      const c = await withSigner(periodAid as any);
      const tx = await (c as any).cancel(Number(requestId));
      await tx.wait();
      toast({ title: "Cancelled", description: `#${requestId}` });
    } catch (e:any) {
      toast({ title: "Cancel failed", description: e?.message || "Try again" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">PeriodAid Admin / NGO</h1>

      {!PAD_ADDR && (
        <div className="p-3 rounded bg-yellow-100 text-yellow-900">
          Configure contract addresses in <code>src/config/contracts.json</code>.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl border">
          <h2 className="font-semibold mb-2">Your Roles</h2>
          <div className="text-sm">Address: <code>{address || "Not connected"}</code></div>
          <div className="mt-2">
            <span className={"px-2 py-1 rounded " + (isVerifier ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600")}>Verifier</span>
            <span className={"ml-2 px-2 py-1 rounded " + (isTreasury ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600")}>Treasury</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl border">
          <h2 className="font-semibold mb-2">Controls</h2>
          <div className="space-y-2">
            <label className="block text-sm">Request ID</label>
            <input value={requestId} onChange={e=>setRequestId(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="0" />
            <label className="block text-sm">Beneficiary (optional)</label>
            <input value={beneficiary} onChange={e=>setBeneficiary(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="0x..." />
            <div className="flex gap-2 flex-wrap mt-2">
              <button onClick={verify} disabled={!isVerifier || loading} className="px-3 py-2 rounded bg-blue-600 text-white disabled:opacity-50">Verify</button>
              <button onClick={approveForRelease} disabled={!isVerifier || loading} className="px-3 py-2 rounded bg-indigo-600 text-white disabled:opacity-50">Approve for Release</button>
              <button onClick={release} disabled={!isTreasury || loading} className="px-3 py-2 rounded bg-green-600 text-white disabled:opacity-50">Release</button>
              <button onClick={cancel} disabled={loading} className="px-3 py-2 rounded bg-red-600 text-white disabled:opacity-50">Cancel</button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl border">
        <h2 className="font-semibold mb-3">Live Events</h2>
        <div className="space-y-2 max-h-80 overflow-auto">
          {events.map((e, i) => (
            <div key={e.txHash + i} className="text-sm p-2 rounded border">
              <div className="font-semibold">{e.name}</div>
              <div className="text-xs opacity-70">block #{e.blockNumber} · {e.txHash.slice(0,10)}...</div>
              <pre className="text-xs whitespace-pre-wrap break-all mt-1">{JSON.stringify(e.args, null, 2)}</pre>
            </div>
          ))}
          {events.length === 0 && <div className="text-sm opacity-60">No events yet…</div>}
        </div>
      </div>
    </div>
  );
}
