import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from "recharts";

const loanData = [
  { month: "Jan", loans: 45, repaid: 42, active: 3 },
  { month: "Feb", loans: 52, repaid: 48, active: 4 },
  { month: "Mar", loans: 67, repaid: 61, active: 6 },
  { month: "Apr", loans: 78, repaid: 72, active: 6 },
  { month: "May", loans: 89, repaid: 83, active: 6 },
  { month: "Jun", loans: 95, repaid: 88, active: 7 }
];

const impactData = [
  { name: "Education", value: 35, color: "hsl(var(--primary))" },
  { name: "Healthcare", value: 28, color: "hsl(var(--secondary))" },
  { name: "Business", value: 25, color: "hsl(var(--accent))" },
  { name: "Emergency", value: 12, color: "hsl(var(--muted-foreground))" }
];

const growthData = [
  { month: "Jan", users: 120, impact: 45000 },
  { month: "Feb", users: 185, impact: 67000 },
  { month: "Mar", users: 267, impact: 89000 },
  { month: "Apr", users: 356, impact: 125000 },
  { month: "May", users: 445, impact: 156000 },
  { month: "Jun", users: 534, impact: 189000 }
];

export const ImpactCharts = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-6 mt-8">
      {/* Loan Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📊 Loan Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={loanData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Bar dataKey="loans" fill="hsl(var(--primary))" name="Total Loans" />
              <Bar dataKey="repaid" fill="hsl(var(--secondary))" name="Repaid" />
              <Bar dataKey="active" fill="hsl(var(--accent))" name="Active" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Impact Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🎯 Impact Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={impactData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {impactData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {impactData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm">{item.name}: {item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Growth Metrics */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📈 Platform Growth & Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={growthData}>
              <defs>
                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }}
                formatter={(value, name) => [
                  name === "impact" ? `R ${value.toLocaleString()}` : value,
                  name === "users" ? "Active Users" : "Total Impact"
                ]}
              />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="users"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorUsers)"
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="impact"
                stroke="hsl(var(--secondary))"
                fillOpacity={1}
                fill="url(#colorImpact)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};