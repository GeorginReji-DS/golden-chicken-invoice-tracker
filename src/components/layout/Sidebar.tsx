
import { cn } from "@/lib/utils";
import { Home, FileText, BarChart3, Users, Settings, CreditCard } from "lucide-react";
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
    { icon: CreditCard, label: "Payments", href: "/payments" },
    { icon: Users, label: "Users", href: "/users" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <aside className={cn("border-r bg-white w-16 min-h-screen flex-shrink-0", className)}>
      <div className="flex flex-col gap-6 p-4">
        <div className="flex justify-center">
          <div className="h-8 w-8 bg-brand rounded-md flex items-center justify-center">
            <span className="text-white font-bold">GC</span>
          </div>
        </div>
        
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 p-2 rounded-md text-xs transition-colors",
                  isActive
                    ? "bg-brand/10 text-brand font-medium"
                    : "text-muted-foreground hover:bg-muted"
                )}
                title={item.label}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-brand" : "")} />
                <span className="text-[10px]">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
