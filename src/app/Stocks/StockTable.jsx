import { Card, CardContent } from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import { _get } from "@/lib/Helper";
import { useEffect, useState } from "react";


export function StockTable() {
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
  return (
    <Card className="pt-3">
      <CardContent>
        <Table>
          <TableCaption>A list of stocks in Kitchen.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-">Invoice</TableHead>
              <TableHead className="text-">Item Name</TableHead>
              <TableHead className="text-">Date</TableHead>
              <TableHead className="text-">Quantity</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stocks.map((stock, idx) => (
              <TableRow key={stock.invoice}>
                <TableCell className="font-medium">{stock.invoice}</TableCell>
                <TableCell>{stock.item_name}</TableCell>
                <TableCell>{moment().format("YYYY-MM-DD")}</TableCell>
                <TableCell>{stock.in_qty}</TableCell>
                <TableCell className="text-right">
                  {stock.item_cost}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant={
                      stock.in_qty < 5 ? "destructive" : ""
                    }
                  >
                    {stock.in_qty < 5 ? "Critical" : "Normal"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            {/* <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow> */}
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
