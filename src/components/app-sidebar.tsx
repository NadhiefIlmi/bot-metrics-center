import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Boxes,
  FileBarChart,
  History,
  Mail,
  MailCheck,
  Settings2,
  Users,
  ServerCog,
} from "lucide-react";

import logo from "@/assets/rpa-logo.png.asset.json";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const groups = [
  {
    label: "Dashboard",
    items: [{ title: "Overview", url: "/", icon: LayoutDashboard }],
  },
  {
    label: "Report Management",
    items: [
      { title: "Use Cases", url: "/use-cases", icon: Boxes },
      { title: "Generate Report", url: "/generate-report", icon: FileBarChart },
      { title: "Report History", url: "/report-history", icon: History },
    ],
  },
  {
    label: "Email",
    items: [
      { title: "Email Management", url: "/email-management", icon: Mail },
      { title: "Email History", url: "/email-history", icon: MailCheck },
    ],
  },
  {
    label: "Settings",
    items: [
      { title: "General Settings", url: "/settings/general", icon: Settings2 },
      { title: "User Management", url: "/settings/users", icon: Users },
      { title: "Email Configuration", url: "/settings/email", icon: ServerCog },
    ],
  },
] as const;

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  const isActive = (url: string) =>
    url === "/" ? pathname === "/" : pathname.startsWith(url);

  return (
    <Sidebar collapsible="icon" className="border-sidebar-border">
      <SidebarHeader className="px-3 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={logo.url}
            alt="RPA logo"
            className="h-9 w-9 shrink-0 rounded-lg object-cover"
          />
          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-sm font-bold tracking-[0.18em] text-sidebar-foreground">
                RPA
              </p>
              <p className="truncate text-[11px] text-sidebar-foreground/60">
                Automation Reporting
              </p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-1">
        {groups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-[10px] font-semibold tracking-[0.2em] text-sidebar-foreground/45 uppercase">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                      tooltip={item.title}
                      className="data-[active=true]:bg-sidebar-primary/15 data-[active=true]:text-sidebar-primary-foreground data-[active=true]:font-semibold"
                    >
                      <Link to={item.url} className="flex items-center gap-3">
                        <item.icon
                          className={
                            isActive(item.url)
                              ? "h-4 w-4 shrink-0 text-sidebar-primary"
                              : "h-4 w-4 shrink-0"
                          }
                        />
                        <span className="truncate">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="px-3 pb-4">
        {!collapsed && (
          <p className="text-[11px] leading-relaxed text-sidebar-foreground/45">
            Enterprise Automation Monitoring & Reporting Platform
          </p>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
