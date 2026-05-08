import { Activity, Power, RefreshCw, Monitor, Zap, Server, Network, Shield, Cpu, HardDrive, Wifi, EyeOff } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/core/Card";
import { Button } from "../components/core/Button";
import { Badge } from "../components/core/Badge";

export function Home() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-1">Dashboard</h1>
          <p className="text-neutral-400 text-sm">Personal PC control ecosystem.</p>
        </div>
        <Badge variant="success">System Online</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* PC Status Card */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle><Monitor className="w-5 h-5 text-neutral-400" /> System Status</CardTitle>
            <CardDescription>Real-time connection overview.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <StatusItem label="Device Name" value="My Windows PC" />
              <StatusItem label="Connection" value="Connected" active />
              <StatusItem label="Agent Status" value="Running" active />
              <StatusItem label="Relay" value="Active" active />
              <StatusItem label="Wake Bridge" value="Ready" active />
              <StatusItem label="Last Heartbeat" value="2s ago" />
              <StatusItem label="Uptime" value="14d 6h 32m" />
              <StatusItem label="IP Address" value="192.168.1.104" />
            </div>
          </CardContent>
        </Card>

        {/* Quick Controls Card */}
        <Card className="col-span-1 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
          <CardHeader>
            <CardTitle><Zap className="w-5 h-5 text-neutral-400" /> Quick Actions</CardTitle>
            <CardDescription>Direct power control commands.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button className="w-full flex gap-2"><Power className="w-4 h-4" /> Wake PC</Button>
              <Button variant="outline" className="w-full flex gap-2"><EyeOff className="w-4 h-4" /> Sleep</Button>
              <Button variant="outline" className="w-full flex gap-2"><Shield className="w-4 h-4" /> Lock</Button>
              <Button variant="outline" className="w-full flex gap-2"><RefreshCw className="w-4 h-4" /> Restart</Button>
              <Button variant="danger" className="col-span-2 flex gap-2"><Power className="w-4 h-4" /> Shutdown</Button>
            </div>
          </CardContent>
        </Card>

        {/* Live Activity Card */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle><Activity className="w-5 h-5 text-neutral-400" /> Live Activity</CardTitle>
            <CardDescription>Recent commands and events stream.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 font-mono text-xs">
              <ActivityRow time="14:02:45" event="Command received: GET_PROCESSES" status="success" id="req_928fa" />
              <ActivityRow time="14:02:45" event="Sent to relay" status="pending" id="req_928fa" />
              <ActivityRow time="13:45:12" event="Agent connection verified" status="success" id="sys_hb" />
              <ActivityRow time="13:10:05" event="Command received: LOCK_SCREEN" status="success" id="req_11bc" />
              <ActivityRow time="13:10:06" event="Windows agent executed: lock" status="success" id="req_11bc" />
              
              <div className="pt-2 flex justify-center">
                <span className="text-neutral-600 italic">-- Sample UI State --</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Health Card */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle><Server className="w-5 h-5 text-neutral-400" /> Resource Health</CardTitle>
            <CardDescription>Local machine utilization.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <HealthMeter icon={<Cpu />} label="CPU Usage" value={12} />
            <HealthMeter icon={<Server />} label="Memory" value={48} />
            <HealthMeter icon={<HardDrive />} label="Disk Space" value={72} />
            <HealthMeter icon={<Network />} label="Network" value={5} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatusItem({ label, value, active }: { label: string; value: string; active?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-neutral-500 uppercase tracking-wider">{label}</span>
      <div className="flex items-center gap-2">
        {active && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
        <span className="text-sm font-medium text-neutral-200">{value}</span>
      </div>
    </div>
  );
}

function ActivityRow({ time, event, status, id }: { time: string; event: string; status: "success" | "pending" | "error"; id: string }) {
  return (
    <div className="flex items-center gap-4 py-2 border-b border-white/5 last:border-0">
      <span className="text-neutral-500 w-16">{time}</span>
      <span className="text-neutral-300 flex-1 truncate">{event}</span>
      <span className="text-neutral-500">{id}</span>
      <span className={`w-2 h-2 rounded-full ${status === 'success' ? 'bg-white' : status === 'pending' ? 'bg-neutral-500' : 'bg-neutral-700'}`} />
    </div>
  );
}

function HealthMeter({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-neutral-300">
          <div className="w-4 h-4 text-neutral-500">{icon}</div>
          {label}
        </div>
        <span className="text-white font-mono">{value}%</span>
      </div>
      <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden">
        <div 
          className="h-full bg-white/80 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
          style={{ width: `${value}%` }} 
        />
      </div>
    </div>
  );
}
