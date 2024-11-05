import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { _get, _post } from "@/lib/Helper";
import { useCallback, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { DatePicker } from "@/components/reuseables/DatePicker";
import moment from "moment";
import toast from "react-hot-toast";

export default function VipSales({page}) {
   const [outForm, setOutForm] = useState({out_qty:1 });
    const [stocks, setStocks] = useState([]);

    const handleOutChange = ({ target: { name, value } }) => {
      console.log(name, value);
      setOutForm((p) => ({ ...p, [name]: value }));
    };
    console.log(outForm)
      const getStocks = useCallback(() => {
        _get(
          `get/menu`,
          (resp) => {
            if (resp.success) {
              setStocks(resp.data);
              //   alert(resp.data);
            }
          },
          (err) => console.error(err.message)
        );
      }, []);
      useEffect(() => {
        getStocks();
      }, [getStocks]);
        const handleOutSubmit = (e) => {
          e.preventDefault();
          console.log(outForm)
          // if(outForm.destination){
            _post(
              `insert-${page ? 'vibe' : "vip"}?query_type=create_output`,
              { ...outForm },
              (resp) => {
                toast.success(resp.message);
              },
              (err) => {
                toast.error(err.message);
              }
            );
          // }
        }; 
        const date = new Date().getTime();
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {moment().format("DD-MM-YYYY")}
      <div className="grid auto-rows-min gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="font-medium text-3xl">
            {page || "Vip"} Sales
          </CardHeader>
          <CardContent className="px-2 pb-2">
            <form onSubmit={handleOutSubmit}>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2 ">
                  <Label htmlFor="item_name">Select Menu</Label>
                  <Select
                    onValueChange={(value) => {
                      const { menu_name, menu_price } = JSON.parse(value);
                      console.log("Selected:", menu_name, menu_price);
                      setOutForm((prev) => ({
                        ...prev,
                        menu: menu_name,
                        item_price: menu_price,
                      }));
                    }}
                  >
                    <SelectTrigger
                      id="menu"
                      className="border-2 border-[#4267B2] focus:ring-[#4267B2] focus:border-[#4267B2]"
                    >
                      <SelectValue placeholder="Select Menu to sale" />
                    </SelectTrigger>
                    <SelectContent>
                      {stocks.map((stock) => (
                        <SelectItem
                          key={stock.id}
                          value={JSON.stringify({
                            menu_name: stock.menu_name,
                            menu_price: stock.menu_price,
                          })}
                        >
                          {`${stock.menu_name}`}
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
                  <Label htmlFor="cost">Price</Label>
                  <Input
                    onChange={handleOutChange}
                    name="item_cost"
                    type="number"
                    id="cost"
                    value={outForm.item_price}
                    disabled
                    placeholder="Cost"
                  />
                </div>
              </div>
              {/* <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
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
              </div> */}
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2">
                  <Label htmlFor="cost">Quantity</Label>
                  <Input
                    onChange={handleOutChange}
                    name="out_qty"
                    type="number"
                    id="in_qty"
                    value={outForm.out_qty}
                    placeholder="Quantity"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2 ">
                  {page == "Kitchen" ? (
                    <>
                      <Label htmlFor="method_of_payment">Destination</Label>
                      <Select
                        onValueChange={(value) =>
                          setOutForm((p) => ({ ...p, destination: value }))
                        }
                      >
                        <SelectTrigger
                          id="payment_method"
                          className="border-2 border-[#4267B2] focus:ring-[#4267B2] focus:border-[#4267B2]"
                        >
                          <SelectValue placeholder="Select Destination" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="vip">Vip</SelectItem>
                          <SelectItem value="vibe">Vibe</SelectItem>
                        </SelectContent>
                      </Select>
                    </>
                  ) : (
                    <>
                      <Label htmlFor="method_of_payment">
                        Method of payment
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          setOutForm((p) => ({ ...p, payment_method: value }))
                        }
                      >
                        <SelectTrigger
                          id="payment_method"
                          className="border-2 border-[#4267B2] focus:ring-[#4267B2] focus:border-[#4267B2]"
                        >
                          <SelectValue placeholder="Select Method of Payment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="pos">POS</SelectItem>
                          <SelectItem value="transfer">Transfer</SelectItem>
                        </SelectContent>
                      </Select>
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2">
                  <Label htmlFor="discount">Discount (if applicable)</Label>
                  <Input
                    onChange={handleOutChange}
                    name="discount"
                    type="number"
                    id="discount"
                    // value={outForm}
                    placeholder="Discount"
                  />
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
