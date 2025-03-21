
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { InvoiceDetailTabs } from "@/components/invoice-detail/InvoiceDetailTabs";
import { PdfViewer } from "@/components/invoice-detail/PdfViewer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock invoice data for the detail page
const mockInvoice = {
  id: "doc-1",
  invoiceNumber: "INV-2023-101",
  vendorName: "Sysco Foods",
  vendorAddress: "123 Supplier Street, Foodville, CA 94123",
  vendorPhone: "(555) 123-4567",
  vendorEmail: "accounts@syscofoods.com",
  amount: 1249.99,
  date: "2023-05-12",
  dueDate: "2023-06-11",
  status: "pending" as const,
  items: [
    {
      id: "item-1",
      description: "Chicken Breast, Boneless - 20lb box",
      quantity: 10,
      unitPrice: 45.99,
      total: 459.90
    },
    {
      id: "item-2",
      description: "Rice, Premium Long Grain - 25lb bag",
      quantity: 8,
      unitPrice: 32.50,
      total: 260.00
    },
    {
      id: "item-3",
      description: "Vegetable Oil - 5 gallon",
      quantity: 4,
      unitPrice: 45.99,
      total: 183.96
    },
    {
      id: "item-4",
      description: "Spice Mix, House Blend - 2lb container",
      quantity: 6,
      unitPrice: 18.99,
      total: 113.94
    },
    {
      id: "item-5",
      description: "Delivery Fee",
      quantity: 1,
      unitPrice: 25.00,
      total: 25.00
    }
  ]
};

const InvoiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(mockInvoice);
  
  // Placeholder for actual PDF URL
  const pdfUrl = "https://www.africau.edu/images/default/sample.pdf";
  
  const handleApprove = () => {
    setInvoice({
      ...invoice,
      status: "approved"
    });
    
    toast({
      title: "Invoice Approved",
      description: `Invoice #${invoice.invoiceNumber} has been approved successfully.`
    });
  };
  
  const handleReject = () => {
    setInvoice({
      ...invoice,
      status: "rejected"
    });
    
    toast({
      title: "Invoice Rejected",
      description: `Invoice #${invoice.invoiceNumber} has been rejected.`
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold">Invoice #{invoice.invoiceNumber}</h1>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <InvoiceDetailTabs 
            invoice={invoice} 
            onApprove={handleApprove} 
            onReject={handleReject} 
          />
        </div>
        <div className="h-[calc(100vh-240px)]">
          <PdfViewer url={pdfUrl} />
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetail;
