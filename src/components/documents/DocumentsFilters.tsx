
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";
import { useState } from "react";

interface DocumentsFiltersProps {
  onSearch: (query: string) => void;
  onFilter: (filters: any) => void;
}

export function DocumentsFilters({ onSearch, onFilter }: DocumentsFiltersProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  
  const handleSearch = () => {
    onSearch(searchQuery);
  };
  
  const handleFilter = () => {
    onFilter({
      status: statusFilter,
      date: dateFilter
    });
  };
  
  const clearFilters = () => {
    setStatusFilter("");
    setDateFilter("");
    onFilter({});
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search invoices..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button variant="outline" onClick={() => setFiltersOpen(!filtersOpen)}>
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
        <Button onClick={handleSearch}>Search</Button>
      </div>
      
      {filtersOpen && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-md bg-muted/10">
          <div className="space-y-2">
            <label className="text-sm font-medium">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Date Range</label>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-end gap-2">
            <Button className="flex-1" onClick={handleFilter}>Apply Filters</Button>
            <Button variant="outline" size="icon" onClick={clearFilters}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
