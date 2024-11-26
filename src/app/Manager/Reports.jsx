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
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function ManagerReport() {
  const [stocks, setStocks] = useState([]);
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
    return ["pos", "transfer", "cash", "ceo", "damage", "room"].reduce(
      (acc, field) => acc + row[field],
      0
    );
  };

  const grandTotal = reportInput.reduce(
    (acc, entry) => acc + calculateRowTotal(entry.id),
    0
  );

  const calculateColumnTotal = (field) => {
    return reportInput.reduce((acc, entry) => acc + entry[field], 0);
  };

  const onSubmitHandler = () => {
    const updatedReportInput = reportInput.map((entry) => ({
      ...entry,
      name: stocks.find((s) => s.id === entry.id)?.name,
    }));
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
    setReportInput(
      stocks.map((stock) => ({
        id: stock.id,
        pos: 0,
        transfer: 0,
        cash: 0,
        ceo: 0,
        damage: 0,
        room: 0,
      }))
    );
  };

  const updatedStocks = stocks.map((stock, index) => ({
    id: index + 1,
    ...stock,
  }));
  return (
    <Card className="pt-3">
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
              <TableHead className="text-center">Transfer</TableHead>
              <TableHead className="text-center">Cash</TableHead>
              <TableHead className="text-center">CEO</TableHead>
              <TableHead className="text-center">Damage</TableHead>
              <TableHead className="text-center">Room</TableHead>
              <TableHead className="text-center">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {updatedStocks.map((stock, index) => (
              <TableRow key={stock.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell className="font-bold text-[18px]">
                  {stock.name}
                </TableCell>
                {["pos", "transfer", "cash", "ceo", "damage", "room"].map(
                  (field) => (
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
                  )
                )}
                <TableCell className="text-right">
                  {formatNumber1(calculateRowTotal(stock.id))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2} className="font-semibold text-right">
                Total
              </TableCell>
              {["pos", "transfer", "cash", "ceo", "damage", "room"].map(
                (field) => (
                  <TableCell key={field} className="text-center font-semibold">
                    {formatNumber1(calculateColumnTotal(field))}
                  </TableCell>
                )
              )}
              <TableCell className="text-right font-semibold">
                {formatNumber1(grandTotal)}
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
