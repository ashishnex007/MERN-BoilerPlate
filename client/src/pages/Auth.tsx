import { useState } from "react";
import axios from "axios"; // Import axios
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setToken } from "@/hooks/authSlice"; // Import the Redux action for setting token

const Auth = () => {
  const dispatch = useAppDispatch(); // Dispatch function from Redux
  const token = useAppSelector((state) => state.auth.token); // Selecting the auth token from Redux state

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  // Handle input changes for login form
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  // Handle input changes for signup form
  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...signupData, [e.target.id]: e.target.value });
  };

  // Handle login submission
  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", loginData);
      console.log(res);
      const result = res.data;

      if (res.status === 200) {
        console.log("Login successful", result);
        dispatch(setToken(result.token)); // Dispatch the token to Redux state
      } else {
        setError(result.error);
      }
    } catch (err: any) {
      console.error("Error during login:", err);
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    }
  };

  // Handle signup submission
  const handleSignup = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/signup", signupData);
      const result = res.data;

      if (res.status === 200) {
        console.log("Signup successful", result);
        dispatch(setToken(result.token)); // Dispatch the token to Redux state
      } else {
        setError(result.error);
      }
    } catch (err: any) {
      console.error("Error during signup:", err);
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Sign in</TabsTrigger>
          <TabsTrigger value="signup">Sign up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Sign in</CardTitle>
              <CardDescription>
                Please sign in with your email and password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="Enter your password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleLogin}>Sign in</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Sign up</CardTitle>
              <CardDescription>
                Please create an account by providing your details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={signupData.password}
                  onChange={handleSignupChange}
                  placeholder="Enter your password"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSignup}>Sign up</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </div>
  );
};

export default Auth;