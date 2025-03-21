
import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <header className={cn("border-b bg-background px-6 py-3", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="font-bold text-xl text-brand">Golden Chicken</div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Avatar className="h-9 w-9">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback className="bg-brand text-white">GC</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
