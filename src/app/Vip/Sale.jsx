import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { _post } from "@/lib/Helper";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function VipSales() {
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
          <CardHeader className="font-medium text-3xl">Vip Sales</CardHeader>
          <CardContent className="px-2 pb-2">
            <form onSubmit={handleOutSubmit}>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2 ">
                  <Label htmlFor="item_name">Item Name</Label>
                  <Select>
                    <SelectTrigger
                      id="gender"
                      className="border-2 border-[#4267B2] focus:ring-[#4267B2] focus:border-[#4267B2]"
                    >
                      <SelectValue placeholder="Select Item" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Rice</SelectItem>
                      <SelectItem value="female">Chicken</SelectItem>
                      <SelectItem value="other">Drinks</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* <Input
                    onChange={handleOutChange}
                    name="item_name"
                    type="text"
                    id="item_name"
                    placeholder="Item Name"
                  /> */}
                </div>
              </div>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2">
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
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2 ">
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
              </div>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2">
                  <Label htmlFor="cost">Quantity</Label>
                  <Input
                    onChange={handleOutChange}
                    name="in_qty"
                    type="number"
                    id="in_qty"
                    placeholder="Quantity"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2 ">
                  <Label htmlFor="date">Destination</Label>
                  <Select>
                    <SelectTrigger
                      id="gender"
                      className="border-2 border-[#4267B2] focus:ring-[#4267B2] focus:border-[#4267B2]"
                    >
                      <SelectValue placeholder="Select Destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Kitchen</SelectItem>
                      <SelectItem value="female">Vip</SelectItem>
                      <SelectItem value="other">Vibes</SelectItem>
                    </SelectContent>
                  </Select>
                  {/* <input
                    className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    onChange={handleOutChange}
                    name="destination"
                    type="text"
                    id="date"
                    placeholder="Destination"
                  /> */}
                </div>
              </div>
              <div className="flex flex-1 justify-center flex-row gap-4 p-4 pt-0">
                <Button>Submit</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
}
