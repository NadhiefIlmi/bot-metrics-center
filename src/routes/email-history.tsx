import { createFileRoute } from "@tanstack/react-router";
import { RotateCw, Search } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { DashboardHeader } from "@/components/dashboard-header";
import { EmailStatusBadge } from "@/components/rpa-badges";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { emailHistory } from "@/lib/rpa-data";

export const Route = createFileRoute("/email-history")({
  head: () => ({
    meta: [
      { title: "Email History — RPA Automation Reporting" },
      {
        name: "description",
        content: "Delivery log of every automated report email sent by the platform.",
      },
      { property: "og:title", content: "Email History — RPA Automation Reporting" },
      {
        property: "og:description",
        content: "Track sent, pending and failed report emails across all use cases.",
      },
    ],
  }),
  component: EmailHistoryPage,
});

function EmailHistoryPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const rows = emailHistory.filter((e) => {
    const matchQuery = (e.recipient + e.subject + e.useCase)
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchStatus = filter === "all" || e.status.toLowerCase() === filter;
    return matchQuery && matchStatus;
  });

  return (
    <>
      <DashboardHeader title="Email History" subtitle="Report email delivery log" />
      <main className="flex-1 space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:justify-between">
          <div className="relative min-w-0">
            <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search email..."
              className="w-full rounded-full pl-9 sm:w-72"
            />
          </div>
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList className="rounded-full">
              <TabsTrigger value="all" className="rounded-full text-xs">
                All
              </TabsTrigger>
              <TabsTrigger value="sent" className="rounded-full text-xs">
                Sent
              </TabsTrigger>
              <TabsTrigger value="pending" className="rounded-full text-xs">
                Pending
              </TabsTrigger>
              <TabsTrigger value="failed" className="rounded-full text-xs">
                Failed
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="surface-card overflow-hidden hover:shadow-none">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Email ID</TableHead>
                  <TableHead>Use Case</TableHead>
                  <TableHead className="min-w-48">Recipient</TableHead>
                  <TableHead className="min-w-56">Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="text-sm font-semibold">{e.id}</TableCell>
                    <TableCell className="text-sm">{e.useCase}</TableCell>
                    <TableCell className="text-sm">{e.recipient}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{e.subject}</TableCell>
                    <TableCell className="text-xs whitespace-nowrap text-muted-foreground">
                      {e.date}
                    </TableCell>
                    <TableCell>
                      <EmailStatusBadge status={e.status} />
                    </TableCell>
                    <TableCell>
                      {e.status === "Failed" && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                          aria-label={`Resend ${e.id}`}
                          onClick={() =>
                            toast.success("Email queued for resend", {
                              description: `${e.id} will be delivered to ${e.recipient}.`,
                            })
                          }
                        >
                          <RotateCw className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="py-10 text-center text-sm text-muted-foreground">
                      No email matches your filters.
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
