import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
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
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatNumber1, _get } from "@/lib/Helper";
// import moment from "moment";
import { useEffect, useState } from "react";

export default function AdminReport() {
  const [stocks, setStocks] = useState([]);
  const getStocks = () => {
    _get(
      "admin/report",
      (resp) => {
        console.log(resp, "start");
        if (resp.success) {
          setStocks(resp.result);
          //   alert(resp.data);
        }
      },
      (err) => console.error(err.message)
    );
  };
  useEffect(() => {
    getStocks();
  }, []);

  const calculateRowTotal = (row) => {
    if (!row) return 0;
    return ["pos", "transfer", "cash", "ceo", "damage", "room"].reduce(
      (acc, field) => acc + Number(row[field] || 0),
      0
    );
  };

  // const grandTotal = reportInput.reduce(
  //   (acc, entry) => acc + calculateRowTotal(entry.id),
  //   0
  // );

  const calculateColumnTotal = (field) => {
    return stocks.reduce((acc, row) => acc + (Number(row[field]) || 0), 0);
  };

  return (
    <Card className="pt-3">
      <CardContent>
        <Table>
          <TableCaption>Report</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-">Id</TableHead>
              <TableHead className="text-">Staff Name</TableHead>
              <TableHead className="text-center">Role</TableHead>
              <TableHead className="text-center">Pos</TableHead>
              <TableHead className="text-center">Transfer</TableHead>
              <TableHead className="text-center">Cash</TableHead>
              <TableHead className="text-center">Ceo</TableHead>
              <TableHead className="text-center">Damage</TableHead>
              <TableHead className="text-center">Room</TableHead>
              <TableHead className="text-center">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stocks.map((invoice, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell>{invoice.name}</TableCell>
                <TableCell className="text-center">Staff</TableCell>
                <TableCell className="text-center">{invoice.pos}</TableCell>
                <TableCell className="text-center">
                  {invoice.transfer}
                </TableCell>
                <TableCell className="text-center">{invoice.cash}</TableCell>
                <TableCell className="text-center">{invoice.ceo}</TableCell>
                <TableCell className="text-center">{invoice.damage}</TableCell>
                <TableCell className="text-center">{invoice.room}</TableCell>
                <TableCell className="text-center font-bold ">
                  {formatNumber1(calculateRowTotal(invoice))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="font-bold text-center" colSpan={3}>
                Total
              </TableCell>
              <TableCell className="font-bold text-center">
                {formatNumber1(calculateColumnTotal("pos"))}
              </TableCell>
              <TableCell className="font-bold text-center">
                {formatNumber1(calculateColumnTotal("transfer"))}
              </TableCell>
              <TableCell className="font-bold text-center">
                {formatNumber1(calculateColumnTotal("cash"))}
              </TableCell>
              <TableCell className="font-bold text-center">
                {formatNumber1(calculateColumnTotal("ceo"))}
              </TableCell>
              <TableCell className="font-bold text-center">
                {formatNumber1(calculateColumnTotal("damage"))}
              </TableCell>
              <TableCell className="font-bold text-center">
                {formatNumber1(calculateColumnTotal("room"))}
              </TableCell>
              <TableCell className="font-bold text-center">
                {formatNumber1(
                  ["pos", "transfer", "cash", "ceo", "damage", "room"].reduce(
                    (acc, field) => acc + calculateColumnTotal(field),
                    0
                  )
                )}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        <div className="flex justify-end">
          <Button>Print</Button>
        </div>
      </CardContent>
    </Card>
  );
}
