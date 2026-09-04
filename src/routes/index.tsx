import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Layers,
  MailCheck,
  UserCheck,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { DashboardHeader } from "@/components/dashboard-header";
import { StatusBadge, TypeBadge } from "@/components/rpa-badges";
import { Progress } from "@/components/ui/progress";
import {
  automationTypeSplit,
  errorDistribution,
  performanceSeries,
  summary,
  useCases,
} from "@/lib/rpa-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Overview — RPA Automation Reporting Dashboard" },
      {
        name: "description",
        content:
          "Monitor automation use cases, success rate, issues and automated report delivery in one enterprise dashboard.",
      },
      { property: "og:title", content: "Overview — RPA Automation Reporting Dashboard" },
      {
        property: "og:description",
        content: "Live monitoring of RPA use cases, issues and automated email reporting.",
      },
    ],
  }),
  component: Overview,
});

const stats = [
  { label: "Total Use Case", value: summary.totalUseCase, icon: Layers, hint: "+3 this month" },
  { label: "Success Rate", value: `${summary.successRate}%`, icon: CheckCircle2, hint: "+2.4% vs Aug" },
  { label: "Total Issue", value: summary.totalIssue, icon: AlertTriangle, hint: "5 open today" },
  { label: "Unattended Process", value: summary.unattended, icon: Bot, hint: "24/7 scheduled" },
  { label: "Attended Process", value: summary.attended, icon: UserCheck, hint: "agent assisted" },
  { label: "Report Sent", value: summary.reportSent, icon: MailCheck, hint: "auto-delivered" },
];

const chartTooltip = {
  contentStyle: {
    background: "var(--color-card)",
    border: "1px solid var(--color-border)",
    borderRadius: "12px",
    fontSize: "12px",
    color: "var(--color-foreground)",
  },
};

function Overview() {
  return (
    <>
      <DashboardHeader title="Overview" subtitle="Automation monitoring & reporting summary" />
      <main className="flex-1 space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <section>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="surface-card stat-glow p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-medium tracking-wide text-muted-foreground uppercase">
                      {s.label}
                    </p>
                    <p className="mt-3 text-3xl font-bold tracking-tight">{s.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{s.hint}</p>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                    <s.icon className="h-5 w-5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="surface-card p-5 lg:col-span-2">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold">Automation Performance</h2>
                <p className="text-xs text-muted-foreground">Success vs failed process per month</p>
              </div>
              <p className="text-xs text-muted-foreground">
                Success rate <span className="font-semibold text-primary">85%</span>
              </p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceSeries}>
                  <defs>
                    <linearGradient id="sGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} stroke="var(--color-border)" />
                  <YAxis tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} stroke="var(--color-border)" />
                  <Tooltip {...chartTooltip} />
                  <Area
                    type="monotone"
                    dataKey="success"
                    stroke="var(--color-primary)"
                    strokeWidth={2}
                    fill="url(#sGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="failed"
                    stroke="var(--color-muted-foreground)"
                    strokeWidth={2}
                    fillOpacity={0}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="surface-card p-5">
            <h2 className="text-sm font-semibold">Error Distribution</h2>
            <p className="text-xs text-muted-foreground">Error A vs Error B</p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={errorDistribution}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={52}
                    outerRadius={76}
                    paddingAngle={3}
                    stroke="none"
                  >
                    <Cell fill="var(--color-destructive)" />
                    <Cell fill="var(--color-warning)" />
                  </Pie>
                  <Tooltip {...chartTooltip} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {errorDistribution.map((e, i) => (
                <div key={e.name} className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span
                      className={
                        i === 0 ? "h-2 w-2 rounded-full bg-destructive" : "h-2 w-2 rounded-full bg-warning"
                      }
                    />
                    {e.name}
                  </span>
                  <span className="font-semibold">{e.value} issues</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="surface-card p-5">
            <h2 className="text-sm font-semibold">Automation Type</h2>
            <p className="text-xs text-muted-foreground">Attended vs unattended use cases</p>
            <div className="mt-4 h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={automationTypeSplit} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} stroke="var(--color-border)" />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={86}
                    tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                    stroke="var(--color-border)"
                  />
                  <Tooltip {...chartTooltip} />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={22}>
                    <Cell fill="var(--color-primary)" />
                    <Cell fill="var(--color-chart-2)" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="surface-card p-5 lg:col-span-2">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-semibold">Top Use Cases</h2>
                <p className="text-xs text-muted-foreground">Success rate per automation</p>
              </div>
              <Link
                to="/use-cases"
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
              >
                View all <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="space-y-4">
              {useCases.slice(0, 4).map((u) => (
                <Link
                  key={u.id}
                  to="/use-cases/$useCaseId"
                  params={{ useCaseId: u.id }}
                  className="block rounded-xl p-3 transition-colors hover:bg-muted/60"
                >
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{u.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{u.owner}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <TypeBadge type={u.automationType} />
                      <StatusBadge status={u.status} />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <Progress value={u.successRate} className="h-1.5" />
                    <span className="w-10 shrink-0 text-right text-xs font-semibold">
                      {u.successRate}%
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
