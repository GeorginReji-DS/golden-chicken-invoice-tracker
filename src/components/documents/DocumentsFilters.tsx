
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
  const [cityFilter, setCityFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [reasonFilter, setReasonFilter] = useState("");
  const [routeFilter, setRouteFilter] = useState("");
  
  const handleSearch = () => {
    onSearch(searchQuery);
  };
  
  const handleFilter = () => {
    onFilter({
      status: statusFilter,
      dateRange: dateFilter,
      city: cityFilter,
      region: regionFilter,
      reason: reasonFilter,
      route: routeFilter
    });
  };
  
  const clearFilters = () => {
    setStatusFilter("");
    setDateFilter("");
    setCityFilter("");
    setRegionFilter("");
    setReasonFilter("");
    setRouteFilter("");
    onFilter({});
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by invoice #, vendor, city, region..."
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
          
          <div className="space-y-2">
            <label className="text-sm font-medium">City</label>
            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                <SelectItem value="Riyadh">Riyadh</SelectItem>
                <SelectItem value="Jeddah">Jeddah</SelectItem>
                <SelectItem value="Dammam">Dammam</SelectItem>
                <SelectItem value="Medina">Medina</SelectItem>
                <SelectItem value="Khobar">Khobar</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Region</label>
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="Central">Central</SelectItem>
                <SelectItem value="Western">Western</SelectItem>
                <SelectItem value="Eastern">Eastern</SelectItem>
                <SelectItem value="Northern">Northern</SelectItem>
                <SelectItem value="Southern">Southern</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Reason</label>
            <Select value={reasonFilter} onValueChange={setReasonFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reasons</SelectItem>
                <SelectItem value="Damaged Goods">Damaged Goods</SelectItem>
                <SelectItem value="Quantity Mismatch">Quantity Mismatch</SelectItem>
                <SelectItem value="Price Discrepancy">Price Discrepancy</SelectItem>
                <SelectItem value="Late Delivery">Late Delivery</SelectItem>
                <SelectItem value="Quality Issues">Quality Issues</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Route</label>
            <Select value={routeFilter} onValueChange={setRouteFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select route" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Routes</SelectItem>
                <SelectItem value="SAP">SAP Routes</SelectItem>
                <SelectItem value="Mirnah">Mirnah Routes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-end gap-2 md:col-span-3">
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
