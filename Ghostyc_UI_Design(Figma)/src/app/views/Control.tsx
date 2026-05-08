import { Terminal, Globe, AppWindow, Keyboard, Volume2, VolumeX, Send } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/core/Card";
import { Button } from "../components/core/Button";
import { Input } from "../components/core/Input";

export function Control() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white mb-1">Control Panel</h1>
        <p className="text-neutral-400 text-sm">Execute remote actions and commands.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* App & Web Launcher */}
        <Card>
          <CardHeader>
            <CardTitle><AppWindow className="w-5 h-5 text-neutral-400" /> Launch & Open</CardTitle>
            <CardDescription>Start applications or open URLs.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs text-neutral-400 uppercase tracking-wider">Open App</label>
              <div className="flex gap-2">
                <Input placeholder="e.g. spotify, discord, calc" />
                <Button size="icon"><Send className="w-4 h-4" /></Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-neutral-400 uppercase tracking-wider">Open Website</label>
              <div className="flex gap-2">
                <Input placeholder="https://..." />
                <Button size="icon"><Send className="w-4 h-4" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Media & Input */}
        <Card>
          <CardHeader>
            <CardTitle><Keyboard className="w-5 h-5 text-neutral-400" /> Input & Media</CardTitle>
            <CardDescription>Control volume and send keystrokes.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs text-neutral-400 uppercase tracking-wider">System Volume</label>
                <span className="text-xs text-white font-mono">42%</span>
              </div>
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="shrink-0"><VolumeX className="w-4 h-4" /></Button>
                <input type="range" className="w-full accent-white h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer" defaultValue={42} />
                <Button variant="outline" size="icon" className="shrink-0"><Volume2 className="w-4 h-4" /></Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-neutral-400 uppercase tracking-wider">Keyboard Shortcut</label>
              <div className="flex gap-2">
                <Input placeholder="e.g. ctrl+shift+esc" className="font-mono text-sm" />
                <Button size="icon"><Send className="w-4 h-4" /></Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Custom Command Execution */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle><Terminal className="w-5 h-5 text-neutral-400" /> Execute Path / Command</CardTitle>
            <CardDescription>Run absolute paths, bat files, or PowerShell scripts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Input placeholder="C:\Users\Admin\Scripts\backup.bat" className="font-mono" />
              <Button className="w-32 flex gap-2"><Terminal className="w-4 h-4" /> Execute</Button>
            </div>
            <div className="bg-black/50 border border-white/5 rounded-lg p-4 font-mono text-xs text-neutral-500">
              <div className="flex justify-between items-center mb-2">
                <span className="text-neutral-400">Execution Result Placeholder</span>
                <span>Req ID: --</span>
              </div>
              <div>Ready for input...</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
