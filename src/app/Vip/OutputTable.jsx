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
import { AuthContext } from "../auth/Context";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { _get } from "@/lib/Helper";
import moment from "moment";
import { useCallback, useEffect, useState, useContext } from "react";

export default function VipOutputTable({ page }) {
  const [stocks, setStocks] = useState([]);
  const { user } = useContext(AuthContext);
  const getStocks = useCallback(() => {
    _get(
      `get/out-${page || "vip"}`,
      (resp) => {
        if (resp.success) {
          console.log(resp.data, "stock here");
          setStocks(resp.data);
          //   alert(resp.data);
        }
      },
      (err) => console.error(err.message)
    );
  }, [page]);
  useEffect(() => {
    getStocks();
  }, [getStocks]);
  return (
    <Card className="pt-3">
      <CardContent>
        <Table>
          <TableCaption>Vip</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-">Id</TableHead>
              <TableHead className="text-">Menu</TableHead>
              <TableHead className="text-">Date</TableHead>
              <TableHead className="text-">Quantity</TableHead>
              <TableHead className="text-right">Discount</TableHead>
              <TableHead className="text-right">Payment Method</TableHead>
              <TableHead className="text-right">Staff</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stocks.map((invoice, idx) => (
              <TableRow key={invoice.idx}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell>{invoice.menu}</TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.out_qty}</TableCell>
                <TableCell className="text-right">
                  {page === "vip"
                    ? invoice.vip_discount || 0
                    : invoice.vibe_discount || 0}
                </TableCell>
                <TableCell className="text-right">
                  {invoice.payment_method}
                </TableCell>
                <TableCell className="text-right">{invoice.staff}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
