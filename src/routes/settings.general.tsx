import { createFileRoute } from "@tanstack/react-router";
import { Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/settings/general")({
  head: () => ({
    meta: [
      { title: "General Settings — RPA Automation Reporting" },
      { name: "description", content: "Workspace preferences for the RPA reporting platform." },
      { property: "og:title", content: "General Settings — RPA Automation Reporting" },
      { property: "og:description", content: "Workspace preferences for the RPA reporting platform." },
    ],
  }),
  component: GeneralSettingsPage,
});

function GeneralSettingsPage() {
  const [workspace, setWorkspace] = useState("RPA Command Center");
  const [timezone, setTimezone] = useState("asia-jakarta");
  const [retention, setRetention] = useState("90");
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [alerts, setAlerts] = useState(true);

  return (
    <>
      <DashboardHeader title="General Settings" subtitle="Workspace preferences" />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-6">
          <section className="surface-card space-y-5 p-6 hover:shadow-none">
            <h2 className="text-sm font-bold">Workspace</h2>
            <div className="space-y-2">
              <Label htmlFor="ws-name">Workspace Name</Label>
              <Input
                id="ws-name"
                value={workspace}
                onChange={(e) => setWorkspace(e.target.value)}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Timezone</Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asia-jakarta">Asia/Jakarta (GMT+7)</SelectItem>
                    <SelectItem value="asia-singapore">Asia/Singapore (GMT+8)</SelectItem>
                    <SelectItem value="utc">UTC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Data Retention</Label>
                <Select value={retention} onValueChange={setRetention}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          <section className="surface-card space-y-1 p-6 hover:shadow-none">
            <h2 className="mb-4 text-sm font-bold">Monitoring</h2>
            <label className="flex cursor-pointer items-center justify-between gap-4 border-b border-border py-3">
              <span>
                <span className="block text-sm font-medium">Live auto-refresh</span>
                <span className="block text-xs text-muted-foreground">
                  Refresh dashboard metrics every 30 seconds.
                </span>
              </span>
              <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
            </label>
            <label className="flex cursor-pointer items-center justify-between gap-4 py-3">
              <span>
                <span className="block text-sm font-medium">Failure alerts</span>
                <span className="block text-xs text-muted-foreground">
                  Notify admins when a use case drops below its success threshold.
                </span>
              </span>
              <Switch checked={alerts} onCheckedChange={setAlerts} />
            </label>
          </section>

          <div className="flex justify-end">
            <Button
              className="rounded-full"
              onClick={() =>
                toast.success("Settings saved", { description: "Your workspace preferences were updated." })
              }
            >
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
