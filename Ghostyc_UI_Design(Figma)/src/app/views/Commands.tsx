import { Clock, RefreshCw, XCircle, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/core/Card";
import { Badge } from "../components/core/Badge";

export function Commands() {
  const commands = [
    { id: "req_928fa", time: "14:02:45", cmd: "GET_PROCESSES", status: "success", dur: "120ms", retry: 0, err: "-" },
    { id: "req_881cc", time: "13:58:12", cmd: "OPEN_URL", status: "success", dur: "450ms", retry: 0, err: "-" },
    { id: "req_11bc2", time: "13:10:05", cmd: "LOCK_SCREEN", status: "success", dur: "80ms", retry: 0, err: "-" },
    { id: "req_error", time: "11:45:00", cmd: "EXECUTE_PATH", status: "failed", dur: "5000ms", retry: 2, err: "Path not found" },
    { id: "req_pend1", time: "11:40:22", cmd: "WAKE_ON_LAN", status: "sent", dur: "---", retry: 0, err: "-" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white mb-1">Command History</h1>
        <p className="text-neutral-400 text-sm">Recent instructions and execution status.</p>
      </div>

      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle><Clock className="w-5 h-5 text-neutral-400" /> Execution Queue</CardTitle>
          <CardDescription>History of commands sent to the remote agent.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-black/40 text-neutral-500 border-y border-white/5">
                <tr>
                  <th className="px-6 py-3 font-medium">Timestamp</th>
                  <th className="px-6 py-3 font-medium">Request ID</th>
                  <th className="px-6 py-3 font-medium">Command</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Duration</th>
                  <th className="px-6 py-3 font-medium">Retries</th>
                  <th className="px-6 py-3 font-medium">Error</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {commands.map((c) => (
                  <tr key={c.id} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-3 whitespace-nowrap text-neutral-400 font-mono text-xs">{c.time}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-neutral-500 font-mono text-xs group-hover:text-neutral-300">{c.id}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-white font-mono">{c.cmd}</td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {c.status === "success" && <Badge variant="success"><CheckCircle2 className="w-3 h-3" /> Success</Badge>}
                      {c.status === "failed" && <Badge variant="danger"><XCircle className="w-3 h-3" /> Failed</Badge>}
                      {c.status === "sent" && <Badge variant="warning"><RefreshCw className="w-3 h-3 animate-spin" /> Sent</Badge>}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-neutral-400 font-mono text-xs">{c.dur}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-neutral-500">{c.retry}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-neutral-500 truncate max-w-[150px]">{c.err}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
