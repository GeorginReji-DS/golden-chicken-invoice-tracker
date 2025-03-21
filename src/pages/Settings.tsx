
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Edit, Plus, Search, Trash } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock data for payers
const mockPayers = [
  {
    id: "1",
    code: "1001262",
    name: "Abdallah Al Othaim Markets",
    shortName: "OTHAIM",
    reconClass: "GRN"
  },
  {
    id: "2",
    code: "1001353",
    name: "Al Madina Markets",
    shortName: "MADINA",
    reconClass: "STAMP"
  },
  {
    id: "3",
    code: "1002136",
    name: "Carrefour Saudi Arabia",
    shortName: "CARREFOUR",
    reconClass: "GRN"
  }
];

const Settings = () => {
  const [payers, setPayers] = useState(mockPayers);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingPayer, setEditingPayer] = useState<any>(null);

  const form = useForm({
    defaultValues: {
      payerCode: "",
      payerName: "",
      payerShortName: "",
      reconClassification: ""
    }
  });

  const editForm = useForm({
    defaultValues: {
      payerCode: "",
      payerName: "",
      payerShortName: "",
      reconClassification: ""
    }
  });

  const handleSubmitPayer = (data: any) => {
    const newPayer = {
      id: Date.now().toString(),
      code: data.payerCode,
      name: data.payerName,
      shortName: data.payerShortName,
      reconClass: data.reconClassification
    };
    
    setPayers([...payers, newPayer]);
    form.reset();
    
    toast({
      title: "Payer Added",
      description: `${data.payerName} has been added successfully.`
    });
  };

  const handleEditPayer = (payer: any) => {
    setEditingPayer(payer);
    editForm.reset({
      payerCode: payer.code,
      payerName: payer.name,
      payerShortName: payer.shortName,
      reconClassification: payer.reconClass
    });
  };

  const handleUpdatePayer = (data: any) => {
    if (!editingPayer) return;
    
    setPayers(payers.map(payer => 
      payer.id === editingPayer.id ? {
        ...payer,
        code: data.payerCode,
        name: data.payerName,
        shortName: data.payerShortName,
        reconClass: data.reconClassification
      } : payer
    ));
    
    setEditingPayer(null);
    
    toast({
      title: "Payer Updated",
      description: `${data.payerName} has been updated successfully.`
    });
  };

  const handleDeletePayer = (id: string) => {
    setPayers(payers.filter(payer => payer.id !== id));
    
    toast({
      title: "Payer Deleted",
      description: "The payer has been deleted successfully."
    });
  };

  const filteredPayers = payers.filter(payer => 
    payer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payer.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payer.shortName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Settings</h1>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Payer Management</CardTitle>
              <CardDescription>Add, update or remove payers and their reconciliation classifications</CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Payer
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Payer Details</DialogTitle>
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
                      name="payerName"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel>Payer Name</FormLabel>
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
                            <Input {...field} />
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
                              <SelectItem value="STAMP">Stamp</SelectItem>
                              <SelectItem value="GRN">GRN</SelectItem>
                              <SelectItem value="MANUAL">Manual</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit" className="bg-brand hover:bg-brand/90">Submit</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search payers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payer Code</TableHead>
                  <TableHead>Payer Name</TableHead>
                  <TableHead>Short Name</TableHead>
                  <TableHead>Recon Class</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayers.length > 0 ? (
                  filteredPayers.map((payer) => (
                    <TableRow key={payer.id}>
                      <TableCell className="font-medium">{payer.code}</TableCell>
                      <TableCell>{payer.name}</TableCell>
                      <TableCell>{payer.shortName}</TableCell>
                      <TableCell>{payer.reconClass}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleEditPayer(payer)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Payer Details</DialogTitle>
                              </DialogHeader>
                              <Form {...editForm}>
                                <form onSubmit={editForm.handleSubmit(handleUpdatePayer)} className="space-y-4">
                                  <FormField
                                    control={editForm.control}
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
                                    control={editForm.control}
                                    name="payerName"
                                    render={({ field }) => (
                                      <FormItem>
                                        <div className="flex items-center justify-between">
                                          <FormLabel>Payer Name</FormLabel>
                                          <span>:</span>
                                        </div>
                                        <FormControl>
                                          <Input {...field} />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={editForm.control}
                                    name="payerShortName"
                                    render={({ field }) => (
                                      <FormItem>
                                        <div className="flex items-center justify-between">
                                          <FormLabel>Payer Short Name</FormLabel>
                                          <span>:</span>
                                        </div>
                                        <FormControl>
                                          <Input {...field} />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={editForm.control}
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
                                            <SelectItem value="STAMP">Stamp</SelectItem>
                                            <SelectItem value="GRN">GRN</SelectItem>
                                            <SelectItem value="MANUAL">Manual</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </FormItem>
                                    )}
                                  />
                                  <DialogFooter>
                                    <DialogClose asChild>
                                      <Button type="button" variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit" className="bg-brand hover:bg-brand/90">Update</Button>
                                  </DialogFooter>
                                </form>
                              </Form>
                            </DialogContent>
                          </Dialog>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeletePayer(payer.id)}
                          >
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No payers found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
