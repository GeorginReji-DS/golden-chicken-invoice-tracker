
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Check, Edit, Plus, Search, Trash, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";

// Mock data for users
const mockUsers = [
  {
    id: "1",
    name: "Ahmed Khalid",
    email: "ahmed.k@goldenchicken.com.sa",
    role: "admin",
    status: "active",
    plants: ["Riyadh Plant", "Jeddah Plant"]
  },
  {
    id: "2",
    name: "Mohammed Ali",
    email: "mohammed.a@goldenchicken.com.sa",
    role: "user",
    status: "active",
    plants: ["Riyadh Plant"]
  },
  {
    id: "3",
    name: "Sara Nasser",
    email: "sara.n@goldenchicken.com.sa",
    role: "user",
    status: "inactive",
    plants: []
  }
];

// Mock data for plants
const mockPlants = [
  { id: "1", name: "Riyadh Plant" },
  { id: "2", name: "Jeddah Plant" },
  { id: "3", name: "Dammam Plant" },
  { id: "4", name: "Abha Plant" }
];

const Users = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingUser, setEditingUser] = useState<any>(null);
  const [showPlantDialog, setShowPlantDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedPlants, setSelectedPlants] = useState<string[]>([]);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      role: "user"
    }
  });

  const editForm = useForm({
    defaultValues: {
      name: "",
      email: "",
      role: "user",
      status: "active"
    }
  });

  const handleSubmitUser = (data: any) => {
    const newUser = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      role: data.role,
      status: "active",
      plants: []
    };
    
    setUsers([...users, newUser]);
    form.reset();
    
    toast({
      title: "User Added",
      description: `${data.name} has been added successfully.`
    });
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    editForm.reset({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });
  };

  const handleUpdateUser = (data: any) => {
    if (!editingUser) return;
    
    setUsers(users.map(user => 
      user.id === editingUser.id ? {
        ...user,
        name: data.name,
        email: data.email,
        role: data.role,
        status: data.status
      } : user
    ));
    
    setEditingUser(null);
    
    toast({
      title: "User Updated",
      description: `${data.name} has been updated successfully.`
    });
  };

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id));
    
    toast({
      title: "User Deleted",
      description: "The user has been deleted successfully."
    });
  };

  const handleManagePlants = (user: any) => {
    setSelectedUser(user);
    setSelectedPlants([...user.plants]);
    setShowPlantDialog(true);
  };

  const handleTogglePlant = (plantName: string) => {
    if (selectedPlants.includes(plantName)) {
      setSelectedPlants(selectedPlants.filter(p => p !== plantName));
    } else {
      setSelectedPlants([...selectedPlants, plantName]);
    }
  };

  const handleSavePlants = () => {
    if (!selectedUser) return;
    
    setUsers(users.map(user => 
      user.id === selectedUser.id ? {
        ...user,
        plants: selectedPlants
      } : user
    ));
    
    setShowPlantDialog(false);
    setSelectedUser(null);
    
    toast({
      title: "Plants Assigned",
      description: "User's plant access has been updated successfully."
    });
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">User Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmitUser)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter user's full name" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input {...field} type="email" placeholder="Enter email address" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">Administrator</SelectItem>
                          <SelectItem value="user">Regular User</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" className="bg-brand hover:bg-brand/90">Add User</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>View and manage users in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search users..."
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
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned Plants</TableHead>
                  <TableHead className="w-[160px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="capitalize">{user.role}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === "active" ? "outline" : "secondary"} className={user.status === "active" ? "text-green-600 border-green-600" : ""}>
                          {user.status === "active" ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {user.plants.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {user.plants.slice(0, 2).map((plant: string, index: number) => (
                              <Badge key={index} variant="secondary" className="bg-brand/10 text-brand">
                                {plant}
                              </Badge>
                            ))}
                            {user.plants.length > 2 && (
                              <Badge variant="secondary" className="bg-gray-100">
                                +{user.plants.length - 2} more
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground text-sm">No plants assigned</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleEditUser(user)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit User</DialogTitle>
                              </DialogHeader>
                              <Form {...editForm}>
                                <form onSubmit={editForm.handleSubmit(handleUpdateUser)} className="space-y-4">
                                  <FormField
                                    control={editForm.control}
                                    name="name"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                          <Input {...field} />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={editForm.control}
                                    name="email"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                          <Input {...field} type="email" />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={editForm.control}
                                    name="role"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                          <FormControl>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select role" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            <SelectItem value="admin">Administrator</SelectItem>
                                            <SelectItem value="user">Regular User</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </FormItem>
                                    )}
                                  />
                                  <FormField
                                    control={editForm.control}
                                    name="status"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Status</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                          <FormControl>
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                          </FormControl>
                                          <SelectContent>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </FormItem>
                                    )}
                                  />
                                  <DialogFooter>
                                    <DialogClose asChild>
                                      <Button type="button" variant="outline">Cancel</Button>
                                    </DialogClose>
                                    <Button type="submit" className="bg-brand hover:bg-brand/90">Update User</Button>
                                  </DialogFooter>
                                </form>
                              </Form>
                            </DialogContent>
                          </Dialog>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleManagePlants(user)}
                          >
                            <Badge className="bg-brand/10 text-brand hover:bg-brand/20 px-2">
                              Plants
                            </Badge>
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteUser(user.id)}
                          >
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={showPlantDialog} onOpenChange={setShowPlantDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Manage Plant Access</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="font-medium">
                Assign plants for: <span className="text-brand">{selectedUser.name}</span>
              </div>
              <div className="border rounded-md p-4 max-h-[300px] overflow-y-auto">
                {mockPlants.map(plant => (
                  <div key={plant.id} className="flex items-center space-x-2 py-2 border-b last:border-0">
                    <Checkbox 
                      id={`plant-${plant.id}`} 
                      checked={selectedPlants.includes(plant.name)}
                      onCheckedChange={() => handleTogglePlant(plant.name)}
                    />
                    <label 
                      htmlFor={`plant-${plant.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {plant.name}
                    </label>
                  </div>
                ))}
              </div>
              <div className="text-sm text-muted-foreground">
                Users will only see invoices from their assigned plants in the document status page.
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowPlantDialog(false)}>
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button onClick={handleSavePlants} className="bg-brand hover:bg-brand/90">
                  <Check className="mr-2 h-4 w-4" />
                  Save Assignments
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Users;
