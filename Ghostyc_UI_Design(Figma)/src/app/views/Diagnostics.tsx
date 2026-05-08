import { CheckCircle, XCircle, AlertCircle, RefreshCw, Server, Smartphone, MonitorSmartphone, Wifi, ArrowRightLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/core/Card";
import { Button } from "../components/core/Button";

export function Diagnostics() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-white mb-1">System Diagnostics</h1>
        <p className="text-neutral-400 text-sm">Connectivity testing and component health checks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DiagCard 
          title="REST API Health" 
          icon={<Server />} 
          status="ok" 
          desc="Testing standard HTTP endpoints on Railway relay." 
          lastCheck="2m ago" 
          result="200 OK - 45ms"
        />
        <DiagCard 
          title="WebSocket Connection" 
          icon={<ArrowRightLeft />} 
          status="ok" 
          desc="Real-time full-duplex connection test." 
          lastCheck="Just now" 
          result="Connected. Ping: 22ms"
        />
        <DiagCard 
          title="Windows Agent Heartbeat" 
          icon={<MonitorSmartphone />} 
          status="warning" 
          desc="Verifying local machine agent responsiveness." 
          lastCheck="5s ago" 
          result="High latency detected. Last: 850ms"
        />
        <DiagCard 
          title="Android WoL Bridge" 
          icon={<Smartphone />} 
          status="error" 
          desc="Testing connection to local network wake bridge." 
          lastCheck="1h ago" 
          result="Timeout. Bridge device offline."
        />
        <DiagCard 
          title="Command Round-trip" 
          icon={<RefreshCw />} 
          status="ok" 
          desc="End-to-end command execution test." 
          lastCheck="Never" 
          result="Ready to test."
        />
        <DiagCard 
          title="Log Stream Validation" 
          icon={<Wifi />} 
          status="ok" 
          desc="Testing log ingestion pipeline." 
          lastCheck="12m ago" 
          result="Ingesting 12 logs/sec."
        />
      </div>
    </div>
  );
}

function DiagCard({ title, icon, status, desc, lastCheck, result }: { title: string; icon: React.ReactNode; status: "ok" | "warning" | "error"; desc: string; lastCheck: string; result: string }) {
  return (
    <Card>
      <CardHeader className="pb-3 border-b border-white/5 mb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">
            <span className="text-neutral-400 w-4 h-4 mr-1 inline-block [&>svg]:w-4 [&>svg]:h-4">{icon}</span>
            {title}
          </CardTitle>
          <StatusIcon status={status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-neutral-400 h-10">{desc}</p>
        
        <div className="bg-black/30 rounded-lg p-3 border border-white/5 font-mono text-xs text-neutral-300">
          {result}
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-neutral-500">Last checked: {lastCheck}</span>
          <Button variant="outline" size="sm">Run Test</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusIcon({ status }: { status: "ok" | "warning" | "error" }) {
  if (status === "ok") return <CheckCircle className="w-5 h-5 text-neutral-400" />;
  if (status === "warning") return <AlertCircle className="w-5 h-5 text-neutral-500" />;
  if (status === "error") return <XCircle className="w-5 h-5 text-neutral-600" />; // Kept subtle, not bright red
  return null;
}
