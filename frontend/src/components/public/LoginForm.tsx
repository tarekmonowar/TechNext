"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";

import { loginUserSchema } from "@/src/Types/ZodSchema";
import { ApiError } from "@/src/Types/apiTypes";
import { UserAPI } from "@/src/lib/api";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useState } from "react";

type LoginFormData = z.infer<typeof loginUserSchema>;

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("prefillUrl") || "";
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      const res = await UserAPI.login(data);

      if (!res.success) {
        toast.error(res.message || "Login failed");
        return;
      }

      await signIn("credentials", {
        email: res.data.email,
        role: res.data.role,
        redirect: false,
      });
      if (redirectUrl && res.data.role === "user") {
        router.push(`/dashboard?prefillUrl=${encodeURIComponent(redirectUrl)}`);
      } else if (res.data.role === "user") {
        router.push("/dashboard");
      } else if (res.data.role === "admin") {
        router.push("/admin/dashboard");
      }
    } catch (error) {
      const err = error as ApiError;

      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Demo credentials
  const userCreds = { email: "user@gmail.com", password: "User1234@" };
  const adminCreds = { email: "admin12@gmail.com", password: "Admin1234@" };

  const fillCredentials = (creds: typeof userCreds) => {
    form.setValue("email", creds.email);
    form.setValue("password", creds.password);
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Log In</CardTitle>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Link
            href={`/register${
              redirectUrl
                ? `?prefillUrl=${encodeURIComponent(redirectUrl)}`
                : ""
            }`}
            className="font-medium text-primary hover:underline"
          >
            Register
          </Link>
        </p>

        {/* Demo buttons */}
        <div className="mt-4 flex gap-4 justify-center">
          <Button variant="outline" onClick={() => fillCredentials(userCreds)}>
            Demo User
          </Button>
          <Button variant="outline" onClick={() => fillCredentials(adminCreds)}>
            Demo Admin
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
