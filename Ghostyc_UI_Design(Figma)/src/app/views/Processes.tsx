import { Activity, Search, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/core/Card";
import { Input } from "../components/core/Input";
import { Button } from "../components/core/Button";
import { Badge } from "../components/core/Badge";

export function Processes() {
  const processes = [
    { name: "Discord.exe", pid: "14052", cpu: "0.4%", mem: "412 MB", status: "Running" },
    { name: "Spotify.exe", pid: "9820", cpu: "0.1%", mem: "156 MB", status: "Running" },
    { name: "chrome.exe", pid: "2104", cpu: "2.4%", mem: "1.2 GB", status: "Running" },
    { name: "Code.exe", pid: "8492", cpu: "1.2%", mem: "840 MB", status: "Running" },
    { name: "Notepad.exe", pid: "5320", cpu: "0.0%", mem: "12 MB", status: "Suspended" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-1">Processes</h1>
          <p className="text-neutral-400 text-sm">View and manage running applications.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <Input placeholder="Search processes..." className="pl-9" />
          </div>
          <Button variant="outline" size="icon"><Activity className="w-4 h-4" /></Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="border-b border-white/5 pb-4">
          <CardTitle><Activity className="w-5 h-5 text-neutral-400" /> Task List</CardTitle>
          <CardDescription>Live snapshot of local machine processes.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase bg-black/40 text-neutral-500 border-y border-white/5">
                <tr>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">PID</th>
                  <th className="px-6 py-3 font-medium">CPU</th>
                  <th className="px-6 py-3 font-medium">Memory</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {processes.map((p) => (
                  <tr key={p.pid} className="hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-3 whitespace-nowrap text-white font-medium">{p.name}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-neutral-500 font-mono text-xs">{p.pid}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-neutral-300 font-mono">{p.cpu}</td>
                    <td className="px-6 py-3 whitespace-nowrap text-neutral-300 font-mono">{p.mem}</td>
                    <td className="px-6 py-3 whitespace-nowrap">
                      {p.status === "Running" ? (
                        <Badge variant="default" className="bg-white/5">Running</Badge>
                      ) : (
                        <Badge variant="offline">Suspended</Badge>
                      )}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-right">
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-neutral-500 hover:text-white hover:bg-white/10">
                        <X className="w-4 h-4" />
                      </Button>
                    </td>
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
