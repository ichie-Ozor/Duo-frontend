import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { _post } from "@/lib/Helper";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function Menus() {
  const [showPassword, setShowPassword] = useState(false);
  const [menuForm, setMenuForm] = useState({});
  const [staffForm, setStaffForm] = useState({
    name: "",
    username: "",
    email: "",
    role: "staff",
    status: "active",
    phone: "",
    account_type: "",
    accessTo: "",
    password: "",
  });
  const handleMenuChange = ({ target: { name, value } }) => {
    console.log(name, value);
    setMenuForm((p) => ({ ...p, [name]: value }));
  };
  const handleStaffChange = ({ target: { name, value } }) => {
    console.log(name, value);
    setStaffForm((p) => ({ ...p, [name]: value }));
  };

  const handleMenuSubmit = (e) => {
    e.preventDefault();
    _post(
      `insert-menu`,
      menuForm,
      (resp) => {
        console.log(resp);
        toast.success(resp.message);
      },
      (err) => {
        console.error(err);
      }
    );
    console.log(menuForm);
    //   if (menuForm.destination) {
    //     _post(
    //       `stores?query_type=create_output`,
    //       { ...menuForm },
    //       (resp) => {
    //         alert(resp);
    //       },
    //       (err) => {
    //         alert(err);
    //       }
    //     );
    //   }
  };
  const handleCreateStaff = (e) => {
    e.preventDefault();
    _post(
      `users/create`,
      staffForm,
      (resp) => {
        if (resp.success) {
          toast.success(resp.message);
        } else if (resp.email) {
          toast.error(resp.email);
        } else {
          toast.error(resp.message);
        }
      },
      (err) => {
        toast.error(err);
      }
    );
    console.log(staffForm);
    setStaffForm({
      name: "",
      username: "",
      email: "",
      role: "staff",
      status: "active",
      phone: "",
      account_type: "",
      accessTo: "",
      password: "",
    });
  };
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="font-medium text-3xl">Setup Menus</CardHeader>
          <CardContent className="px-2 pb-2">
            <form onSubmit={handleMenuSubmit}>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2 ">
                  <Label htmlFor="menu_name">Menu</Label>
                  {/* <Select>
                    <SelectTrigger
                      id="gender"
                      className="border-2 border-[#4267B2] focus:ring-[#4267B2] focus:border-[#4267B2]"
                    >
                      <SelectValue placeholder="Select Item" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Rice</SelectItem>
                      <SelectItem value="female">Chicken</SelectItem>
                      <SelectItem value="other">Drinks</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select> */}
                  <Input
                    onChange={handleMenuChange}
                    name="menu_name"
                    type="text"
                    id="menu_name"
                    required
                    placeholder="Menu Name"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2">
                  <Label htmlFor="sub_menu">Sub Menu</Label>
                  <Textarea
                    onChange={handleMenuChange}
                    name="sub_menu"
                    type="text"
                    id="sub_menu"
                    placeholder="sub Menu"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2">
                  <Label htmlFor="menu_price">Price</Label>
                  <Input
                    onChange={handleMenuChange}
                    name="menu_price"
                    type="number"
                    id="menu_price"
                    required
                    placeholder="Price"
                  />
                </div>
              </div>
              {/* <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2 ">
                  <Label htmlFor="date">Date</Label>
                  <input
                    className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    onChange={handleMenuChange}
                    name="date_of_collection"
                    type="date"
                    id="date"
                    placeholder="Item Name"
                  />
                </div>
              </div> */}

              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2 ">
                  <Label htmlFor="method_of_payment">Discount Type</Label>
                  <Select
                    onValueChange={(value) =>
                      setMenuForm((p) => ({ ...p, discount_type: value }))
                    }
                  >
                    <SelectTrigger
                      id="discount"
                      className="border-2 border-[#4267B2] focus:ring-[#4267B2] focus:border-[#4267B2]"
                    >
                      <SelectValue placeholder="Select Discount Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pecentage">Pecentage</SelectItem>
                      <SelectItem value="fixed">Fixed</SelectItem>
                      {/* <SelectItem value="transfer">Transfer</SelectItem> */}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2">
                  <Label htmlFor="discount_amount">Discount</Label>
                  <Input
                    onChange={handleMenuChange}
                    name="discount_amount"
                    type="number"
                    id="discount_acout"
                    placeholder="Discount Amount"
                  />
                </div>
              </div>
              <div className="flex flex-1 justify-center flex-row gap-4 p-4 pt-0">
                <Button>Submit</Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="font-medium text-3xl">Setup Staff</CardHeader>
          <CardContent className="px-2 pb-2">
            <form onSubmit={handleCreateStaff}>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2 ">
                  <Label htmlFor="item_name">Staff Name</Label>
                  <Input
                    onChange={handleStaffChange}
                    name="name"
                    type="text"
                    id="staff"
                    value={staffForm.name}
                    placeholder="Staff Name"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2 ">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    onChange={handleStaffChange}
                    name="username"
                    type="text"
                    id="username"
                    value={staffForm.username}
                    placeholder="Username"
                  />
                </div>
              </div>
              {/* <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2">
                  <Label htmlFor="cost">Role</Label>
                  <Input
                    onChange={handleStaffChange}
                    name="role"
                    type="text"
                    id="role"
                    value={staffForm.role}
                    placeholder="Staff Role"
                  />
                </div>
              </div> */}
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2">
                  <Label htmlFor="price">Email</Label>
                  <Input
                    onChange={handleStaffChange}
                    name="email"
                    type="email"
                    id="email"
                    value={staffForm.email}
                    placeholder="Staff Email"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    onChange={handleStaffChange}
                    name="phone"
                    type="number"
                    id="phone"
                    value={staffForm.phone}
                    placeholder="Staff Phone Number"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2 ">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      className="border-2 border- pr-10"
                      id="password"
                      name="password"
                      placeholder="Password"
                      required
                      value={staffForm.password}
                      type={showPassword ? "text" : "password"}
                      onChange={handleStaffChange}
                    />
                    <Button
                      type="button"
                      className="absolute inset-y-0 rounded-r border-0 right-0 px-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-white" />
                      ) : (
                        <Eye className="h-5 w-5 text-white" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-row gap-4 p-4 pt-0">
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2 ">
                  <Label htmlFor="method_of_payment">Access To</Label>
                  <select
                    className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 border-2 border-[#4267B2] focus:ring-[#4267B2] focus:border-[#4267B2]"
                    onChange={(e) =>
                      setStaffForm((p) => ({ ...p, accessTo: e.target.value }))
                    }
                    value={staffForm.accessTo}
                  >
                    <option>---Staff Access ---</option>
                    <option value={"store"}>Store</option>
                    <option value={"vip"}>Vip</option>
                    <option value={"vibe"}>Vibe</option>
                    <option value={"kitchen"}>Kitchen</option>
                    <option value={"manager"}>Manager</option>
                  </select>
                  {/* <Select
                    // selected={staffForm.accessTo}
                    onValueChange={(value) => {
                      setStaffForm((p) => ({ ...p, accessTo: value }));
                    }}
                  >
                    <SelectTrigger
                      id="access"
                      className="border-2 border-[#4267B2] focus:ring-[#4267B2] focus:border-[#4267B2]"
                    >
                      <SelectValue placeholder="Staff access" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="store">Store</SelectItem>
                      <SelectItem value="vip">Vip</SelectItem>
                      <SelectItem value="vibe">Vibe</SelectItem>
                      <SelectItem value="kitchen">Kitchen</SelectItem>
                    </SelectContent>
                  </Select> */}

                  {/* <input
                    className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    onChange={handleStaffChange}
                    name="destination"
                    type="text"
                    id="date"
                    placeholder="Destination"
                  /> */}
                </div>
                <div className=" w-full max items-center gap-1.5 md:grid-cols-2">
                  <Label htmlFor="cost">Role</Label>
                  <Input
                    onChange={handleStaffChange}
                    name="role"
                    type="text"
                    id="role"
                    value={staffForm.role}
                    placeholder="Staff Role"
                  />
                </div>
              </div>
              <div className="flex flex-1 justify-center flex-row gap-4 p-4 pt-0">
                <Button>Submit</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
}
