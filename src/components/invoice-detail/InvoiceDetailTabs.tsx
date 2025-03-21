
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Download, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Invoice {
  id: string;
  invoiceNumber: string;
  vendorName: string;
  vendorAddress: string;
  vendorPhone: string;
  vendorEmail: string;
  amount: number;
  date: string;
  dueDate: string;
  status: "approved" | "pending" | "rejected";
  items: {
    id: string;
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
}

interface InvoiceDetailTabsProps {
  invoice: Invoice;
  onApprove: () => void;
  onReject: () => void;
}

export function InvoiceDetailTabs({ invoice, onApprove, onReject }: InvoiceDetailTabsProps) {
  return (
    <Tabs defaultValue="details" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="details">Invoice Details</TabsTrigger>
        <TabsTrigger value="line-items">Line Items</TabsTrigger>
      </TabsList>
      
      <TabsContent value="details" className="space-y-4 pt-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">Invoice #{invoice.invoiceNumber}</CardTitle>
                <CardDescription>Created on {invoice.date}</CardDescription>
              </div>
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
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-muted-foreground">Vendor Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Name</p>
                  <p className="text-sm">{invoice.vendorName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm">{invoice.vendorEmail}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm">{invoice.vendorPhone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm">{invoice.vendorAddress}</p>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-muted-foreground">Invoice Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Invoice Date</p>
                  <p className="text-sm">{invoice.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Due Date</p>
                  <p className="text-sm">{invoice.dueDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Total Amount</p>
                  <p className="text-sm font-semibold">${invoice.amount.toFixed(2)}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              
              <div className="space-x-2">
                {invoice.status === "pending" && (
                  <>
                    <Button variant="outline" onClick={onReject}>
                      <X className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                    <Button onClick={onApprove}>
                      <Check className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="line-items" className="space-y-4 pt-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Line Items</CardTitle>
            <CardDescription>Details of items included in this invoice</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Unit Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoice.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.description}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">${item.unitPrice.toFixed(2)}</TableCell>
                      <TableCell className="text-right">${item.total.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} className="text-right font-medium">
                      Total
                    </TableCell>
                    <TableCell className="text-right font-bold">
                      ${invoice.amount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

// Import the Table components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
