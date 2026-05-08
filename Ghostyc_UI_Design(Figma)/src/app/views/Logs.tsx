import { FileText, Search, Download, Trash2, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/core/Card";
import { Button } from "../components/core/Button";
import { Input } from "../components/core/Input";
import { Badge } from "../components/core/Badge";

export function Logs() {
  const logs = [
    { time: "14:05:22.105", svc: "Web Dashboard", lvl: "INFO", msg: "User initiated screenshot capture", req: "req_992x1" },
    { time: "14:05:22.140", svc: "Railway Relay", lvl: "INFO", msg: "Routed command CAPTURE_DISPLAY to ws://client-1", req: "req_992x1" },
    { time: "14:05:22.302", svc: "Windows Agent", lvl: "INFO", msg: "Received CAPTURE_DISPLAY payload", req: "req_992x1" },
    { time: "14:05:23.001", svc: "Windows Agent", lvl: "ERROR", msg: "Failed to initialize DXGI output duplication", req: "req_992x1" },
    { time: "14:05:23.045", svc: "Railway Relay", lvl: "WARN", msg: "Agent responded with error code 5001", req: "req_992x1" },
    { time: "14:05:23.100", svc: "Web Dashboard", lvl: "ERROR", msg: "Capture failed. Target display not found.", req: "req_992x1" },
    { time: "14:00:00.000", svc: "Android WoL Bridge", lvl: "INFO", msg: "Sent magic packet to 00:1A:2B:3C:4D:5E", req: "req_wol_1" },
    { time: "13:59:55.120", svc: "iPhone App", lvl: "INFO", msg: "User triggered Wake PC", req: "req_wol_1" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4 shrink-0">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-1">System Logs</h1>
          <p className="text-neutral-400 text-sm">Aggregated telemetry across the ecosystem.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="flex gap-2"><Download className="w-4 h-4" /> Export</Button>
          <Button variant="danger" size="sm" className="flex gap-2"><Trash2 className="w-4 h-4" /> Clear Local</Button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden min-h-[400px]">
        <div className="p-4 border-b border-white/5 bg-black/20 flex flex-col gap-4 shrink-0">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <Input placeholder="Search logs, errors, or request IDs..." className="pl-9 bg-black/40" />
            </div>
            <Button variant="outline" className="flex gap-2"><Filter className="w-4 h-4" /> Filter</Button>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="default" className="cursor-pointer hover:bg-white/20">All Services</Badge>
            <Badge variant="offline" className="cursor-pointer hover:bg-neutral-800">Web Dashboard</Badge>
            <Badge variant="offline" className="cursor-pointer hover:bg-neutral-800">Railway Relay</Badge>
            <Badge variant="offline" className="cursor-pointer hover:bg-neutral-800">Windows Agent</Badge>
            <Badge variant="offline" className="cursor-pointer hover:bg-neutral-800">iPhone App</Badge>
            <Badge variant="offline" className="cursor-pointer hover:bg-neutral-800">Android WoL Bridge</Badge>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-black/40 p-4 font-mono text-xs">
          <div className="space-y-1">
            {logs.map((log, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 py-1.5 border-b border-white/[0.02] hover:bg-white/[0.02] rounded px-2 transition-colors">
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-neutral-500 w-24">{log.time}</span>
                  <span className={`w-12 font-bold ${
                    log.lvl === 'INFO' ? 'text-blue-400' :
                    log.lvl === 'WARN' ? 'text-yellow-400' :
                    log.lvl === 'ERROR' ? 'text-red-400' : 'text-white'
                  }`}>{log.lvl}</span>
                </div>
                <div className="flex-1 flex flex-col sm:flex-row gap-2 sm:gap-4 min-w-0">
                  <span className="text-neutral-400 w-32 shrink-0 truncate">[{log.svc}]</span>
                  <span className="text-neutral-300 flex-1 break-all">{log.msg}</span>
                  <span className="text-neutral-600 w-20 shrink-0 truncate">{log.req}</span>
                </div>
              </div>
            ))}
            <div className="py-8 text-center text-neutral-600 italic">End of log stream</div>
          </div>
        </div>
      </Card>
    </div>
  );
}
