import { createFileRoute } from "@tanstack/react-router";
import { Save, ServerCog } from "lucide-react";
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

export const Route = createFileRoute("/settings/email")({
  head: () => ({
    meta: [
      { title: "Email Configuration — RPA Automation Reporting" },
      {
        name: "description",
        content: "SMTP and sender configuration for automated report emails.",
      },
      { property: "og:title", content: "Email Configuration — RPA Automation Reporting" },
      {
        property: "og:description",
        content: "SMTP and sender configuration for automated report emails.",
      },
    ],
  }),
  component: EmailConfigPage,
});

function EmailConfigPage() {
  const [host, setHost] = useState("smtp.company.com");
  const [port, setPort] = useState("587");
  const [encryption, setEncryption] = useState("tls");
  const [senderName, setSenderName] = useState("RPA Reporting Bot");
  const [senderEmail, setSenderEmail] = useState("no-reply@company.com");
  const [enabled, setEnabled] = useState(true);

  return (
    <>
      <DashboardHeader
        title="Email Configuration"
        subtitle="SMTP server used for automated report delivery"
      />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-6">
          <section className="surface-card space-y-5 p-6 hover:shadow-none">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
                  <ServerCog className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold">SMTP Server</h2>
                  <p className="text-xs text-muted-foreground">
                    Used to send scheduled and on-demand report emails.
                  </p>
                </div>
              </div>
              <label className="flex items-center gap-2 text-xs text-muted-foreground">
                <Switch checked={enabled} onCheckedChange={setEnabled} />
                {enabled ? "Enabled" : "Disabled"}
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_120px_140px]">
              <div className="space-y-2">
                <Label htmlFor="smtp-host">Host</Label>
                <Input id="smtp-host" value={host} onChange={(e) => setHost(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-port">Port</Label>
                <Input id="smtp-port" value={port} onChange={(e) => setPort(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Encryption</Label>
                <Select value={encryption} onValueChange={setEncryption}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tls">TLS</SelectItem>
                    <SelectItem value="ssl">SSL</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sender-name">Sender Name</Label>
                <Input
                  id="sender-name"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sender-email">Sender Email</Label>
                <Input
                  id="sender-email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                />
              </div>
            </div>
          </section>

          <div className="flex flex-col justify-end gap-2 sm:flex-row">
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() =>
                toast.success("Test email sent", {
                  description: `A test message was sent from ${senderEmail}.`,
                })
              }
            >
              Send Test Email
            </Button>
            <Button
              className="rounded-full"
              onClick={() =>
                toast.success("Email configuration saved", {
                  description: `${host}:${port} (${encryption.toUpperCase()})`,
                })
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
