import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { _post } from "@/lib/Helper";
import { useState } from "react";

export default function InAndOut() {
  const [inForm,setInForm] = useState({})
   const [outForm, setOutForm] = useState({});
  const handleInChange = ({target:{name, value}}) => {
    console.log(name, value);
    setInForm(p => ({...p, [name]:value}))
  }
    const handleOutChange = ({ target: { name, value } }) => {
      console.log(name, value);
      setOutForm((p) => ({ ...p, [name]: value }));
    };

      const handleInSubmit = (e) => {
        e.preventDefault();
        if(inForm.cost) {
          _post(
            `stores?query_type=create_input`,
            { ...inForm },
            (resp) => {
              alert(resp);
            },
            (err) => {
              alert(err);
            }
          );
        }
      }; 
        const handleOutSubmit = (e) => {
          e.preventDefault();
          if(outForm.destination){
            _post(
              `stores?query_type=create_output`,
              { ...outForm },
              (resp) => {
                alert(resp);
              },
              (err) => {
                alert(err);
              }
            );
          }
        }; 
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>IN</CardHeader>
          <CardContent className="px-2 pb-2">
            <form onSubmit={handleInSubmit}>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max-w-sm items-center gap-1.5 md:grid-cols-2 ">
                  <Label htmlFor="item_name">Item Name</Label>
                  <Input
                    onChange={handleInChange}
                    name="item_name"
                    type="text"
                    id="item_name"
                    placeholder="Item Name"
                  />
                </div>
                <div className=" w-full max-w-sm items-center gap-1.5 md:grid-cols-2">
                  <Label htmlFor="cost">Cost</Label>
                  <Input
                    onChange={handleInChange}
                    name="item_cost"
                    type="number"
                    id="item_cost"
                    placeholder="Cost"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max-w-sm items-center gap-1.5 md:grid-cols-2 ">
                  <Label htmlFor="date">Date</Label>
                  <input
                    className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    onChange={handleInChange}
                    name="date_of_collection"
                    type="date"
                    id="date"
                    placeholder="Item Name"
                  />
                </div>
                <div className=" w-full max-w-sm items-center gap-1.5 md:grid-cols-2">
                  <Label htmlFor="cost">Quantity</Label>
                  <Input
                    onChange={handleInChange}
                    name="in_qty"
                    type="number"
                    id="quantity"
                    placeholder="Cost"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max-w-sm items-center gap-1.5 md:grid-cols-2 ">
                  <Label htmlFor="item_name">Buyer Name</Label>
                  <Input
                    onChange={handleInChange}
                    name="buyers_name"
                    type="text"
                    id="buyers_name"
                    placeholder="Item Name"
                  />
                </div>
                <div className=" w-full max-w-sm items-center gap-1.5 md:grid-cols-2">
                  <Label htmlFor="cost">Invoice</Label>
                  <Input
                    onChange={handleInChange}
                    name="invoice"
                    type="text"
                    id="invoive"
                    placeholder="Cost"
                  />
                </div>
              </div>
              <div className="flex flex-1 justify-center flex-row gap-4 p-4 pt-0 pb-0">
                <Button>Submit</Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Out</CardHeader>
          <CardContent className="px-2 pb-2">
            <form onSubmit={handleOutSubmit}>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max-w-sm items-center gap-1.5 md:grid-cols-2 ">
                  <Label htmlFor="item_name">Item Name</Label>
                  <Input
                    onChange={handleOutChange}
                    name="item_name"
                    type="text"
                    id="item_name"
                    placeholder="Item Name"
                  />
                </div>
                <div className=" w-full max-w-sm items-center gap-1.5 md:grid-cols-2">
                  <Label htmlFor="cost">Cost</Label>
                  <Input
                    onChange={handleOutChange}
                    name="item_cost"
                    type="number"
                    id="cost"
                    placeholder="Cost"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max-w-sm items-center gap-1.5 md:grid-cols-2 ">
                  <Label htmlFor="date">Date</Label>
                  <input
                    className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    onChange={handleOutChange}
                    name="date_of_collection"
                    type="date"
                    id="date"
                    placeholder="Item Name"
                  />
                </div>
                <div className=" w-full max-w-sm items-center gap-1.5 md:grid-cols-2">
                  <Label htmlFor="cost">Quantity</Label>
                  <Input
                    onChange={handleOutChange}
                    name="in_qty"
                    type="number"
                    id="in_qty"
                    placeholder="Cost"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max-w-sm items-center gap-1.5 md:grid-cols-2 ">
                  <Label htmlFor="date">Destination</Label>
                  <input
                    className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    onChange={handleOutChange}
                    name="destination"
                    type="text"
                    id="date"
                    placeholder="Destination"
                  />
                </div>
           
              </div>
              <div className="flex flex-1 justify-center flex-row gap-4 p-4 pt-0">
                <Button >Submit</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
}
