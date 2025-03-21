
import { Bell, Settings, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Observer to detect sidebar width changes
  useEffect(() => {
    const sidebar = document.querySelector('aside');
    if (!sidebar) return;

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        if (entry.target === sidebar) {
          setSidebarCollapsed(entry.contentRect.width < 40);
        }
      }
    });

    observer.observe(sidebar);
    return () => observer.disconnect();
  }, []);

  return (
    <header className={cn("border-b bg-white px-6 py-3", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center mr-4">
            <img 
              src="https://goldenchickenfarms.fisa.cloud/css/images/gcf.png" 
              alt="Golden Chicken Logo" 
              className="h-10" 
            />
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <Button 
              variant="default" 
              className="bg-brand hover:bg-brand/90"
              onClick={() => navigate('/')}
            >
              Overview
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <Input
              placeholder="Global Search by Invoice Number..."
              className="w-[300px] pl-8"
            />
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="hidden md:block text-right">
              <div className="text-sm font-medium">AR Automation</div>
              <div className="text-xs text-muted-foreground">arauto@goldenchicken.com.sa</div>
            </div>
            <Avatar className="h-9 w-9 rounded-full border-2 border-brand/10">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-brand text-white">GC</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
