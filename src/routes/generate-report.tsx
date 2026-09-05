import { createFileRoute } from "@tanstack/react-router";
import { FileBarChart, Loader2, Mail, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { recipients, reportPeriods, reportTypes, useCases } from "@/lib/rpa-data";

export const Route = createFileRoute("/generate-report")({
  head: () => ({
    meta: [
      { title: "Generate Report — RPA Automation Reporting" },
      {
        name: "description",
        content:
          "Generate an automation performance report for any use case and send it to recipients by email automatically.",
      },
      { property: "og:title", content: "Generate Report — RPA Automation Reporting" },
      {
        property: "og:description",
        content: "Automated report generation and email distribution for RPA use cases.",
      },
    ],
  }),
  component: GenerateReportPage,
});

function GenerateReportPage() {
  const [useCase, setUseCase] = useState(useCases[0].id);
  const [reportType, setReportType] = useState(reportTypes[0]);
  const [period, setPeriod] = useState(reportPeriods[3]);
  const [selected, setSelected] = useState<string[]>([recipients[0]]);
  const [sendEmail, setSendEmail] = useState(true);
  const [generating, setGenerating] = useState(false);

  const active = useCases.find((u) => u.id === useCase)!;

  const toggleRecipient = (email: string) =>
    setSelected((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email],
    );

  const generate = () => {
    if (selected.length === 0 && sendEmail) {
      toast.error("Select at least one recipient or disable email delivery.");
      return;
    }
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      toast.success("Report generated successfully", {
        description: sendEmail
          ? `${reportType} for ${active.name} (${period}) was sent to ${selected.length} recipient(s).`
          : `${reportType} for ${active.name} (${period}) is ready in Report History.`,
      });
    }, 1600);
  };

  return (
    <>
      <DashboardHeader
        title="Generate Report"
        subtitle="Create and distribute automation reports automatically"
      />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)]">
          {/* Form */}
          <section className="surface-card space-y-6 p-6 hover:shadow-none">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
                <FileBarChart className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold">Report Configuration</h2>
                <p className="text-xs text-muted-foreground">
                  Pick a use case, format and period — the platform does the rest.
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label>Use Case</Label>
                <Select value={useCase} onValueChange={setUseCase}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select use case" />
                  </SelectTrigger>
                  <SelectContent>
                    {useCases.map((u) => (
                      <SelectItem key={u.id} value={u.id}>
                        {u.name} — {u.owner}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Period</Label>
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportPeriods.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Email Recipients</Label>
                <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-foreground">
                  <Checkbox
                    checked={sendEmail}
                    onCheckedChange={(v) => setSendEmail(v === true)}
                  />
                  Send via email after generating
                </label>
              </div>
              <div
                className={
                  sendEmail
                    ? "grid gap-2 sm:grid-cols-2"
                    : "grid gap-2 opacity-45 sm:grid-cols-2"
                }
              >
                {recipients.map((email) => (
                  <label
                    key={email}
                    className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-xs transition-colors hover:border-primary/40"
                  >
                    <Checkbox
                      disabled={!sendEmail}
                      checked={selected.includes(email)}
                      onCheckedChange={() => toggleRecipient(email)}
                    />
                    <span className="truncate">{email}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 border-t border-border pt-5 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                className="rounded-full"
                disabled={generating}
                onClick={() =>
                  toast.info("Preview saved", {
                    description: "A preview draft was added to Report History.",
                  })
                }
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Save as Draft
              </Button>
              <Button className="rounded-full" onClick={generate} disabled={generating}>
                {generating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                {generating ? "Generating..." : "Generate Report"}
              </Button>
            </div>
          </section>

          {/* Live summary */}
          <aside className="space-y-6">
            <div className="surface-card p-6 hover:shadow-none">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                Report Preview
              </p>
              <h3 className="mt-3 text-lg font-bold">{reportType}</h3>
              <p className="text-sm text-muted-foreground">
                {active.name} · {period}
              </p>

              <dl className="mt-5 space-y-3 border-t border-border pt-5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Owner</dt>
                  <dd className="font-semibold">{active.owner}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Success Rate</dt>
                  <dd className="font-semibold text-success">{active.successRate}%</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Total Processed</dt>
                  <dd className="font-semibold">{active.totalProcess.toLocaleString()}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Failed</dt>
                  <dd className="font-semibold text-destructive">{active.totalFailed}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Open Issues</dt>
                  <dd className="font-semibold">
                    {active.issues.filter((i) => i.status === "Open").length}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="surface-card flex items-start gap-3 p-5 hover:shadow-none">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
                <Mail className="h-4 w-4" />
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Once generated, the report is compiled, cleansed and emailed automatically —
                no manual data collection needed. Delivery status appears in{" "}
                <span className="font-semibold text-foreground">Email History</span>.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
