
import { useState } from "react";
import { DocumentsTable } from "@/components/documents/DocumentsTable";
import { Button } from "@/components/ui/button";
import { CalendarIcon, RefreshCw, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// Mock data for our documents
const mockDocuments = Array.from({ length: 25 }, (_, i) => ({
  id: `doc-${i + 1}`,
  invoiceNumber: `${(Math.floor(Math.random() * 3) === 0) ? "126003223719" : 
                   (Math.floor(Math.random() * 3) === 1) ? "126006225634" : "126006225709"}`,
  vendorName: [
    "A MARKET", 
    "CARREFOUR", 
    "NESTO", 
    "OTHAIM", 
    "PANDA"
  ][Math.floor(Math.random() * 5)],
  amount: Number((Math.random() * 2000 + 100).toFixed(2)),
  date: new Date(2025, Math.floor(Math.random() * 3), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
  dueDate: new Date(2025, Math.floor(Math.random() * 3), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
  status: "Sales Invoice",
  city: ["Riyadh", "Jeddah", "Dammam", "Medina", "Khobar"][Math.floor(Math.random() * 5)],
  region: ["Central", "Western", "Eastern", "Northern", "Southern"][Math.floor(Math.random() * 5)],
  sapInvoiceNo: "9001569157",
  custId: "1001262",
  sapRoute: `10120${Math.floor(Math.random() * 9) + 1}`,
  mirnahRoute: `126011`,
  salesMan: ["105894", "105298"][Math.floor(Math.random() * 2)],
  reason: ["Multiple Lines Mismatch", "Recon classification not found", "Mismatch: Invoice/GRN"][Math.floor(Math.random() * 3)],
  reconStatus: "Not reconciled"
}));

const cities = ["Riyadh", "Jeddah", "Dammam", "Makkah", "Madinah", "Al Hassa", "Qassim", "Jizan", "Tabouk"];
const reconcileOptions = ["Not reconciled", "Stamp", "GRN", "Manual"];

const Documents = () => {
  const [filteredDocuments, setFilteredDocuments] = useState(mockDocuments);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("Not reconciled");
  const [globalSearch, setGlobalSearch] = useState<string>("");
  const [mirnahRouteSearch, setMirnahRouteSearch] = useState<string>("");
  
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);
  
  const currentDocuments = filteredDocuments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const handleSearch = () => {
    if (!globalSearch.trim() && !fromDate && !toDate && !selectedCity && selectedStatus === "Not reconciled" && !mirnahRouteSearch) {
      setFilteredDocuments(mockDocuments);
      return;
    }
    
    let filtered = [...mockDocuments];
    
    if (globalSearch.trim()) {
      filtered = filtered.filter(doc => 
        doc.invoiceNumber.toLowerCase().includes(globalSearch.toLowerCase()) ||
        doc.vendorName.toLowerCase().includes(globalSearch.toLowerCase()) ||
        doc.salesMan.toLowerCase().includes(globalSearch.toLowerCase()) ||
        doc.sapInvoiceNo.toLowerCase().includes(globalSearch.toLowerCase()) ||
        doc.custId.toLowerCase().includes(globalSearch.toLowerCase())
      );
    }
    
    if (fromDate) {
      filtered = filtered.filter(doc => {
        const docDate = new Date(doc.date);
        return docDate >= fromDate;
      });
    }
    
    if (toDate) {
      filtered = filtered.filter(doc => {
        const docDate = new Date(doc.date);
        return docDate <= toDate;
      });
    }
    
    if (selectedCity) {
      filtered = filtered.filter(doc => doc.city === selectedCity);
    }
    
    if (selectedStatus !== "Not reconciled") {
      filtered = filtered.filter(doc => doc.reconStatus === selectedStatus);
    }
    
    if (mirnahRouteSearch) {
      filtered = filtered.filter(doc => 
        doc.mirnahRoute.toLowerCase().includes(mirnahRouteSearch.toLowerCase())
      );
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
  
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDocuments(currentDocuments.map(doc => doc.id));
    } else {
      setSelectedDocuments([]);
    }
  };
  
  const handleRefresh = () => {
    setGlobalSearch("");
    setFromDate(undefined);
    setToDate(undefined);
    setSelectedCity("");
    setSelectedStatus("Not reconciled");
    setMirnahRouteSearch("");
    setFilteredDocuments(mockDocuments);
  };
  
  const handleBulkAction = (action: 'share' | 'download') => {
    console.log(`${action} documents:`, selectedDocuments);
  };

  const clearSelection = () => {
    setSelectedDocuments([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Document Status</h1>
      </div>
      
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Global Search by Invoice Number..."
            className="pl-8"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="border rounded-md bg-white">
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">From</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !fromDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {fromDate ? format(fromDate, "yyyy-MM-dd") : "Start Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={fromDate}
                    onSelect={setFromDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">To</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !toDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {toDate ? format(toDate, "yyyy-MM-dd") : "End Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={toDate}
                    onSelect={setToDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">City</label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city} value={city}>{city}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Reconcile</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {reconcileOptions.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Mirnah Route</label>
              <div className="flex gap-2">
                <Input 
                  placeholder="Search by Route" 
                  value={mirnahRouteSearch}
                  onChange={(e) => setMirnahRouteSearch(e.target.value)}
                />
                <Button variant="outline" size="icon" onClick={handleSearch}>
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearSelection}
                disabled={!selectedDocuments.length}
              >
                Clear Selection
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleRefresh}
              >
                <RefreshCw className="h-3 w-3 mr-2" />
                Refresh
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleBulkAction('share')}
                disabled={!selectedDocuments.length}
              >
                Share
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleBulkAction('download')}
                disabled={!selectedDocuments.length}
              >
                Download
              </Button>
            </div>
          </div>
        </div>
        
        <DocumentsTable 
          documents={currentDocuments}
          selectedDocuments={selectedDocuments}
          onSelectDocument={handleSelectDocument}
          onSelectAll={handleSelectAll}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Documents;
