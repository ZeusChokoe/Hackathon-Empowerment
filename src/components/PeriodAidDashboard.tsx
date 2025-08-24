import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useContracts } from "@/hooks/useContracts";
import { usePeriodAidEvents } from "@/hooks/usePeriodAidEvents";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

type Req = {
  id: number;
  creator: string;
  beneficiary: string;
  stable: string;
  targetAmount: string;
  totalRaised: string;
  status: number;
  category: string;
  cid: string;
};

// Helper function to export events to CSV
function exportEventsToCSV(events: any[]) {
  const headers = ["event", "requestId", "donor", "amount", "timestamp"];
  const rows = events.map(ev => [
    ev.name,
    ev.args?.requestId?.toString() || "",
    ev.args?.donor || "",
    ev.args?.amount?.toString() || "",
    ev.args?.timestamp ? new Date(Number(ev.args.timestamp) * 1000).toISOString() : ""
  ]);
  const csv = [headers, ...rows].map(r => r.join(",")).join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "periodaid-events.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export default function PeriodAidDashboard() {
  const { periodAid } = useContracts();
  const { events } = usePeriodAidEvents();
  const [requests, setRequests] = useState<Req[]>([]);

  useEffect(() => {
    (async () => {
      if (!periodAid) return;
      try {
        const cnt = await (periodAid as any).requestCount();
        const list: Req[] = [];
        for (let i = 0; i < Number(cnt); i++) {
          const r = await (periodAid as any).requests(i);
          list.push({
            id: i,
            creator: r.creator,
            beneficiary: r.beneficiary,
            stable: r.stable,
            targetAmount: r.targetAmount.toString(),
            totalRaised: r.totalRaised.toString(),
            status: Number(r.status),
            category: r.category,
            cid: r.cid
          });
        }
        setRequests(list.reverse());
      } catch {}
    })();
  }, [periodAid, events]); // refresh when events change

  const statusLabel = (s:number) => ["Pending","Fundraising","Funded","Released","Cancelled","Refunding"][s] || String(s);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">PeriodAid Dashboard</h1>
        <Button 
          onClick={() => exportEventsToCSV(events)}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl border">
          <h2 className="font-semibold mb-2">Live Events</h2>
          <div className="space-y-2 max-h-96 overflow-auto">
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

        <div className="p-4 rounded-2xl border">
          <h2 className="font-semibold mb-2">Requests</h2>
          <div className="space-y-3 max-h-96 overflow-auto">
            {requests.map((r) => (
              <div key={r.id} className="p-2 border rounded">
                <div className="flex justify-between text-sm">
                  <div>#{r.id} · {r.category}</div>
                  <div className="opacity-70">{statusLabel(r.status)}</div>
                </div>
                <div className="text-xs opacity-70">creator: {r.creator.slice(0,10)}…</div>
                <div className="text-xs">target: {r.targetAmount}</div>
                <div className="text-xs">raised: {r.totalRaised}</div>
                <div className="text-xs">cid: <code>{r.cid}</code></div>
              </div>
            ))}
            {requests.length === 0 && <div className="text-sm opacity-60">No requests yet…</div>}
          </div>
        </div>
      </div>
    </div>
  );
}