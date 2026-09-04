import type {
  AutomationType,
  EmailStatus,
  ErrorType,
  IssueStatus,
  UseCaseStatus,
} from "@/lib/rpa-data";
import { cn } from "@/lib/utils";

const base =
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold whitespace-nowrap";

export function TypeBadge({ type }: { type: AutomationType }) {
  return (
    <span
      className={cn(
        base,
        type === "Unattended"
          ? "border-primary/35 bg-primary/12 text-primary"
          : "border-border bg-muted text-muted-foreground",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          type === "Unattended" ? "bg-primary" : "bg-muted-foreground",
        )}
      />
      {type}
    </span>
  );
}

export function StatusBadge({ status }: { status: UseCaseStatus }) {
  const map: Record<UseCaseStatus, string> = {
    Running: "border-success/35 bg-success/12 text-success",
    Warning: "border-warning/40 bg-warning/15 text-warning",
    Stopped: "border-destructive/40 bg-destructive/12 text-destructive",
  };
  return <span className={cn(base, map[status])}>{status}</span>;
}

export function ErrorTypeBadge({ type }: { type: ErrorType }) {
  return (
    <span
      className={cn(
        base,
        type === "Error A"
          ? "border-destructive/40 bg-destructive/12 text-destructive"
          : "border-warning/40 bg-warning/15 text-warning",
      )}
    >
      {type}
    </span>
  );
}

export function IssueStatusBadge({ status }: { status: IssueStatus }) {
  const map: Record<IssueStatus, string> = {
    Open: "border-destructive/35 bg-destructive/10 text-destructive",
    "In Progress": "border-warning/40 bg-warning/12 text-warning",
    Resolved: "border-success/35 bg-success/12 text-success",
  };
  return <span className={cn(base, map[status])}>{status}</span>;
}

export function EmailStatusBadge({ status }: { status: EmailStatus }) {
  const map: Record<EmailStatus, string> = {
    Sent: "border-success/35 bg-success/12 text-success",
    Pending: "border-warning/40 bg-warning/15 text-warning",
    Failed: "border-destructive/40 bg-destructive/12 text-destructive",
  };
  return <span className={cn(base, map[status])}>{status}</span>;
}

export function ReportStatusBadge({ status }: { status: "Ready" | "Generating" | "Failed" }) {
  const map = {
    Ready: "border-success/35 bg-success/12 text-success",
    Generating: "border-warning/40 bg-warning/15 text-warning",
    Failed: "border-destructive/40 bg-destructive/12 text-destructive",
  };
  return <span className={cn(base, map[status])}>{status}</span>;
}
