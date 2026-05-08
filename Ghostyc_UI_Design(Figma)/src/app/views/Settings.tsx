import { Shield, Key, Server, Hash, Database, Save, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/core/Card";
import { Button } from "../components/core/Button";
import { Input } from "../components/core/Input";

export function Settings() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-white mb-1">System Configuration</h1>
        <p className="text-neutral-400 text-sm">Private one-user ecosystem settings.</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex gap-4 items-start mb-8">
        <Shield className="w-5 h-5 text-neutral-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-medium text-white mb-1">Security Model: Private Personal Use</h4>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Ghostyc is designed strictly for a single user controlling their own personal hardware. 
            There are no multi-user accounts, no OAuth, no roles, and no public signups. 
            Authentication relies on private tokens and secrets managed via <code className="text-neutral-300 bg-black/30 px-1 py-0.5 rounded">.env</code> files on your infrastructure.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Authentication */}
        <Card>
          <CardHeader>
            <CardTitle><Key className="w-5 h-5 text-neutral-400" /> Authentication</CardTitle>
            <CardDescription>Dashboard access and relay tokens.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs text-neutral-400 uppercase tracking-wider">Dashboard Password</label>
              <div className="relative">
                <Input type="password" defaultValue="••••••••••••••••" />
                <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-neutral-500 hover:text-white">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-neutral-400 uppercase tracking-wider">Relay Master Token</label>
              <div className="relative">
                <Input type="password" defaultValue="gh_tok_v1_xxxxxxxxxxxxxxxxxxx" />
                <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-neutral-500 hover:text-white">
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-[10px] text-neutral-500">Stored as GHOSTYC_MASTER_TOKEN in environment.</p>
            </div>
          </CardContent>
        </Card>

        {/* Endpoints */}
        <Card>
          <CardHeader>
            <CardTitle><Server className="w-5 h-5 text-neutral-400" /> Connection Endpoints</CardTitle>
            <CardDescription>Remote relay configuration.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-neutral-400 uppercase tracking-wider">REST API URL</label>
                <Input defaultValue="https://relay.ghostyc.internal/api" />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-neutral-400 uppercase tracking-wider">WebSocket URL</label>
                <Input defaultValue="wss://relay.ghostyc.internal/ws" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Identity */}
        <Card>
          <CardHeader>
            <CardTitle><Hash className="w-5 h-5 text-neutral-400" /> Device Identifiers</CardTitle>
            <CardDescription>Target hardware definitions.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs text-neutral-400 uppercase tracking-wider">Target PC Name</label>
              <Input defaultValue="My Windows PC" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-neutral-400 uppercase tracking-wider">PC Agent ID</label>
                <Input defaultValue="agent_win_desktop_1" className="font-mono text-sm" />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-neutral-400 uppercase tracking-wider">Wake Bridge ID</label>
                <Input defaultValue="bridge_android_wol" className="font-mono text-sm" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle><Database className="w-5 h-5 text-neutral-400" /> System Preferences</CardTitle>
            <CardDescription>Logging and behavior configurations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs text-neutral-400 uppercase tracking-wider">Logging Verbosity</label>
              <select className="flex h-10 w-full rounded-lg border border-white/10 bg-black/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/30 appearance-none">
                <option value="error">Error Only</option>
                <option value="warn">Warning & Error</option>
                <option value="info" selected>Info (Recommended)</option>
                <option value="debug">Debug (Verbose)</option>
                <option value="trace">Trace (All Events)</option>
              </select>
            </div>
            
            <div className="pt-4 border-t border-white/5 flex justify-end">
              <Button className="flex gap-2"><Save className="w-4 h-4" /> Save Configuration</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
