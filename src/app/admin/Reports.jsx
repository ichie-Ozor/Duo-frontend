import { DatePicker } from "@/components/reuseables/DatePicker";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
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
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatNumber1, _get, _delete } from "@/lib/Helper";
import moment from "moment";
// import moment from "moment";
import { useEffect, useState } from "react";

export default function AdminReport() {
  const [stocks, setStocks] = useState([]);
  const [staff, setStaff] = useState([]);
  const [num, setNum] = useState(7);
  const [form, setForm] = useState({ date_from: "", date_to: "" });
  const [oweing, setOweing] = useState({ date_from: "", date_to: "" });
  const [ower, setOwer] = useState({
    name: "",
    amt: 0,
  });
  const [owerName, setOwerName] = useState("");
  const getStocks = () => {
    _get(
      "admin/report",
      (resp) => {
        console.log(resp, "start");
        if (resp.success) {
          setStocks(resp.response);
          //   alert(resp.data);
        }
      },
      (err) => console.error(err.message)
    );
    _get(
      "users",
      (resp) => {
        console.log(resp, "staffs fetche successfully");
        if (resp.success) {
          setStaff(resp.user);
        }
      },
      (err) => console.error(err.message)
    );
  };

  useEffect(() => {
    getStocks();
  }, []);

  console.log(staff, "staffs in full");

  const deleteHandler = (value) => {
    console.log(value, "deleting this staff");
    const deleteStaff = `Are you sure you want to delete ${value.name}?`;
    if (confirm(deleteStaff) === true) {
      _delete(
        `admin/deleteReport/${value.id}`,
        null,
        (resp) => {
          console.log(resp, "deleted items");
          const undeletedItem = staff.filter((t) => t.id !== value.id);
          setStaff(undeletedItem, "undeleted item selected");
        },
        (err) => console.error(err.message)
      );
    } else {
      return;
    }
  };
  const staffs = staff
    .map((item, index) => {
      return (
        <div
          key={item.id}
          // className="grid grid-cols-5 border border-gray-300  hover:border-gray-500"
          className={`grid grid-cols-3 space-x-2 md:grid-cols-5 pt-2 hover:bg-gray-50 ${
            index === staff.length - 1 ? "" : "border-b border-gray-300"
          }`}
        >
          <div className="md:col-span-2">{item.name}</div>
          <div className="md:col-span-2">{item.phone}</div>
          <button
            className="-mt-2 col-span-1 text-red-600 font-bold hover:bg-red-600 hover:text-white hover:border-none"
            onClick={() => deleteHandler(item)}
          >
            Delete
          </button>
        </div>
      );
    })
    .slice(0, num);
  const calculateRowTotal = (row) => {
    if (!row) return 0;
    return ["pos", "cash", "ceo", "damage", "room", "owe"].reduce(
      (acc, field) => acc + Number(row[field] || 0),
      0
    );
  };

  const calculateColumnTotal = (field) => {
    return stocks.reduce((acc, row) => acc + (Number(row[field]) || 0), 0);
  };

  const dateSearch = (event) => {
    event.preventDefault();
    const { date_from, date_to } = form;
    _get(
      `admin/reportRange?from=${date_from}&to=${date_to}`,
      (resp) => {
        console.log(resp, "inner");
        if (resp.success) {
          setStocks(resp.response);
        }
      },
      (err) => console.error(err.message)
    );
  };

  const oweDateSearch = (event) => {
    event.preventDefault();
    const { date_from, date_to } = oweing;
    _get(
      `admin/reportRange?from=${date_from}&to=${date_to}`,
      (resp) => {
        console.log(resp, "ower");
        if (resp.success) {
          let staff = resp.response;
          const filteredOwer = staff.filter(
            (item) => item.name.toLowerCase() === owerName.toLowerCase()
          );
          console.log(filteredOwer, "filtered");
          const t = filteredOwer.reduce((acc, curr) => acc + curr.oweing, 0);
          setOwer({
            name: owerName,
            amt: t,
          });
          console.log(t, "added", ower);
        }
      },
      (err) => console.error(err.message)
    );
  };

  function addScroll() {
    setNum((prev) => prev + 3);
  }
  function minusScroll() {
    setNum(7);
  }
  console.log(num, "owername", ower);
  return (
    <Card className="grid grid-cols-2 gap-3 p-2 bg-gray-200">
      <Card className="col-span-2 pt-3">
        <form
          className="grid grid-cols-5 gap-3 justify-self-end mx-2 w-1/2"
          onSubmit={dateSearch}
        >
          <div className="col-span-2">
            <Label>From</Label>
            <DatePicker
              date={form.date_from}
              setDate={(selectedDate) => {
                setForm((p) => ({
                  ...p,
                  date_from: moment(selectedDate).format("YYYY-MM-DD"),
                }));
              }}
              className="w-full"
            />
          </div>
          <div className="col-span-2">
            <Label>To</Label>
            <DatePicker
              date={form.date_to}
              setDate={(selectedDate) => {
                setForm((p) => ({
                  ...p,
                  date_to: moment(selectedDate).format("YYYY-MM-DD"),
                }));
              }}
              className="w-full"
            />
          </div>
          <button className="h-9 border-1 border-gray-400 self-end text-white bg-black">
            SEARCH
          </button>
        </form>
        <CardContent>
          <Table>
            <TableCaption>Report</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-">Id</TableHead>
                <TableHead className="text-">Staff Name</TableHead>
                <TableHead className="text-center">Role</TableHead>
                <TableHead className="text-center">Pos</TableHead>
                <TableHead className="text-center">Cash</TableHead>
                <TableHead className="text-center">CEO</TableHead>
                <TableHead className="text-center">Damage</TableHead>
                <TableHead className="text-center">Room</TableHead>
                <TableHead className="text-center">Owe</TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead className="text-center">Amount Paid</TableHead>
                <TableHead className="text-center">Oweing</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stocks.map((invoice, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{idx + 1}</TableCell>
                  <TableCell>{invoice.name}</TableCell>
                  <TableCell className="text-center">Staff</TableCell>
                  <TableCell className="text-center">
                    {formatNumber1(invoice.pos)}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatNumber1(invoice.cash)}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatNumber1(invoice.ceo)}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatNumber1(invoice.damage)}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatNumber1(invoice.room)}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatNumber1(invoice.owe)}
                  </TableCell>
                  <TableCell className="text-center font-bold ">
                    {formatNumber1(calculateRowTotal(invoice))}
                  </TableCell>
                  <TableCell className="text-center">{invoice.amt}</TableCell>
                  <TableCell className="text-center">
                    {invoice.oweing}
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
                {/* <TableCell className="font-bold text-center">
                {formatNumber1(calculateColumnTotal("transfer"))}
              </TableCell> */}
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
                  {formatNumber1(calculateColumnTotal("owe"))}
                </TableCell>
                <TableCell className="font-bold text-center">
                  {formatNumber1(
                    [
                      "pos",
                      "transfer",
                      "cash",
                      "ceo",
                      "damage",
                      "room",
                      "owe",
                    ].reduce(
                      (acc, field) => acc + calculateColumnTotal(field),
                      0
                    )
                  )}
                </TableCell>
                <TableCell className="font-bold text-center">
                  {formatNumber1(calculateColumnTotal("amt"))}
                </TableCell>
                <TableCell className="font-bold text-center">
                  {formatNumber1(calculateColumnTotal("oweing"))}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <div className="flex justify-end">
            <Button>Print</Button>
          </div>
        </CardContent>
      </Card>
      <Card className="p-4">
        {staffs}
        {num < staff.length ? (
          <div className="flex justify-center mt-2" onClick={addScroll}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="M480-200 240-440l56-56 184 183 184-183 56 56-240 240Zm0-240L240-680l56-56 184 183 184-183 56 56-240 240Z" />
            </svg>
          </div>
        ) : (
          <div className="flex justify-center mt-2" onClick={minusScroll}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="m296-224-56-56 240-240 240 240-56 56-184-183-184 183Zm0-240-56-56 240-240 240 240-56 56-184-183-184 183Z" />
            </svg>
          </div>
        )}
      </Card>
      <Card className="pt-3">
        <CardContent>
          <div className="grid justify-center">Staff Debt</div>
          <form
            className="grid grid-cols-1 gap-3 justify-self-center mx-2 w-1/2"
            onSubmit={oweDateSearch}
          >
            <div className="col-span-2">
              <Label>Enter Name</Label>
              <Input
                name="owerName"
                value={owerName}
                onChange={(e) => setOwerName(e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <Label>From</Label>
              <DatePicker
                date={oweing.date_from}
                setDate={(selectedDate) => {
                  setOweing((p) => ({
                    ...p,
                    date_from: moment(selectedDate).format("YYYY-MM-DD"),
                  }));
                }}
                className="w-full"
              />
            </div>
            <div className="col-span-2">
              <Label>To</Label>
              <DatePicker
                date={oweing.date_to}
                setDate={(selectedDate) => {
                  setOweing((p) => ({
                    ...p,
                    date_to: moment(selectedDate).format("YYYY-MM-DD"),
                  }));
                }}
                className="w-full"
              />
            </div>
            <button className="h-9 border-1 border-gray-400 self-end text-white bg-black">
              SEARCH
            </button>
          </form>
        </CardContent>
        <CardContent>
          {ower.name ? (
            ower.amt !== 0 ? (
              <div className="justify-self-center text-black font-bold border-red-100 border-2 p-2 rounded">{`${owerName} is owing ${ower.amt} for the period of ${oweing.date_from} to ${oweing.date_to}`}</div>
            ) : (
              <div className="justify-self-center text-black font-bold border-red-100 border-2 p-2 rounded">{`${owerName} is not owing for the period of ${oweing.date_from} to ${oweing.date_to}`}</div>
            )
          ) : null}
        </CardContent>
      </Card>
    </Card>
  );
}
