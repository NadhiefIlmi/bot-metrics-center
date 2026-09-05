import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Activity,
  ArrowLeft,
  CheckCircle2,
  ListTodo,
  XCircle,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { DashboardHeader } from "@/components/dashboard-header";
import {
  ErrorTypeBadge,
  IssueStatusBadge,
  StatusBadge,
  TypeBadge,
} from "@/components/rpa-badges";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUseCase } from "@/lib/rpa-data";

export const Route = createFileRoute("/use-cases/$useCaseId")({
  loader: ({ params }) => {
    const useCase = getUseCase(params.useCaseId);
    if (!useCase) throw notFound();
    return { useCase };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.useCase.name ?? "Use Case"} — RPA Automation Reporting` },
      {
        name: "description",
        content: loaderData?.useCase.description ?? "Automation use case detail.",
      },
      {
        property: "og:title",
        content: `${loaderData?.useCase.name ?? "Use Case"} — RPA Automation Reporting`,
      },
      {
        property: "og:description",
        content: loaderData?.useCase.description ?? "Automation use case detail.",
      },
    ],
  }),
  component: UseCaseDetailPage,
});

function UseCaseDetailPage() {
  const { useCase } = Route.useLoaderData();

  const stats = [
    { label: "Total Process", value: useCase.totalProcess.toLocaleString(), icon: ListTodo },
    { label: "Success", value: useCase.totalSuccess.toLocaleString(), icon: CheckCircle2 },
    { label: "Failed", value: useCase.totalFailed.toLocaleString(), icon: XCircle },
    { label: "Success Rate", value: `${useCase.successRate}%`, icon: Activity },
  ];

  return (
    <>
      <DashboardHeader title={useCase.name} subtitle={useCase.description} />
      <main className="flex-1 space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button asChild variant="outline" size="sm" className="rounded-full">
            <Link to="/use-cases">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Use Cases
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <TypeBadge type={useCase.automationType} />
            <StatusBadge status={useCase.status} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="surface-card p-5 hover:shadow-none">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <s.icon className="h-4 w-4 text-primary" />
              </div>
              <p className="mt-2 text-2xl font-bold tracking-tight">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="surface-card p-6 hover:shadow-none">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold">Weekly Performance</h2>
              <p className="text-xs text-muted-foreground">
                Successful vs failed transactions per day
              </p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={useCase.trend} margin={{ top: 4, right: 8, left: -18, bottom: 0 }}>
                <defs>
                  <linearGradient id="ucSuccess" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="ucFailed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="hsl(var(--destructive))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="success"
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                  fill="url(#ucSuccess)"
                  name="Success"
                />
                <Area
                  type="monotone"
                  dataKey="failed"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                  fill="url(#ucFailed)"
                  name="Failed"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="surface-card overflow-hidden hover:shadow-none">
          <div className="border-b border-border px-6 py-4">
            <h2 className="text-sm font-bold">Issues ({useCase.issues.length})</h2>
            <p className="text-xs text-muted-foreground">
              Errors detected by the monitoring engine for this use case
            </p>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="min-w-56">Issue</TableHead>
                  <TableHead>Occurred At</TableHead>
                  <TableHead>Error Type</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {useCase.issues.map((issue) => (
                  <TableRow key={issue.id}>
                    <TableCell>
                      <p className="text-sm font-semibold">{issue.name}</p>
                      <p className="text-xs text-muted-foreground">{issue.description}</p>
                    </TableCell>
                    <TableCell className="text-xs whitespace-nowrap text-muted-foreground">
                      {issue.occurredAt}
                    </TableCell>
                    <TableCell>
                      <ErrorTypeBadge type={issue.errorType} />
                    </TableCell>
                    <TableCell>
                      <IssueStatusBadge status={issue.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </>
  );
}
