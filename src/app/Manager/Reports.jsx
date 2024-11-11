// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { _get } from "@/lib/Helper";
// import moment from "moment";
// import { useEffect, useState } from "react";

// export default function ManagerReport() {
//   const [stocks, setStocks] = useState([
//     { name: "john doe" },
//     { name: "Betty" },
//     { name: "Charles" },
//   ]);
//   const [reportInput, setReportInput] = useState({
//     pos: "",
//     transfer: "",
//     cash: "",
//     ceo: "",
//     damage: "",
//     room: "",
//   });

//   const onInputChange = (e) => {
//     e.preventDefault();
//     const { name, value } = e.target;
//     setReportInput({
//       ...reportInput,
//       [name]: value,
//     });
//   };

//   const eachTotal =
//     Number(reportInput.pos) +
//     Number(reportInput.transfer) +
//     Number(reportInput.cash) +
//     Number(reportInput.ceo) +
//     Number(reportInput.damage) +
//     Number(reportInput.room);
//   console.log(reportInput, "inputs", typeof eachTotal);

//   const reducerFunction = (x, y, z) => {};
//   return (
//     <Card className="pt-3">
//       <CardContent>
//         <Table>
//           <TableCaption>Report</TableCaption>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[100px] text-">Id</TableHead>
//               <TableHead className="text-">Staff Name</TableHead>
//               {/* <TableHead className="text-center">Role</TableHead> */}
//               <TableHead className="text-center">Pos</TableHead>
//               <TableHead className="text-center">Transfer</TableHead>
//               <TableHead className="text-center">Cash</TableHead>
//               <TableHead className="text-center">CEO</TableHead>
//               <TableHead className="text-center">Damage</TableHead>
//               <TableHead className="text-center">Room</TableHead>
//               <TableHead className="text-center">Total</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {stocks.map((invoice, idx) => (
//               <TableRow key={invoice.idx}>
//                 <TableCell className="font-medium">{idx + 1}</TableCell>
//                 <TableCell>{invoice.name}</TableCell>
//                 {/* <TableCell>Staff</TableCell> */}
//                 <TableCell>
//                   <Input
//                     type="number"
//                     name="pos"
//                     value={reportInput.pos}
//                     onChange={onInputChange}
//                   />
//                 </TableCell>
//                 <TableCell className="text-right">
//                   <Input
//                     type="number"
//                     name="transfer"
//                     value={reportInput.transfer}
//                     onChange={onInputChange}
//                   />
//                 </TableCell>
//                 <TableCell className="text-right">
//                   <Input
//                     type="number"
//                     name="cash"
//                     value={reportInput.cash}
//                     onChange={onInputChange}
//                   />
//                 </TableCell>
//                 <TableCell className="text-right">
//                   <Input
//                     type="number"
//                     name="ceo"
//                     value={reportInput.ceo}
//                     onChange={onInputChange}
//                   />
//                 </TableCell>
//                 <TableCell className="text-right">
//                   <Input
//                     type="number"
//                     name="damage"
//                     value={reportInput.damage}
//                     onChange={onInputChange}
//                   />
//                 </TableCell>
//                 <TableCell className="text-right">
//                   <Input
//                     type="number"
//                     name="room"
//                     value={reportInput.room}
//                     onChange={onInputChange}
//                   />
//                 </TableCell>
//                 <TableCell className="text-right">
//                   {/* <Input /> */}
//                   <div className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
//                     {eachTotal}
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//           <TableFooter>
//             <TableRow>
//               <TableCell className="text-right">Total</TableCell>
//               <TableCell className="text-right">Total</TableCell>
//               <TableCell className="text-right">Total</TableCell>
//               <TableCell className="text-right">Total</TableCell>
//               <TableCell className="text-right">Total</TableCell>
//               <TableCell className="text-right">Total</TableCell>
//               <TableCell className="text-right">Total</TableCell>
//               <TableCell className="text-right">Total</TableCell>
//             </TableRow>
//           </TableFooter>
//         </Table>
//         <div className="flex justify-end">
//           <Button>Submit</Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
/////////////////////////////////////////////////////////////////////////
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useState } from "react";

// export default function ManagerReport() {
//   const [stocks, setStocks] = useState([
//     { id: 1, name: "john doe" },
//     { id: 2, name: "Betty" },
//     { id: 3, name: "Charles" },
//   ]);

//   const [reportInput, setReportInput] = useState(
//     stocks.reduce((acc, stock) => {
//       acc[stock.id] = {
//         pos: 0,
//         transfer: 0,
//         cash: 0,
//         ceo: 0,
//         damage: 0,
//         room: 0,
//       };
//       return acc;
//     }, {})
//   );

//   const onInputChange = (e, id) => {
//     const { name, value } = e.target;
//     setReportInput((prev) => ({
//       ...prev,
//       [id]: {
//         ...prev[id],
//         [name]: Number(value),
//       },
//     }));
//   };

//   const calculateRowTotal = (id) => {
//     const values = Object.values(reportInput[id]);
//     return values.reduce((acc, num) => acc + num, 0);
//   };

//   const grandTotal = Object.keys(reportInput).reduce(
//     (acc, id) => acc + calculateRowTotal(id),
//     0
//   );

//   return (
//     <Card className="pt-3">
//       <CardContent>
//         <Table>
//           <TableCaption>Report</TableCaption>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[100px]">Id</TableHead>
//               <TableHead>Staff Name</TableHead>
//               <TableHead className="text-center">Pos</TableHead>
//               <TableHead className="text-center">Transfer</TableHead>
//               <TableHead className="text-center">Cash</TableHead>
//               <TableHead className="text-center">CEO</TableHead>
//               <TableHead className="text-center">Damage</TableHead>
//               <TableHead className="text-center">Room</TableHead>
//               <TableHead className="text-center">Total</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {stocks.map((stock) => (
//               <TableRow key={stock.id}>
//                 <TableCell className="font-medium">{stock.id}</TableCell>
//                 <TableCell>{stock.name}</TableCell>
//                 {["pos", "transfer", "cash", "ceo", "damage", "room"].map(
//                   (field) => (
//                     <TableCell key={field} className="text-right">
//                       <Input
//                         type="number"
//                         name={field}
//                         value={reportInput[stock.id][field]}
//                         onChange={(e) => onInputChange(e, stock.id)}
//                       />
//                     </TableCell>
//                   )
//                 )}
//                 <TableCell className="text-right">
//                   {calculateRowTotal(stock.id)}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//           <TableFooter>
//             <TableRow>
//               <TableCell colSpan={7} className="text-right font-semibold">
//                 Grand Total
//               </TableCell>
//               <TableCell className="text-right font-semibold">
//                 {grandTotal}
//               </TableCell>
//             </TableRow>
//           </TableFooter>
//         </Table>
//         <div className="flex justify-end">
//           <Button>Submit</Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
/////////////////////////////////////////////////////////////
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
  const [stocks, setStocks] = useState([
    { id: 1, name: "john doe" },
    { id: 2, name: "Betty" },
    { id: 3, name: "Charles" },
    { id: 4, name: "Chiwendu" },
  ]);

  ///////////////////////////////dont delete//////////////////////////////////////////
  // const getStocks = () => {
  //   _get(
  //     `get/outstocks`,
  //     (resp) => {
  //       if (resp.success) {
  //         console.log(resp.data, "fetched from the backend");
  //         // setStocks(resp.data);
  //       }
  //     },
  //     (err) => console.error(err.message)
  //   );
  // };
  // useEffect(() => {
  //   getStocks();
  // }, []);
  ////////////////////////////////////////////////////////////////////////////////

  const [reportInput, setReportInput] = useState(
    stocks.reduce((acc, stock) => {
      acc[stock.id] = {
        pos: 0,
        transfer: 0,
        cash: 0,
        ceo: 0,
        damage: 0,
        room: 0,
      };
      return acc;
    }, {})
  );

  const onInputChange = (e, id) => {
    const { name, value } = e.target;
    setReportInput((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [name]: Number(value),
      },
    }));
  };

  const calculateRowTotal = (id) => {
    console.log(reportInput[id], "report input");
    const values = Object.values(reportInput[id]);
    return values.reduce((acc, num) => acc + num, 0);
  };

  // const grandTotal = Object.keys(reportInput).reduce(
  //   (acc, id) => acc + calculateRowTotal(id),
  //   0
  // );

  // const grandTotal = stocks.reduce((acc, stock) => {
  //   return acc + calculateRowTotal(stock.id);
  // }, 0);

  // Calculate column totals
  const calculateColumnTotal = (field) => {
    return Object.keys(reportInput).reduce(
      (acc, id) => acc + reportInput[id][field],
      0
    );
  };

  ///////////////////////////this adds name to the object before sending to backend////////////////////////////////
  const updatedReportInput = { ...reportInput };
  stocks.forEach((item) => {
    if (updatedReportInput[item.id]) {
      updatedReportInput[item.id].name = item.name;
    }
  });

  const Total = Object.entries(updatedReportInput).forEach(([key, entry]) => {
    const grandTotal =
      entry.pos +
      entry.transfer +
      entry.cash +
      entry.ceo +
      entry.damage +
      entry.room;
    return grandTotal;
  });
  const onSubmitHandler = () => {
    console.log(reportInput, "report", updatedReportInput);
    _post(
      "manager/report",
      updatedReportInput,
      (resp) => {
        console.log(resp, "posted succefully");
        toast.success("Report posted successfully");
      },
      (err) => {
        toast.error(
          err.message || "Unable to post report now, try again later"
        );
      }
    );
  };
  return (
    <Card className="pt-3">
      <CardContent>
        <Table>
          <TableCaption>Report</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Staff Name</TableHead>
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
            {stocks.map((stock) => (
              <TableRow key={stock.id}>
                <TableCell className="font-medium">{stock.id}</TableCell>
                <TableCell>{stock.name}</TableCell>
                {["pos", "transfer", "cash", "ceo", "damage", "room"].map(
                  (field) => (
                    <TableCell key={field} className="text-right">
                      <Input
                        type="number"
                        name={field}
                        value={
                          reportInput[stock.id][field] === 0
                            ? ""
                            : reportInput[stock.id][field]
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
                Column Totals
              </TableCell>
              {["pos", "transfer", "cash", "ceo", "damage", "room"].map(
                (field) => (
                  <TableCell key={field} className="text-center font-semibold">
                    {formatNumber1(calculateColumnTotal(field))}
                  </TableCell>
                )
              )}
              <TableCell className="text-right font-semibold">
                {formatNumber1(Total)}
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
