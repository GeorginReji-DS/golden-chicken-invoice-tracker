
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { PdfViewer } from "@/components/invoice-detail/PdfViewer";
import { HeaderDetailsTab } from "@/components/invoice-detail/HeaderDetailsTab";
import { LineDetailsTab } from "@/components/invoice-detail/LineDetailsTab";
import { DocumentStatusTab } from "@/components/invoice-detail/DocumentStatusTab";

// Mock invoice data for the detail page
const mockInvoice = {
  id: "doc-1",
  invoiceNumber: "126011216158",
  vendorName: "Golden Chicken Farms Co.",
  vendorAddress: "123 Supplier Street, Foodville, CA 94123",
  vendorPhone: "(555) 123-4567",
  vendorEmail: "accounts@goldenchicken.com.sa",
  amount: 1501.22,
  date: "2025-03-08",
  dueDate: "2025-04-08",
  status: "pending" as const,
  sapRoute: "101203",
  mirnahRoute: "126011",
  customerName: "OTHAIM",
  grnNumber: "25179879",
  gcNameInGRN: "Golden Chicken Farms Co.",
  grnValue: 1501.22,
  customerNameInGRN: "Abdallah Al Othaim Markets",
  reason: "",
  creditNote: "",
  comments: "",
  items: [
    {
      id: "item-1",
      slNo: 1,
      outletCode: "214235",
      inGrn: "IN",
      description: "GOLDEN CHICKEN 1000G",
      quantity: 12,
      unitPrice: 15.6,
      total: 187.2
    },
    {
      id: "item-2",
      slNo: 1,
      outletCode: "214235",
      inGrn: "GRN",
      description: "GOLDEN CHICKEN 1000G",
      quantity: 12,
      unitPrice: 15.6,
      total: 187.2
    },
    {
      id: "item-3",
      slNo: 2,
      outletCode: "214245",
      inGrn: "IN",
      description: "GOLDEN CHICKEN 1100G",
      quantity: 12,
      unitPrice: 16.2,
      total: 194.4
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
      status: "approved" as const
    });
    
    toast({
      title: "Invoice Approved",
      description: `Invoice #${invoice.invoiceNumber} has been approved successfully.`
    });
  };
  
  const handleReject = () => {
    setInvoice({
      ...invoice,
      status: "rejected" as const
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
      
      <Tabs defaultValue="header-details" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="header-details">Header Details</TabsTrigger>
          <TabsTrigger value="line-details">Line Details</TabsTrigger>
          <TabsTrigger value="document-status">Document Status</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="pt-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Overview Content</h2>
                <p>Dashboard and overview information would go here.</p>
              </CardContent>
            </Card>
            <div className="h-[calc(100vh-240px)]">
              <PdfViewer url={pdfUrl} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="header-details" className="pt-4">
          <div className="grid md:grid-cols-2 gap-6">
            <HeaderDetailsTab 
              invoice={invoice} 
              onApprove={handleApprove} 
              onReject={handleReject} 
            />
            <div className="h-[calc(100vh-240px)]">
              <PdfViewer url={pdfUrl} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="line-details" className="pt-4">
          <div className="grid md:grid-cols-2 gap-6">
            <LineDetailsTab invoice={invoice} />
            <div className="h-[calc(100vh-240px)]">
              <PdfViewer url={pdfUrl} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="document-status" className="pt-4">
          <DocumentStatusTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvoiceDetail;
