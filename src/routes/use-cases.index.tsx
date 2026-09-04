import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Search } from "lucide-react";
import { useState } from "react";

import { DashboardHeader } from "@/components/dashboard-header";
import { StatusBadge, TypeBadge } from "@/components/rpa-badges";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCases } from "@/lib/rpa-data";

export const Route = createFileRoute("/use-cases/")({
  head: () => ({
    meta: [
      { title: "Use Cases — RPA Automation Reporting" },
      {
        name: "description",
        content:
          "Browse every automation use case with success rate, status, issue count and automation type.",
      },
      { property: "og:title", content: "Use Cases — RPA Automation Reporting" },
      {
        property: "og:description",
        content: "All RPA use cases with success rate, status and issues in one modern table.",
      },
    ],
  }),
  component: UseCasesPage,
});

function UseCasesPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const rows = useCases.filter((u) => {
    const matchQuery = (u.name + u.owner).toLowerCase().includes(query.toLowerCase());
    const matchType =
      filter === "all" ||
      (filter === "attended" && u.automationType === "Attended") ||
      (filter === "unattended" && u.automationType === "Unattended");
    return matchQuery && matchType;
  });

  return (
    <>
      <DashboardHeader title="Use Cases" subtitle="All monitored automation processes" />
      <main className="flex-1 space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
          <div className="relative min-w-0">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search use case..."
              className="w-full rounded-full pl-9 sm:w-72"
            />
          </div>
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList className="rounded-full">
              <TabsTrigger value="all" className="rounded-full text-xs">
                All
              </TabsTrigger>
              <TabsTrigger value="unattended" className="rounded-full text-xs">
                Unattended
              </TabsTrigger>
              <TabsTrigger value="attended" className="rounded-full text-xs">
                Attended
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="surface-card overflow-hidden hover:shadow-none">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="min-w-48">Use Case</TableHead>
                  <TableHead className="min-w-40">Success Rate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead>Type Automation</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((u) => (
                  <TableRow key={u.id} className="cursor-pointer">
                    <TableCell>
                      <Link
                        to="/use-cases/$useCaseId"
                        params={{ useCaseId: u.id }}
                        className="block min-w-0"
                      >
                        <p className="truncate text-sm font-semibold">{u.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{u.owner}</p>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={u.successRate} className="h-1.5 w-24" />
                        <span className="text-xs font-semibold">{u.successRate}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={u.status} />
                    </TableCell>
                    <TableCell className="text-sm font-semibold">{u.issues.length}</TableCell>
                    <TableCell>
                      <TypeBadge type={u.automationType} />
                    </TableCell>
                    <TableCell>
                      <Link to="/use-cases/$useCaseId" params={{ useCaseId: u.id }}>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="py-10 text-center text-sm text-muted-foreground">
                      No use case matches your search.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </>
  );
}
