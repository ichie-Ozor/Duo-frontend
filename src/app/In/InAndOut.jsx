import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { _get, _post } from "@/lib/Helper";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Calendar } from "@/components/ui/calendar";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DatePicker } from "@/components/reuseables/DatePicker";
import moment from "moment";
import toast from "react-hot-toast";

export default function InAndOut() {
  const [inForm,setInForm] = useState({})
   const [outForm, setOutForm] = useState({name_of_giver:"Frank Edward"});
    const [stocks, setStocks] = useState([]);
    const getStocks = () => {
      _get(
        `get/stock`,
        (resp) => {
          if (resp.success) {
            setStocks(resp.data);
            // alert(resp.data);
          }
        },
        (err) => console.error(err.message)
      );
    };
    useEffect(() => {
      getStocks();
    }, []);
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

          _post(
            `stores?query_type=create_input`,
            { ...inForm },
            (resp ) => {
              // alert(resp);
              if (resp.success) {
              toast.success("Item added to store successfully");
              }else{
                 toast.error(resp.error);
              }
            },
            (err) => {
              // alert(err);
              toast.error(err.success);
            }
          );
        
      }; 
        const handleOutSubmit = (e) => {
          e.preventDefault();
          if(outForm.destination){
            _post(
              `stores?query_type=create_output`,
              { ...outForm },
              (resp) => {
               if(resp.success){
                toast.success("Item Collected Successfully");
               }
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
          <CardHeader className="font-medium text-3xl">IN</CardHeader>
          <CardContent className="px-2 pb-2">
            <form onSubmit={handleInSubmit}>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2 ">
                  <Label htmlFor="item_name">Item Name</Label>
                  <Input
                    onChange={handleInChange}
                    name="item_name"
                    type="text"
                    id="item_name"
                    required
                    placeholder="Item Name"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2">
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
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2 ">
                  <Label htmlFor="date">Date</Label>
                  <div className="h-9 w-full">
                    <DatePicker
                      date={inForm.date}
                      setDate={(selectedDate) => {
                        console.log(
                          "Selected date:",
                          moment(selectedDate).format("YYYY-MM-DD"),
                          "inform : ",
                          inForm
                        );
                        setInForm((p) => ({
                          ...p,
                          date: moment(selectedDate).format("YYYY-MM-DD"),
                        }));
                      }}
                      className="w-full"
                    />
                  </div>
                  {/* <input
                    className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    onChange={handleInChange}
                    name="date_of_collection"
                    type="date"
                    id="date"
                  /> */}
                </div>
              </div>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2">
                  <Label htmlFor="cost">Quantity</Label>
                  <Input
                    onChange={handleInChange}
                    name="in_qty"
                    type="number"
                    id="quantity"
                    required
                    placeholder="Quantity"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2 ">
                  <Label htmlFor="item_name">Buyer Name</Label>
                  <Input
                    onChange={handleInChange}
                    name="buyers_name"
                    type="text"
                    id="buyers_name"
                    placeholder="Buyer Name"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2">
                  <Label htmlFor="cost">Invoice</Label>
                  <Input
                    onChange={handleInChange}
                    name="invoice"
                    type="text"
                    id="invoive"
                    placeholder="Invoice Number"
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
          <CardHeader className="font-medium text-3xl">Out</CardHeader>
          <CardContent className="px-2 pb-2">
            <form onSubmit={handleOutSubmit}>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2 ">
                  <Label htmlFor="item_name">Item Name</Label>
                  <Select
                    onValueChange={(value) =>
                      setOutForm((p) => ({ ...p, item_name: value, item_cost:stocks.filter(c => c.item_name === value)[0].item_cost}))
                    }
                  >
                    <SelectTrigger
                      id="items"
                      className="border-2 border-[#4267B2] focus:ring-[#4267B2] focus:border-[#4267B2]"
                    >
                      <SelectValue placeholder="Select Item" />
                    </SelectTrigger>
                    <SelectContent>
                      {stocks?.map((stock) => (
                        <SelectItem
                          key={stock.item_name}
                          value={stock.item_name || "ahmad"}
                        >
                          {stock.item_name}
                        </SelectItem>
                      ))}
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
                    disabled
                    value={outForm.item_cost}
                    placeholder="Cost"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2 ">
                  <Label htmlFor="date">Date</Label>
                  <div className="h-9 w-full">
                    <DatePicker
                      date={outForm.date}
                      setDate={(selectedDate) => {
                        setOutForm((p) => ({
                          ...p,
                          date: moment(selectedDate).format("YYYY-MM-DD"),
                        }));
                      }}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2">
                  <Label htmlFor="out_qty">Quantity</Label>
                  <Input
                    onChange={handleOutChange}
                    name="out_qty"
                    type="number"
                    id="out_qty"
                    min={0}
                    required
                    placeholder="Quantity"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2 ">
                  <Label htmlFor="date">Destination</Label>
                  <Select
                  onValueChange={(SelectValue) =>
                    setOutForm(p => ({...p,destination :SelectValue}))
                  }
                  >
                    <SelectTrigger
                      id="gender"
                      className="border-2 border-[#4267B2] focus:ring-[#4267B2] focus:border-[#4267B2]"
                    >
                      <SelectValue placeholder="Select Destination" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kitchen">Kitchen</SelectItem>
                      <SelectItem value="vip">Vip</SelectItem>
                      <SelectItem value="vibes">Vibes</SelectItem>
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
