
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Home, FileText, Users, Settings, ChevronRight, ChevronLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  
  const menuItems = [
    { icon: Home, label: "Overview", href: "/" },
    { icon: FileText, label: "Documents", href: "/documents" },
    { icon: Users, label: "Users", href: "/users" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <aside 
      className={cn(
        "bg-white min-h-screen flex-shrink-0 transition-all duration-300 border-r relative",
        expanded ? "w-64" : "w-16",
        className
      )}
    >
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute -right-3 top-16 bg-white border shadow-sm z-10 h-6 w-6"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? <ChevronLeft className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
      </Button>
      
      <div className="flex flex-col gap-6 p-4">
        {expanded ? (
          <div className="flex items-center justify-center">
            <img 
              src="https://goldenchickenfarms.fisa.cloud/css/images/gcf.png" 
              alt="Golden Chicken Farms" 
              className="h-12 object-contain"
            />
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="h-8 w-8 bg-brand rounded-md flex items-center justify-center">
              <span className="text-white font-bold">GC</span>
            </div>
          </div>
        )}
        
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 p-2 rounded-md transition-colors",
                  expanded ? "px-3" : "justify-center",
                  isActive
                    ? "bg-brand/10 text-brand font-medium"
                    : "text-muted-foreground hover:bg-muted"
                )}
                title={item.label}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-brand" : "")} />
                {expanded && <span className="text-sm">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
