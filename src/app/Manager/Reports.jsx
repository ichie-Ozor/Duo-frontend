import { DatePicker } from "@/components/reuseables/DatePicker";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumber1, _get, _post } from "@/lib/Helper";
import moment from "moment";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ManagerReport() {
  const [stocks, setStocks] = useState([]);
  // const [amt, setAmt] = useState(0);
  const [reportInput, setReportInput] = useState([]);
  const getSaleStaff = () => {
    _get(
      "manager/getSaleStaff",
      (resp) => {
        console.log(resp.resp, "start");
        if (resp.success) {
          setStocks(resp.resp);
          setReportInput(
            resp.resp.map((stock) => ({
              id: stock.id,
              pos: 0,
              transfer: 0,
              cash: 0,
              ceo: 0,
              damage: 0,
              room: 0,
              amt: 0,
            }))
          );
        }
      },
      (err) => console.error(err.message)
    );
  };
  useEffect(() => {
    getSaleStaff();
  }, []);

  // const [reportInput, setReportInput] = useState(
  // stocks.map((stock) => ({
  //   id: stock.id,
  //   pos: 0,
  //   transfer: 0,
  //   cash: 0,
  //   ceo: 0,
  //   damage: 0,
  //   room: 0,
  // }))
  // );

  const onInputChange = (e, id) => {
    const { name, value } = e.target;
    setReportInput((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, [name]: Number(value) || 0 } : entry
      )
    );
  };

  const calculateRowTotal = (id) => {
    const row = reportInput.find((entry) => entry.id === id);
    if (!row) return 0;
    return ["pos", "cash", "ceo", "damage", "room"].reduce(
      (acc, field) => acc + row[field],
      0
    );
  };

  const calculateEachRowTotal = (id) => {
    const row = reportInput.find((entry) => entry.id === id);
    // const t = ["pos", "transfer", "cash", "ceo", "damage", "room"].reduce(
    //   (acc, field) => acc + row[field],
    //   0
    // );
    if (!row) return 0;
    const t = calculateRowTotal(id);
    return t - (row.amt || 0);
  };

  const grandTotal = reportInput.reduce(
    (acc, entry) => acc + calculateRowTotal(entry.id),
    0
  );

   const [form, setForm] = useState({ date_from: "" });
  // const grandAmtTotal = reportInput.reduce(
  //   (acc, entry) => acc + calculateEachRowTotal(entry.id),
  //   0
  // );

  const calculateColumnTotal = (field) => {
    return reportInput.reduce((acc, entry) => acc + entry[field], 0);
  };

  const calculateColumnAmtTotal = () => {
    // return ["amt", "Oweing"].reduce((acc, entry) => acc + entry[field], 0);
    return reportInput.reduce(
      (acc, entry) => acc + calculateEachRowTotal(entry.id),
      0
    );
  };

  const onSubmitHandler = () => {
    // const updatedReportInput = reportInput.map((entry) => ({
    //   ...entry,
    //   name: stocks.find((s) => s.id === entry.id)?.name,
    // }));
    const updatedReportInput = reportInput.map((entry) => {
      const stock = stocks.find((s) => s.id === entry.id);
      const total = calculateRowTotal(entry.id);
      const oweing = total - entry.amt;
      return {
        ...entry,
        name: stock?.name,
        total,
        oweing,
      };
    });
    console.log(updatedReportInput, "stock", reportInput);
    _post(
      "manager/report",
      updatedReportInput,
      (resp) => {
        console.log(resp, "posted successfully");
        toast.success("Report posted successfully");
      },
      (err) => {
        toast.error(
          err.message || "Unable to post report now, try again later"
        );
      }
    );
    // window.print();
    setReportInput(
      stocks.map((stock) => ({
        id: stock.id,
        pos: 0,
        transfer: 0,
        cash: 0,
        ceo: 0,
        damage: 0,
        room: 0,
        amt: 0,
      }))
    );
  };

  const updatedStocks = stocks.map((stock, index) => ({
    id: index + 1,
    ...stock,
  }));
  return (
    <Card className="pt-3">
      <div className="grid grid-cols-4 p-2">
<DatePicker  date={form.date_from}
            setDate={(selectedDate) => {
              setForm((p) => ({
                ...p,
                date_from: moment(selectedDate).format("YYYY-MM-DD"),
              }));
            }} />
      </div>
      <CardContent>
        <Table>
          <TableCaption>Report</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead className="font-bold text-[14px]">
                Staff Name
              </TableHead>
              <TableHead className="text-center">Pos</TableHead>
              {/* <TableHead className="text-center">Transfer</TableHead> */}
              <TableHead className="text-center">Cash</TableHead>
              <TableHead className="text-center">CEO</TableHead>
              <TableHead className="text-center">Damage</TableHead>
              <TableHead className="text-center">Room</TableHead>
              <TableHead className="text-center">Total</TableHead>
              <TableHead className="text-center">Amount Paid</TableHead>
              <TableHead className="text-center">Oweing</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {updatedStocks.map((stock, index) => (
              <TableRow key={stock.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-bold text-[18px]">
                  {stock.name}
                </TableCell>
                {["pos", "cash", "ceo", "damage", "room"].map((field) => (
                  <TableCell key={field} className="text-right">
                    <Input
                      type="number"
                      name={field}
                      value={
                        reportInput.find((entry) => entry.id === stock.id)?.[
                          field
                        ] || ""
                      }
                      onChange={(e) => onInputChange(e, stock.id)}
                    />
                  </TableCell>
                ))}
                <TableCell className="text-right">
                  {formatNumber1(calculateRowTotal(stock.id))}
                </TableCell>
                {/************/}
                <TableCell className="text-right">
                  <Input
                    type="number"
                    name="amt"
                    value={
                      reportInput.find((entry) => entry.id === stock.id)?.amt ||
                      ""
                    }
                    onChange={(e) => onInputChange(e, stock.id)}
                  />
                </TableCell>
                <TableCell className="text-right">
                  <Input
                    type="number"
                    name="oweing"
                    // readOnly
                    value={calculateEachRowTotal(stock.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
            {/*****************/}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} className="font-semibold text-right">
                Total
              </TableCell>
              {["pos", "cash", "ceo", "damage", "room"].map((field) => (
                <TableCell key={field} className="text-center font-semibold">
                  {formatNumber1(calculateColumnTotal(field))}
                </TableCell>
              ))}
              <TableCell className="text-right font-semibold">
                {formatNumber1(grandTotal)}
              </TableCell>
              {/**************/}
              {/* {["amt", "Oweing"].map((field) => (
                <TableCell key={field} className="text-center font-semibold">
                  {formatNumber1(calculateColumnAmtTotal(field))}
                </TableCell>
              ))} */}
              <TableCell className="text-right font-semibold">
                {formatNumber1(calculateColumnTotal("amt"))}
              </TableCell>
              <TableCell className="text-right font-semibold">
                {formatNumber1(calculateColumnAmtTotal())}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <div className="flex justify-end">
          <Button onClick={onSubmitHandler}>Submit</Button>
        </div>
      </CardContent>
    </Card>
  );
}
