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
import moment from "moment";
import toast from "react-hot-toast";

export default function Transfer({ page }) {
  const [outForm, setOutForm] = useState({ out_qty: 1 });
  const [stocks, setStocks] = useState([]);
  const [invoice, setInvoice] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const loggedUser = "Frank Edward";
    setUsername(loggedUser);
  }, []);

  const handleOutChange = ({ target: { name, value } }) => {
    setOutForm((p) => ({ ...p, [name]: value }));
  };

  const getStocks = useCallback(() => {
    _get(
      "get/menu",
      (resp) => {
        if (resp.success) {
          setStocks(resp.data);
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
    _post(
      `insert-${page ? "vibe" : "vip"}?query_type=create_output`,
      { ...outForm },
      (resp) => {
        // toast.success(resp.message);
        setInvoice([...invoice, outForm]);
        setOutForm({ out_qty: 1 , menu: "", item_price: 0 , payment_method:""});
        setShowInvoice(true);
      },
      (err) => {
        toast.error(err.message);
      }
    );
  };

  const deleteItem = (index) => {
    const newInvoice = [...invoice];
    newInvoice.splice(index, 1);
    setInvoice(newInvoice);
  };

  const printInvoice = () => {
    const printContent = document.getElementById("invoiceSection").innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  const totalSum = invoice.reduce(
    (sum, item) => sum + item.item_price * item.out_qty,
    0
  );

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {moment().format("DD-MM-YYYY")}
      <div className="grid auto-rows-min gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="font-medium text-3xl">
            {page || "Kitchen"} Transfer
          </CardHeader>
          <CardContent className="px-2 pb-2">
            <form onSubmit={handleOutSubmit}>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className="w-full max items-center gap-1.5 md:grid-cols-2">
                  <Label htmlFor="item_name">Select Menu</Label>
                  <Select
                    // value={outForm.menu}
                    onValueChange={(value) => {
                      const { menu_name, menu_price } = JSON.parse(value);
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
                      <SelectValue placeholder="Select Menu to Transfer" />
                    </SelectTrigger>
                    <SelectContent>
                      {stocks.map((stock) => (
                        <SelectItem
                          key={stock.id}
                          // value={stock.menu_name}
                          value={JSON.stringify({
                            menu_name: stock.menu_name,
                            menu_price: stock.menu_price,
                          })}
                        >
                          {stock.menu_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className="w-full max items-center gap-1.5 md:grid-cols-2">
                  <Label htmlFor="cost">Collectors Name</Label>
                  <Input
                    onChange={handleOutChange}
                    name="collectors_name"
                    type="text"
                    id="collectors_name"
                    value={outForm.collectors_name}
                    required
                    placeholder="Name Of Collector"
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className="w-full max items-center gap-1.5 md:grid-cols-2">
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
                <div className="w-full max items-center gap-1.5 md:grid-cols-2">
                  <Label htmlFor="method_of_payment">Destination</Label>
                  <Select
                    value={outForm.payment_method}
                    onValueChange={(value) =>
                      setOutForm((p) => ({ ...p, payment_method: value }))
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
                </div>
              </div>

              {/* <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className="w-full max items-center gap-1.5 md:grid-cols-2">
                  <Label htmlFor="discount">Discount (if applicable)</Label>
                  <Input
                    onChange={handleOutChange}
                    name="discount"
                    type="number"
                    id="discount"
                    value={outForm.discount}
                    placeholder="Discount"
                  />
                </div>
              </div> */}

              <div className="flex flex-1 justify-center flex-row gap-4 p-4 pt-0">
                <Button type="submit">Transfer</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* {showInvoice && (
          <div id="invoiceSection">
            <Card>
              <CardHeader className="font-medium text-3xl">Invoice</CardHeader>
              <CardContent className="px-2 pb-2">
                <div className="mb-4 text-lg font-semibold">
                  Issued by: {username}
                </div>
                <table className="min-w-full mt-4 border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border">Menu</th>
                      <th className="px-4 py-2 border">Price</th>
                      <th className="px-4 py-2 border">Quantity</th>
                      <th className="px-4 py-2 border">Total</th>
                      <th className="px-4 py-2 border">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 border">{item.menu}</td>
                        <td className="px-4 py-2 border">{item.item_price}</td>
                        <td className="px-4 py-2 border">{item.out_qty}</td>
                        <td className="px-4 py-2 border">
                          {item.item_price * item.out_qty}
                        </td>
                        <td className="px-4 py-2 border">
                          <Button
                            onClick={() => deleteItem(index)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="3" className="px-4 py-2 border font-bold">
                        Total
                      </td>
                      <td className="px-4 py-2 border font-bold">{totalSum}</td>
                      <td className="px-4 py-2 border"></td>
                    </tr>
                  </tbody>
                </table>

                <div className="flex justify-center mt-4">
                  <Button onClick={printInvoice}>Print Now</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )} */}
      </div>
    </div>
  );
}
