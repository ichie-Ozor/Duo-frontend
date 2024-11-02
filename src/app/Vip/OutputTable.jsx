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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { _get } from "@/lib/Helper";
import moment from "moment";
import { useEffect, useState } from "react";


export default function VipOutputTable() {
      const [stocks, setStocks] = useState([]);
      const getStocks = () => {
        _get(
          `get/outstocks`,
          (resp) => {
            if (resp.success) {
              setStocks(resp.data);
            //   alert(resp.data);
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
              <TableCaption>Vip</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] text-">Id</TableHead>
                  <TableHead className="text-">Item Name</TableHead>
                  <TableHead className="text-">Date</TableHead>
                  <TableHead className="text-">Quantity</TableHead>
                  <TableHead className="text-right">Collector</TableHead>
                  <TableHead className="text-right">Giver</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stocks
                  .filter((item) => item.destination === "vip")
                  .map((invoice, idx) => (
                    <TableRow key={invoice.idx}>
                      <TableCell className="font-medium">
                        {idx + 1}
                      </TableCell>
                      <TableCell>{invoice.item_name}</TableCell>
                      <TableCell>{moment().format("YYYY-MM-DD")}</TableCell>
                      <TableCell>{invoice.out_qty}</TableCell>
                      <TableCell className="text-right">
                        {invoice.name_of_collector}
                      </TableCell>
                      <TableCell className="text-right">
                        {invoice.name_of_giver}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter></TableFooter>
            </Table>
          </CardContent>
        </Card>
    
  );
}
