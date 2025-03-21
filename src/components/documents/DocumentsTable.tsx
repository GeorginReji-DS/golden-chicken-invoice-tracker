
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
import { 
  ChevronLeft, 
  ChevronRight, 
  Eye,
  RefreshCw,
  Trash
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

interface Document {
  id: string;
  invoiceNumber: string;
  vendorName: string;
  date: string;
  status: string;
  sapInvoiceNo: string;
  custId: string;
  sapRoute: string;
  salesMan: string;
  region: string;
  reconStatus: string;
  reason: string;
}

interface DocumentsTableProps {
  documents: Document[];
  selectedDocuments: string[];
  onSelectDocument: (id: string, isSelected: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function DocumentsTable({
  documents,
  selectedDocuments,
  onSelectDocument,
  onSelectAll,
  currentPage,
  totalPages,
  onPageChange,
}: DocumentsTableProps) {
  const handleDeleteDocument = (id: string) => {
    // In a real app, this would call an API
    toast({
      title: "Document Deleted",
      description: `Document ${id} has been deleted.`,
    });
  };

  const handleReprocessDocument = (id: string) => {
    // In a real app, this would call an API
    toast({
      title: "Document Reprocessed",
      description: `Document ${id} has been sent for reprocessing.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10">
                <Checkbox 
                  checked={documents.length > 0 && selectedDocuments.length === documents.length}
                  onCheckedChange={onSelectAll}
                />
              </TableHead>
              <TableHead>Inv No</TableHead>
              <TableHead>Inv Date</TableHead>
              <TableHead>Inv Type</TableHead>
              <TableHead>SAP Inv No</TableHead>
              <TableHead>Cust ID</TableHead>
              <TableHead>Payer</TableHead>
              <TableHead>Sales Man</TableHead>
              <TableHead>Region</TableHead>
              <TableHead>SAP Route</TableHead>
              <TableHead>Recon</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>
                  <Checkbox 
                    checked={selectedDocuments.includes(doc.id)}
                    onCheckedChange={(checked) => onSelectDocument(doc.id, !!checked)}
                  />
                </TableCell>
                <TableCell className="font-medium">{doc.invoiceNumber}</TableCell>
                <TableCell>{doc.date}</TableCell>
                <TableCell>{doc.status}</TableCell>
                <TableCell>{doc.sapInvoiceNo}</TableCell>
                <TableCell>{doc.custId}</TableCell>
                <TableCell>{doc.vendorName}</TableCell>
                <TableCell>{doc.salesMan}</TableCell>
                <TableCell>{doc.region}</TableCell>
                <TableCell>{doc.sapRoute}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="border-red-500 text-red-500"
                  >
                    {doc.reconStatus}
                  </Badge>
                </TableCell>
                <TableCell>{doc.reason}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm" title="View">
                      <Link to={`/documents/${doc.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleReprocessDocument(doc.id)}
                      title="Reprocess"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDeleteDocument(doc.id)}
                      title="Delete"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-between items-center mt-4 px-4">
        <div className="text-sm text-muted-foreground">
          Showing {documents.length} of {documents.length} records
        </div>
        
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
            </PaginationItem>
            
            <PaginationItem>
              <PaginationLink 
                size="sm"
                isActive={true}
                className="bg-brand/10"
              >
                {currentPage}
              </PaginationLink>
            </PaginationItem>
            
            <PaginationItem>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
