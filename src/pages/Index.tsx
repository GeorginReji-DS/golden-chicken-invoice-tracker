
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentInvoicesTable } from "@/components/dashboard/RecentInvoicesTable";
import { InvoicesByStatusChart } from "@/components/dashboard/InvoicesByStatusChart";
import { Button } from "@/components/ui/button";
import { FileText, DollarSign, Clock, CheckCircle, AlertCircle, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const chartData = [
  { name: "Approved", value: 42, color: "#4ade80" },
  { name: "Pending", value: 23, color: "#f59e0b" },
  { name: "Rejected", value: 8, color: "#ef4444" }
];

const recentInvoices = [
  {
    id: "INV-2023-001",
    vendorName: "Sysco Foods",
    amount: 1249.99,
    date: "2023-05-12",
    status: "approved" as const
  },
  {
    id: "INV-2023-002",
    vendorName: "Fresh Farms Produce",
    amount: 758.45,
    date: "2023-05-14",
    status: "pending" as const
  },
  {
    id: "INV-2023-003",
    vendorName: "Metro Packaging",
    amount: 356.20,
    date: "2023-05-15",
    status: "approved" as const
  },
  {
    id: "INV-2023-004",
    vendorName: "Cleaning Supplies Co.",
    amount: 215.75,
    date: "2023-05-17",
    status: "rejected" as const
  },
  {
    id: "INV-2023-005",
    vendorName: "Office Depot",
    amount: 129.99,
    date: "2023-05-18",
    status: "pending" as const
  }
];

const Index = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Button asChild>
          <Link to="/documents">View All Documents</Link>
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Invoices"
          value="73"
          description="Current month"
          icon={FileText}
          trend="up"
          trendValue="+12%"
        />
        <StatCard
          title="Total Amount"
          value="$15,249.50"
          description="Current month"
          icon={DollarSign}
          trend="up"
          trendValue="+8%"
        />
        <StatCard
          title="Pending Approval"
          value="23"
          description="Need attention"
          icon={Clock}
          trend="down"
          trendValue="-3%"
        />
        <StatCard
          title="Overdue"
          value="7"
          description="Need immediate attention"
          icon={AlertCircle}
          trend="up"
          trendValue="+2%"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <InvoicesByStatusChart data={chartData} />
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recent Invoices</h2>
            <Button variant="outline" size="sm" asChild>
              <Link to="/documents">
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <RecentInvoicesTable invoices={recentInvoices} />
        </div>
      </div>
    </div>
  );
};

export default Index;
