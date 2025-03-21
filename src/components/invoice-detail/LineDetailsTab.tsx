
import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Edit, Trash, GripVertical } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface LineItem {
  id: string;
  slNo: number;
  outletCode: string;
  inGrn: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface InvoiceDetail {
  items: LineItem[];
  reason: string;
  creditNote: string;
  comments: string;
}

interface LineDetailsTabProps {
  invoice: InvoiceDetail;
}

export function LineDetailsTab({ invoice }: LineDetailsTabProps) {
  const [items, setItems] = useState<LineItem[]>(invoice.items);
  const [reason, setReason] = useState(invoice.reason);
  const [creditNote, setCreditNote] = useState(invoice.creditNote);
  const [comments, setComments] = useState(invoice.comments);
  const [editingItem, setEditingItem] = useState<LineItem | null>(null);
  
  // For drag and drop functionality
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleEdit = (item: LineItem) => {
    setEditingItem({...item});
  };

  const handleUpdateItem = () => {
    if (!editingItem) return;
    
    setItems(items.map(item => 
      item.id === editingItem.id ? editingItem : item
    ));
    
    setEditingItem(null);
    
    toast({
      title: "Item Updated",
      description: "The line item has been updated successfully.",
    });
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    
    toast({
      title: "Item Deleted",
      description: "The line item has been removed successfully.",
    });
  };

  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    
    const itemsCopy = [...items];
    const draggedItem = itemsCopy[dragItem.current];
    
    // Remove item from original position
    itemsCopy.splice(dragItem.current, 1);
    // Insert at new position
    itemsCopy.splice(dragOverItem.current, 0, draggedItem);
    
    // Reset the indices
    const reorderedItems = itemsCopy.map((item, index) => ({
      ...item,
      slNo: index + 1
    }));
    
    setItems(reorderedItems);
    dragItem.current = null;
    dragOverItem.current = null;
    
    toast({
      title: "Items Reordered",
      description: "The line items have been reordered successfully.",
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10"></TableHead>
                  <TableHead className="w-12">SL No</TableHead>
                  <TableHead>Outlet Code</TableHead>
                  <TableHead>IN/GRN</TableHead>
                  <TableHead>GC Description</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow 
                    key={item.id}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragEnter={() => handleDragEnter(index)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => e.preventDefault()}
                    className="cursor-grab active:cursor-grabbing"
                  >
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <GripVertical className="h-4 w-4 text-gray-400" />
                      </div>
                    </TableCell>
                    <TableCell>{item.slNo}</TableCell>
                    <TableCell>{item.outletCode}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.inGrn === "GRN" 
                          ? "bg-amber-100 text-amber-800" 
                          : "bg-blue-100 text-blue-800"
                      }`}>
                        {item.inGrn}
                      </span>
                    </TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">{item.unitPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Edit Line Item</DialogTitle>
                            </DialogHeader>
                            {editingItem && (
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label htmlFor="outletCode" className="text-right">Outlet Code</label>
                                  <Input
                                    id="outletCode"
                                    value={editingItem.outletCode}
                                    onChange={(e) => setEditingItem({...editingItem, outletCode: e.target.value})}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label htmlFor="description" className="text-right">Description</label>
                                  <Input
                                    id="description"
                                    value={editingItem.description}
                                    onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label htmlFor="quantity" className="text-right">Quantity</label>
                                  <Input
                                    id="quantity"
                                    type="number"
                                    value={editingItem.quantity}
                                    onChange={(e) => {
                                      const qty = Number(e.target.value);
                                      setEditingItem({
                                        ...editingItem, 
                                        quantity: qty,
                                        total: qty * editingItem.unitPrice
                                      });
                                    }}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label htmlFor="unitPrice" className="text-right">Unit Price</label>
                                  <Input
                                    id="unitPrice"
                                    type="number"
                                    step="0.01"
                                    value={editingItem.unitPrice}
                                    onChange={(e) => {
                                      const price = Number(e.target.value);
                                      setEditingItem({
                                        ...editingItem, 
                                        unitPrice: price,
                                        total: editingItem.quantity * price
                                      });
                                    }}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <label htmlFor="total" className="text-right">Total</label>
                                  <Input
                                    id="total"
                                    value={editingItem.total.toFixed(2)}
                                    readOnly
                                    className="col-span-3 bg-gray-50"
                                  />
                                </div>
                              </div>
                            )}
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <Button onClick={handleUpdateItem}>Save Changes</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                          <Trash className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="space-y-4 pt-6">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="reason" className="text-sm font-medium">Reason</label>
              <Select 
                value={reason} 
                onValueChange={setReason}
              >
                <SelectTrigger id="reason" className="w-full">
                  <SelectValue placeholder="Select reason..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mismatch">Price Mismatch</SelectItem>
                  <SelectItem value="quantity">Quantity Issue</SelectItem>
                  <SelectItem value="damaged">Damaged Products</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="creditNote" className="text-sm font-medium">Credit Note</label>
              <Textarea 
                id="creditNote" 
                placeholder="Credit note information..." 
                className="resize-none"
                value={creditNote}
                onChange={(e) => setCreditNote(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="comments" className="text-sm font-medium">Comments</label>
              <Textarea 
                id="comments" 
                placeholder="Write here..." 
                className="resize-none"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button className="bg-brand hover:bg-brand/90">
                <Check className="mr-2 h-4 w-4" />
                Reconcile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
