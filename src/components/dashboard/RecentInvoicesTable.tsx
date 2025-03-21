
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

interface Invoice {
  id: string;
  vendorName: string;
  amount: number;
  date: string;
  status: "approved" | "pending" | "rejected";
}

interface RecentInvoicesTableProps {
  invoices: Invoice[];
}

export function RecentInvoicesTable({ invoices }: RecentInvoicesTableProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.vendorName}</TableCell>
                <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      invoice.status === "approved"
                        ? "border-green-500 text-green-500"
                        : invoice.status === "rejected"
                        ? "border-red-500 text-red-500"
                        : "border-yellow-500 text-yellow-500"
                    }
                  >
                    {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="outline" size="icon">
                    <Link to={`/documents/${invoice.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
