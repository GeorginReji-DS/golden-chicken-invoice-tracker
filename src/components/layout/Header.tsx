
import { Bell, Settings, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className={cn("border-b bg-white px-6 py-3", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="font-bold text-xl text-brand flex items-center gap-2">
            <div className="flex items-center">
              <img src="/lovable-uploads/e50f4fb3-afbc-4a1b-b508-8190c49c2cb9.png" alt="Golden Chicken Logo" className="h-10" />
            </div>
            <span className="hidden md:inline">Golden Chicken Farms Co.</span>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <Button 
              variant="default" 
              className="bg-brand hover:bg-brand/90"
              onClick={() => navigate('/')}
            >
              Overview
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate('/documents')}
            >
              Document Status
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
