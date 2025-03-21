
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check } from "lucide-react";

interface LineItem {
  id: string;
  slNo: number;
  outletCode: string;
  inGrn: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface InvoiceDetail {
  items: LineItem[];
  reason: string;
  creditNote: string;
  comments: string;
}

interface LineDetailsTabProps {
  invoice: InvoiceDetail;
}

export function LineDetailsTab({ invoice }: LineDetailsTabProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">SL No</TableHead>
                  <TableHead>Outlet Code</TableHead>
                  <TableHead>IN/GRN</TableHead>
                  <TableHead>GC Description</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.slNo}</TableCell>
                    <TableCell>{item.outletCode}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.inGrn === "GRN" 
                          ? "bg-amber-100 text-amber-800" 
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {item.inGrn}
                      </span>
                    </TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">{item.unitPrice.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="space-y-4 pt-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="reason" className="text-sm font-medium">Reason</label>
              <Select defaultValue={invoice.reason || ""}>
                <SelectTrigger id="reason" className="w-full">
                  <SelectValue placeholder="Select reason..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mismatch">Price Mismatch</SelectItem>
                  <SelectItem value="quantity">Quantity Issue</SelectItem>
                  <SelectItem value="damaged">Damaged Products</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="creditNote" className="text-sm font-medium">Credit Note</label>
              <Textarea id="creditNote" placeholder="Credit note information..." className="resize-none" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="comments" className="text-sm font-medium">Comments</label>
              <Textarea id="comments" placeholder="Write here..." className="resize-none" />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button className="bg-brand hover:bg-brand/90">
                <Check className="mr-2 h-4 w-4" />
                Reconcile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
