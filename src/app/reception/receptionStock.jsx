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
import { useCallback, useEffect, useState } from "react";

export function ReceptionStock() {
  const [stocks, setStocks] = useState([]);
  const getStocks = useCallback(() => {
    _get(
      `get/out-reception`,
      (resp) => {
        console.log(resp, "reception stock");
        if (resp.success) {
          setStocks(resp.data);
          // alert(resp.data);
        }
      },
      (err) => console.error(err.message)
    );
  }, []);

  useEffect(() => {
    getStocks();
  }, [getStocks]);

  return (
    <Card className="pt-3">
      <CardContent>
        <Table>
          <TableCaption>A list of stocks in Reception</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-">Invoice</TableHead>
              <TableHead className="text-">Item Name</TableHead>
              <TableHead className="text-">Name of Collector</TableHead>
              <TableHead className="text-">Date</TableHead>
              <TableHead className="text-">Quantity</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stocks.map((stock, idx) => (
              <TableRow key={stock.invoice}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell>{stock.reception_item_name}</TableCell>
                <TableCell>{stock.reception_user_name}</TableCell>
                <TableCell>{moment().format("YYYY-MM-DD")}</TableCell>
                <TableCell>{stock.reception_item_qty}</TableCell>
                <TableCell className="text-right">
                  {stock.reception_item_price}
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant={stock.in_qty < 1 ? "destructive" : ""}>
                    {stock.reception_item_qty < 1 ? "Critical" : "Normal"}
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
