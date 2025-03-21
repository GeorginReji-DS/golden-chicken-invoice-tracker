
import { useState } from "react";
import { DocumentsFilters } from "@/components/documents/DocumentsFilters";
import { DocumentsTable } from "@/components/documents/DocumentsTable";

// Mock data for our documents
const mockDocuments = Array.from({ length: 25 }, (_, i) => ({
  id: `doc-${i + 1}`,
  invoiceNumber: `INV-2023-${(i + 101).toString().padStart(3, '0')}`,
  vendorName: [
    "Sysco Foods", 
    "Fresh Farms Produce", 
    "Metro Packaging", 
    "Cleaning Supplies Co.", 
    "Office Depot"
  ][Math.floor(Math.random() * 5)],
  amount: Number((Math.random() * 2000 + 100).toFixed(2)),
  date: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
  dueDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
  status: ["approved", "pending", "rejected"][Math.floor(Math.random() * 3)] as "approved" | "pending" | "rejected",
  city: ["Riyadh", "Jeddah", "Dammam", "Medina", "Khobar"][Math.floor(Math.random() * 5)],
  region: ["Central", "Western", "Eastern", "Northern", "Southern"][Math.floor(Math.random() * 5)],
  sapRoute: `SAP-${Math.floor(Math.random() * 9000) + 1000}`,
  mirnahRoute: `MIR-${Math.floor(Math.random() * 9000) + 1000}`,
  reason: ["Damaged Goods", "Quantity Mismatch", "Price Discrepancy", "Late Delivery", "Quality Issues"][Math.floor(Math.random() * 5)],
  reconStatus: ["Not Reconciled", "Stamp", "GRN", "Manual"][Math.floor(Math.random() * 4)]
}));

const Documents = () => {
  const [filteredDocuments, setFilteredDocuments] = useState(mockDocuments);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const itemsPerPage = 10;
  
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  
  const currentDocuments = filteredDocuments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setFilteredDocuments(mockDocuments);
      return;
    }
    
    const filtered = mockDocuments.filter(doc => 
      doc.invoiceNumber.toLowerCase().includes(query.toLowerCase()) ||
      doc.vendorName.toLowerCase().includes(query.toLowerCase()) ||
      doc.city.toLowerCase().includes(query.toLowerCase()) ||
      doc.region.toLowerCase().includes(query.toLowerCase()) ||
      doc.sapRoute.toLowerCase().includes(query.toLowerCase()) ||
      doc.mirnahRoute.toLowerCase().includes(query.toLowerCase()) ||
      doc.reason.toLowerCase().includes(query.toLowerCase()) ||
      doc.reconStatus.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredDocuments(filtered);
    setCurrentPage(1);
  };
  
  const handleFilter = (filters: any) => {
    let filtered = [...mockDocuments];
    
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(doc => doc.status === filters.status);
    }
    
    if (filters.city && filters.city !== 'all') {
      filtered = filtered.filter(doc => doc.city === filters.city);
    }
    
    if (filters.region && filters.region !== 'all') {
      filtered = filtered.filter(doc => doc.region === filters.region);
    }
    
    if (filters.dateRange && filters.dateRange !== 'all') {
      // Handle date filtering based on the selected range
      const today = new Date();
      const filterDate = new Date();
      
      switch (filters.dateRange) {
        case 'this-week':
          filterDate.setDate(today.getDate() - 7);
          break;
        case 'this-month':
          filterDate.setMonth(today.getMonth() - 1);
          break;
        case 'last-month':
          filterDate.setMonth(today.getMonth() - 2);
          filterDate.setDate(today.getDate() + 30);
          break;
        default:
          break;
      }
      
      filtered = filtered.filter(doc => {
        const docDate = new Date(doc.date);
        return docDate >= filterDate;
      });
    }
    
    setFilteredDocuments(filtered);
    setCurrentPage(1);
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handleSelectDocument = (id: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedDocuments([...selectedDocuments, id]);
    } else {
      setSelectedDocuments(selectedDocuments.filter(docId => docId !== id));
    }
  };
  
  const handleBulkAction = (action: 'share' | 'download') => {
    // Handle bulk actions here
    console.log(`${action} documents:`, selectedDocuments);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Document Status</h1>
      </div>
      
      <DocumentsFilters onSearch={handleSearch} onFilter={handleFilter} />
      
      <DocumentsTable 
        documents={currentDocuments}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Documents;
