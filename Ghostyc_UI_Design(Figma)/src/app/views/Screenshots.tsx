import { Camera, Download, RefreshCw, Monitor, ImageIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/core/Card";
import { Button } from "../components/core/Button";

export function Screenshots() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-white mb-1">Display Capture</h1>
          <p className="text-neutral-400 text-sm">Request and view remote display screenshots.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex gap-2"><RefreshCw className="w-4 h-4" /> Refresh Status</Button>
          <Button className="flex gap-2"><Camera className="w-4 h-4" /> Capture Display</Button>
        </div>
      </div>

      <Card className="flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle><Monitor className="w-5 h-5 text-neutral-400" /> Latest Capture</CardTitle>
            <CardDescription>Requested today at 14:05:22</CardDescription>
          </div>
          <Button variant="ghost" size="icon"><Download className="w-4 h-4" /></Button>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col items-center justify-center min-h-[400px] p-0 relative group">
          {/* Empty State placeholder, no actual image requested yet */}
          <div className="absolute inset-0 m-6 rounded-xl border border-dashed border-white/10 bg-black/40 flex flex-col items-center justify-center text-neutral-500 space-y-4">
            <ImageIcon className="w-12 h-12 opacity-20" />
            <div className="text-center">
              <p className="text-sm font-medium text-neutral-400">No recent capture available</p>
              <p className="text-xs mt-1 max-w-sm mx-auto">Click 'Capture Display' to request a new screenshot from the remote agent.</p>
            </div>
            <Button variant="outline" size="sm" className="mt-4"><Camera className="w-4 h-4 mr-2" /> Request Capture</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
