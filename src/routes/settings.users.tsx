import { createFileRoute } from "@tanstack/react-router";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { DashboardHeader } from "@/components/dashboard-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Member = {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Operator" | "Viewer";
  status: "Active" | "Invited";
};

const initialMembers: Member[] = [
  { id: "u-1", name: "Admin RPA", email: "admin@company.com", role: "Admin", status: "Active" },
  { id: "u-2", name: "Dewi Lestari", email: "dewi.lestari@company.com", role: "Operator", status: "Active" },
  { id: "u-3", name: "Rizky Pratama", email: "rizky.p@company.com", role: "Viewer", status: "Active" },
  { id: "u-4", name: "Sinta Maharani", email: "sinta.m@company.com", role: "Operator", status: "Invited" },
];

export const Route = createFileRoute("/settings/users")({
  head: () => ({
    meta: [
      { title: "User Management — RPA Automation Reporting" },
      { name: "description", content: "Manage dashboard users, roles and access." },
      { property: "og:title", content: "User Management — RPA Automation Reporting" },
      { property: "og:description", content: "Manage dashboard users, roles and access." },
    ],
  }),
  component: UserManagementPage,
});

function UserManagementPage() {
  const [members, setMembers] = useState(initialMembers);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Member["role"]>("Viewer");

  const invite = () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Enter a valid email address.");
      return;
    }
    setMembers((prev) => [
      ...prev,
      {
        id: `u-${prev.length + 1}`,
        name: email.split("@")[0],
        email,
        role,
        status: "Invited",
      },
    ]);
    setEmail("");
    toast.success("Invitation sent", { description: `${email} was invited as ${role}.` });
  };

  return (
    <>
      <DashboardHeader title="User Management" subtitle="Control who can access the dashboard" />
      <main className="flex-1 space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="surface-card p-6 hover:shadow-none">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold">Invite User</h2>
              <p className="text-xs text-muted-foreground">
                New users receive an email invitation to join the workspace.
              </p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_160px_auto]">
            <Input
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Select value={role} onValueChange={(v) => setRole(v as Member["role"])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Operator">Operator</SelectItem>
                <SelectItem value="Viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
            <Button className="rounded-full" onClick={invite}>
              Send Invite
            </Button>
          </div>
        </section>

        <section className="surface-card overflow-hidden hover:shadow-none">
          <div className="border-b border-border px-6 py-4">
            <h2 className="text-sm font-bold">Members ({members.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="min-w-56">User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {members.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/15 text-xs font-bold text-primary">
                            {m.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">{m.name}</p>
                          <p className="truncate text-xs text-muted-foreground">{m.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={m.role}
                        onValueChange={(v) =>
                          setMembers((prev) =>
                            prev.map((x) =>
                              x.id === m.id ? { ...x, role: v as Member["role"] } : x,
                            ),
                          )
                        }
                      >
                        <SelectTrigger className="h-8 w-32 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Operator">Operator</SelectItem>
                          <SelectItem value="Viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          m.status === "Active"
                            ? "rounded-full bg-success/12 px-2.5 py-0.5 text-[11px] font-semibold text-success"
                            : "rounded-full bg-warning/15 px-2.5 py-0.5 text-[11px] font-semibold text-warning"
                        }
                      >
                        {m.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </main>
    </>
  );
}
