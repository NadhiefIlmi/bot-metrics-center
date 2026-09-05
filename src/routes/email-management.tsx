import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, Plus, Send, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { recipients, reportPeriods, reportTypes, useCases } from "@/lib/rpa-data";

type Schedule = {
  id: string;
  useCase: string;
  reportType: string;
  frequency: string;
  time: string;
  recipients: string[];
  active: boolean;
};

const initialSchedules: Schedule[] = [
  {
    id: "SCH-01",
    useCase: "Use Case A",
    reportType: "Performance Summary",
    frequency: "Monthly",
    time: "06:00",
    recipients: ["finance.ops@company.com", "management@company.com"],
    active: true,
  },
  {
    id: "SCH-02",
    useCase: "Use Case B",
    reportType: "Daily Operations",
    frequency: "Daily",
    time: "05:45",
    recipients: ["cs.lead@company.com"],
    active: true,
  },
  {
    id: "SCH-03",
    useCase: "Use Case E",
    reportType: "Compliance Report",
    frequency: "Weekly",
    time: "05:30",
    recipients: ["compliance@company.com"],
    active: false,
  },
];

export const Route = createFileRoute("/email-management")({
  head: () => ({
    meta: [
      { title: "Email Management — RPA Automation Reporting" },
      {
        name: "description",
        content:
          "Schedule automated report emails and manage recipients for every automation use case.",
      },
      { property: "og:title", content: "Email Management — RPA Automation Reporting" },
      {
        property: "og:description",
        content: "Automated report email scheduling and recipient management.",
      },
    ],
  }),
  component: EmailManagementPage,
});

function EmailManagementPage() {
  const [schedules, setSchedules] = useState(initialSchedules);
  const [useCase, setUseCase] = useState(useCases[0].name);
  const [reportType, setReportType] = useState(reportTypes[0]);
  const [frequency, setFrequency] = useState("Daily");
  const [time, setTime] = useState("06:00");
  const [selected, setSelected] = useState<string[]>([]);

  const toggleRecipient = (email: string) =>
    setSelected((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email],
    );

  const addSchedule = () => {
    if (selected.length === 0) {
      toast.error("Pick at least one recipient for the schedule.");
      return;
    }
    setSchedules((prev) => [
      ...prev,
      {
        id: `SCH-${String(prev.length + 1).padStart(2, "0")}`,
        useCase,
        reportType,
        frequency,
        time,
        recipients: selected,
        active: true,
      },
    ]);
    setSelected([]);
    toast.success("Schedule created", {
      description: `${reportType} for ${useCase} will be sent ${frequency.toLowerCase()} at ${time}.`,
    });
  };

  return (
    <>
      <DashboardHeader
        title="Email Management"
        subtitle="Automate report delivery to your users"
      />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)]">
          {/* Schedules */}
          <section className="space-y-4">
            <h2 className="text-sm font-bold">Active Schedules ({schedules.length})</h2>
            {schedules.map((s) => (
              <div key={s.id} className="surface-card p-5 hover:shadow-none">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">
                        {s.reportType} — {s.useCase}
                      </p>
                      <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {s.frequency} at {s.time} · {s.recipients.length} recipient(s)
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {s.recipients.map((r) => (
                          <span
                            key={r}
                            className="rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <span
                      className={
                        s.active
                          ? "rounded-full bg-success/12 px-2 py-0.5 text-[11px] font-semibold text-success"
                          : "rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground"
                      }
                    >
                      {s.active ? "Active" : "Paused"}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full text-muted-foreground hover:text-destructive"
                      aria-label={`Delete ${s.id}`}
                      onClick={() => {
                        setSchedules((prev) => prev.filter((x) => x.id !== s.id));
                        toast.success("Schedule removed", { description: s.id });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* New schedule */}
          <aside className="surface-card h-fit space-y-5 p-6 hover:shadow-none">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
                <Plus className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold">New Email Schedule</h2>
                <p className="text-xs text-muted-foreground">
                  Reports are generated and emailed automatically.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Use Case</Label>
              <Select value={useCase} onValueChange={setUseCase}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {useCases.map((u) => (
                    <SelectItem key={u.id} value={u.name}>
                      {u.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Report Type</Label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue />
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
                <Label>Frequency</Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {["Daily", "Weekly", "Monthly"].map((f) => (
                      <SelectItem key={f} value={f}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Send Time</Label>
              <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Recipients</Label>
              <div className="grid gap-2">
                {recipients.map((email) => (
                  <label
                    key={email}
                    className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-border bg-muted/40 px-3 py-2 text-xs transition-colors hover:border-primary/40"
                  >
                    <Checkbox
                      checked={selected.includes(email)}
                      onCheckedChange={() => toggleRecipient(email)}
                    />
                    <span className="truncate">{email}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button className="w-full rounded-full" onClick={addSchedule}>
              <Send className="mr-2 h-4 w-4" />
              Create Schedule
            </Button>
          </aside>
        </div>
      </main>
    </>
  );
}

// reportPeriods imported for future period-based filtering of schedules
void reportPeriods;
