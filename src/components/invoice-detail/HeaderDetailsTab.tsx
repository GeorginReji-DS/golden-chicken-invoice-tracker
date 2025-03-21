
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Check, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InvoiceDetail {
  id: string;
  invoiceNumber: string;
  date: string;
  sapRoute: string;
  mirnahRoute: string;
  customerName: string;
  grnNumber: string;
  gcNameInGRN: string;
  grnValue: number;
  customerNameInGRN: string;
  reason: string;
  creditNote: string;
  comments: string;
  status: "approved" | "pending" | "rejected";
}

interface HeaderDetailsTabProps {
  invoice: InvoiceDetail;
  onApprove: () => void;
  onReject: () => void;
}

export function HeaderDetailsTab({ invoice, onApprove, onReject }: HeaderDetailsTabProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-6 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Invoice Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Invoice Number</p>
                <p className="text-sm font-semibold">{invoice.invoiceNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Invoice Date</p>
                <p className="text-sm">{invoice.date}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">SAP Route/Mirnah Route</p>
                <p className="text-sm">{invoice.sapRoute}/{invoice.mirnahRoute}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Customer Name (Payer)</p>
                <p className="text-sm">{invoice.customerName}</p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h2 className="text-lg font-semibold mb-4">GRN Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">GRN/RTV Number</p>
                <p className="text-sm">{invoice.grnNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">GC Name in GRN</p>
                <p className="text-sm">{invoice.gcNameInGRN}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">GRN Value</p>
                <p className="text-sm">{invoice.grnValue.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Customer Name (Payer)</p>
                <p className="text-sm">{invoice.customerNameInGRN}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Invoice Date</p>
                <p className="text-sm">{invoice.date}</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 pt-4">
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
              {invoice.status === "pending" && (
                <>
                  <Button variant="outline" onClick={onReject}>
                    <X className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button className="bg-brand hover:bg-brand/90" onClick={onApprove}>
                    <Check className="mr-2 h-4 w-4" />
                    Reconcile
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
