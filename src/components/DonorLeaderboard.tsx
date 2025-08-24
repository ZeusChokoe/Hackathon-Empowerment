import { useEffect, useState } from "react";
import { useContracts } from "@/hooks/useContracts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";

interface DonorStats {
  address: string;
  totalDonated: string;
  donationCount: number;
  rank: number;
}

export default function DonorLeaderboard() {
  const { periodAid } = useContracts();
  const [leaderboard, setLeaderboard] = useState<DonorStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Implement donor leaderboard logic
    // This will fetch donation events and calculate rankings
    setLoading(false);
  }, [periodAid]);

  if (loading) {
    return <div className="animate-pulse">Loading leaderboard...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Top Donors
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboard.length === 0 ? (
            <p className="text-muted-foreground">No donations yet</p>
          ) : (
            leaderboard.map((donor) => (
              <div key={donor.address} className="flex justify-between items-center">
                <div>
                  <span className="font-medium">#{donor.rank}</span>
                  <span className="ml-2 text-sm">{donor.address.slice(0, 6)}...{donor.address.slice(-4)}</span>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${donor.totalDonated}</div>
                  <div className="text-xs text-muted-foreground">{donor.donationCount} donations</div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}