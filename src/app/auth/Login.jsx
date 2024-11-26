import { useContext, useState } from "react";
// import { useLocation } from "react-router";
// import { useDispatch } from "react-redux";
// import { login } from "../../../redux/actions/auth";
// import cover from "../../../assets/hands2.jpg";
// import "./Login.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, replace, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader } from "lucide-react";
import { AuthContext } from "./Context";
import { server_url } from "@/lib/Helper";
import toast from "react-hot-toast";
// import { Card } from "@/components/ui/card";

export default function Login() {
  //   const dispatch = useDispatch();
  const initForm = {
    email: "",
    password: "",
  };
  const [form, setForm] = useState(initForm);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useNavigate();
  const { user, setUser, token, setToken } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login");
    fetch(`${server_url}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((raw) => raw.json())
      .then((data) => {
        console.log(data, "data of user");
        if (data.success) {
          toast.success(" You are successfully logedin");
          setUser(data.user);
          setToken(data.token);
          history("/dashboard");
          // history("/in-out");
        } else {
          console.log(data);
          toast.error(data.username);
          //  setError(data);
        }
      })
      .catch((err) => {
        console.error(err, "rtyui");
      });
  };
  const handleChange = ({ target: { value, name } }) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen w-full">
      {/* <div
        className="lg:w-3/6 bg-cover bg-center hidden lg:block"
        style={{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) ),url(${cover})`,
        }}
        role="img"
        aria-label="Background image of a desk with a laptop and coffee"
      >
        <div className="title-wrap flex flex-col items-center">
          <h3 className="bits-head">BitCoops</h3>
          <p className="mb-4">Automated cooperative society system</p>
          <input
            type="submit"
            onClick={() => history("/auth/sign-up")}
            className="goto"
            name=""
            value={`Goto Signup`}
          />
        </div>
      </div> */}
      <div className="flex-1 flex items-center justify-center p-10 bg-black text-white">
        {/* <Card> */}

        <div className="w-full max-w-md space-y-8 animate__animated animate__bounceIn">
          <div className="space-y-2 text-center">
            <h1 className="text-4xl font-bold text-white">Log In </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your information to login
            </p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4 ">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                className="border-2 border- focus:ring-[#4267B2] focus:border-[#4267B2]"
                id="email"
                name="username"
                placeholder="m@example.com"
                required
                type="email"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  className="border-2 border- focus:ring-primary focus:border-primary pr-10"
                  id="password"
                  name="password"
                  required
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 rounded-r border-0 right-0 px-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-white" />
                  ) : (
                    <Eye className="h-5 w-5 text-white" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <Button
                className="w-full text-black text-lg p-1"
                type="submit"
                disabled={loading}
                variant="outline"
                size="xl"
                // onClick={(e) => {
                //   e.preventDefault();
                //   history(`/in-out`);
                // }}
              >
                {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                Login
              </Button>
            </div>
          </form>
          {errorMessage && errorMessage !== "" && (
            <p className="text-danger text-center">{errorMessage}</p>
          )}
          <div className="mt-4 text-center text-sm">
            <Link to="/auth/login" className="underline">
              Forget Password?
            </Link>
          </div>
          {/* <div className="mt-1 text-center text-sm">
            New Cooperative {"  "}
            <Link to="/auth/sign-up" className="underlie">
              Register Here?
            </Link>
          </div> */}
        </div>
        {/* </Card> */}
      </div>
    </div>
  );
}
