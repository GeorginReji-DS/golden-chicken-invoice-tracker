
import { cn } from "@/lib/utils";
import { Home, FileText, BarChart3, Users, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  
  const menuItems = [
    { icon: Home, label: "Overview", href: "/" },
    { icon: FileText, label: "Documents", href: "/documents" },
    { icon: BarChart3, label: "Reports", href: "/reports" },
    { icon: Users, label: "Users", href: "/users" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <aside className={cn("border-r bg-background w-64 min-h-screen", className)}>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-brand rounded-md flex items-center justify-center">
            <span className="text-white font-bold">GC</span>
          </div>
          <span className="font-semibold text-lg">Invoice System</span>
        </div>
        
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  isActive
                    ? "bg-brand/10 text-brand font-medium"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-brand" : "")} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
