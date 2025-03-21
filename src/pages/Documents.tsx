
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
  date: new Date(2023, 4, Math.floor(Math.random() * 30) + 1).toISOString().split('T')[0],
  dueDate: new Date(2023, 5, Math.floor(Math.random() * 30) + 1).toISOString().split('T')[0],
  status: ["approved", "pending", "rejected"][Math.floor(Math.random() * 3)] as "approved" | "pending" | "rejected"
}));

const Documents = () => {
  const [filteredDocuments, setFilteredDocuments] = useState(mockDocuments);
  const [currentPage, setCurrentPage] = useState(1);
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
      doc.vendorName.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredDocuments(filtered);
    setCurrentPage(1);
  };
  
  const handleFilter = (filters: any) => {
    let filtered = [...mockDocuments];
    
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(doc => doc.status === filters.status);
    }
    
    // Add more filter logic here
    
    setFilteredDocuments(filtered);
    setCurrentPage(1);
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
