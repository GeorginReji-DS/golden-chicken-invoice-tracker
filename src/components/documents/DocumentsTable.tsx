
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
  ChevronsLeft, 
  ChevronsRight, 
  Download,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Document {
  id: string;
  invoiceNumber: string;
  vendorName: string;
  amount: number;
  date: string;
  dueDate: string;
  status: "approved" | "pending" | "rejected";
}

interface DocumentsTableProps {
  documents: Document[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function DocumentsTable({
  documents,
  currentPage,
  totalPages,
  onPageChange,
}: DocumentsTableProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">{doc.invoiceNumber}</TableCell>
                <TableCell>{doc.vendorName}</TableCell>
                <TableCell>${doc.amount.toFixed(2)}</TableCell>
                <TableCell>{doc.date}</TableCell>
                <TableCell>{doc.dueDate}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      doc.status === "approved"
                        ? "border-green-500 text-green-500"
                        : doc.status === "rejected"
                        ? "border-red-500 text-red-500"
                        : "border-yellow-500 text-yellow-500"
                    }
                  >
                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button asChild variant="outline" size="icon">
                      <Link to={`/documents/${doc.id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </PaginationItem>
          
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNumber = currentPage <= 3 
              ? i + 1 
              : currentPage >= totalPages - 2
                ? totalPages - 4 + i
                : currentPage - 2 + i;
                
            if (pageNumber > 0 && pageNumber <= totalPages) {
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    isActive={currentPage === pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            }
            return null;
          })}
          
          <PaginationItem>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
