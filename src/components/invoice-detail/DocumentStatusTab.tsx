
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Download, RefreshCw, Search, Settings, Share } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock data for documents table
const mockDocuments = [
  {
    id: "1",
    invoiceNo: "126003223719",
    invoiceDate: "2025-02-20",
    city: "Riyadh",
    region: "Central",
    sapRoute: "101203",
    mirnahRoute: "126011",
    payer: "A MARKET",
    salesMan: "105894",
    recon: "Not reconciled",
    reason: "Multiple Lines Mismatch",
    selected: false
  },
  {
    id: "2",
    invoiceNo: "126006225634",
    invoiceDate: "2025-02-17",
    city: "Jeddah",
    region: "Central",
    sapRoute: "101206",
    mirnahRoute: "126003",
    payer: "CARREFOUR",
    salesMan: "105298",
    recon: "Not reconciled",
    reason: "Recon classification not found",
    selected: false
  },
  {
    id: "3",
    invoiceNo: "126006225709",
    invoiceDate: "2025-02-25",
    city: "Dammam",
    region: "Central",
    sapRoute: "101206",
    mirnahRoute: "126003",
    payer: "NESTO",
    salesMan: "105298",
    recon: "Not reconciled",
    reason: "Mismatch: Invoice/GRN",
    selected: false
  }
];

const cities = ["Riyadh", "Jeddah", "Dammam", "Makkah", "Madinah", "Al Hassa", "Qassim", "Jizan", "Tabouk"];
const reasons = ["Multiple Lines Mismatch", "Recon classification not found", "Mismatch: Invoice/GRN"];
const statuses = ["All", "Stamp", "GRN", "Manual", "Not reconciled"];

export function DocumentStatusTab() {
  const [documents, setDocuments] = useState(mockDocuments);
  const [fromDate, setFromDate] = useState<Date | undefined>();
  const [toDate, setToDate] = useState<Date | undefined>();
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("Not reconciled");
  const [globalSearch, setGlobalSearch] = useState<string>("");

  const [anySelected, setAnySelected] = useState(false);
  
  // Setup form for adding new payer
  const form = useForm({
    defaultValues: {
      payerCode: "",
      payerShortName: "",
      reconClassification: ""
    }
  });

  const handleSelectAll = (checked: boolean) => {
    setDocuments(documents.map(doc => ({ ...doc, selected: checked })));
    setAnySelected(checked);
  };

  const handleRowSelect = (id: string, checked: boolean) => {
    const newDocs = documents.map(doc => 
      doc.id === id ? { ...doc, selected: checked } : doc
    );
    setDocuments(newDocs);
    setAnySelected(newDocs.some(doc => doc.selected));
  };

  const handleSearch = () => {
    // In a real app, this would send a request to the backend
    console.log("Searching with:", { fromDate, toDate, selectedCity, selectedStatus, globalSearch });
  };

  const handleSubmitPayer = (data: any) => {
    console.log("New payer data:", data);
    // In a real app, this would send a request to the backend
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Input
            placeholder="Global Search by Invoice Number..."
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        </div>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
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
                    className="pointer-events-auto"
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
                    className="pointer-events-auto"
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
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium">Mirnah Route</label>
              <div className="flex gap-2">
                <Input placeholder="Search by Route" />
                <Button variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSelectAll(false)}
                disabled={!anySelected}
              >
                Clear Selection
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleSearch()}
              >
                <RefreshCw className="h-3 w-3 mr-2" />
                Refresh
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={!anySelected}
              >
                <Share className="h-3 w-3 mr-2" />
                Share
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={!anySelected}
              >
                <Download className="h-3 w-3 mr-2" />
                Download
              </Button>
            </div>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox 
                      onCheckedChange={(checked) => {
                        handleSelectAll(checked === true);
                      }} 
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
                        checked={doc.selected}
                        onCheckedChange={(checked) => {
                          handleRowSelect(doc.id, checked === true);
                        }}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{doc.invoiceNo}</TableCell>
                    <TableCell>{doc.invoiceDate}</TableCell>
                    <TableCell>Sales Invoice</TableCell>
                    <TableCell>9001569157</TableCell>
                    <TableCell>1001262</TableCell>
                    <TableCell>{doc.payer}</TableCell>
                    <TableCell>{doc.salesMan}</TableCell>
                    <TableCell>{doc.region}</TableCell>
                    <TableCell>{doc.sapRoute}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-red-500 border-red-500">
                        {doc.recon}
                      </Badge>
                    </TableCell>
                    <TableCell>{doc.reason}</TableCell>
                    <TableCell>
                      <Button size="sm" className="bg-brand text-white text-xs py-0 h-6">
                        Re-process
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Showing 3 of 3 records</span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="bg-brand/10">1</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button>New Payer</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add/Edit Payer Details</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmitPayer)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="payerCode"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Payer Code</FormLabel>
                        <span>:</span>
                      </div>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="payerShortName"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Payer Short Name</FormLabel>
                        <span>:</span>
                      </div>
                      <FormControl>
                        <div className="flex gap-2">
                          <Input {...field} />
                          <Button variant="destructive" type="button" size="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m6 9 6 6 6-6"/></svg>
                          </Button>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reconClassification"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Recon Classification</FormLabel>
                        <span>:</span>
                      </div>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select classification" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="stamp">Stamp</SelectItem>
                          <SelectItem value="grn">GRN</SelectItem>
                          <SelectItem value="manual">Manual</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <div className="flex justify-center mt-4">
                  <Button type="submit" className="bg-brand hover:bg-brand/90">Submit</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
