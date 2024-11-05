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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { _get } from "@/lib/Helper";
import moment from "moment";
import { useEffect, useState } from "react";

export default function AdminReport() {
  const [stocks, setStocks] = useState([{name:"john doe"}]);
//   const getStocks = () => {
//     _get(
//       `get/outstocks`,
//       (resp) => {
//         if (resp.success) {
//           setStocks(resp.data);
//           //   alert(resp.data);
//         }
//       },
//       (err) => console.error(err.message)
//     );
//   };
//   useEffect(() => {
//     getStocks();
//   }, []);
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
              <TableRow key={invoice.idx}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell>{invoice.name}</TableCell>
                <TableCell>Staff</TableCell>
                <TableCell>50,000</TableCell>
                <TableCell className="text-center">10,000</TableCell>
                <TableCell className="text-center"> 100,000</TableCell>
                <TableCell className="text-center">10,000</TableCell>
                <TableCell className="text-center">0</TableCell>
                <TableCell className="text-center">0</TableCell>
                <TableCell className="text-center">170,000</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
        <div className="flex justify-end">
          <Button>Print</Button>
        </div>
      </CardContent>
    </Card>
  );
}
