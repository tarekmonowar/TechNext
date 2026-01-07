"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/src/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/src/components/ui/form";

import { UserAPI } from "@/src/lib/api";
import { ApiError } from "@/src/Types/apiTypes";
import { z } from "zod";
import { registerUserSchema } from "@/src/Types/ZodSchema";
import { useState } from "react";

type RegisterFormData = z.infer<typeof registerUserSchema>;

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      const res = await UserAPI.register(data);

      if (res.success) {
        toast.success("Account created successfully! Please login.");
        const searchParam = window.location.search;
        router.push(`/login${searchParam}`);
      } else {
        toast.error(res.message || "Registration failed");
      }
    } catch (err) {
      const error = err as ApiError;
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Create an account
        </CardTitle>
        <CardDescription className="text-center">
          Join ShortiFy today
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input placeholder="Tarek Monowar" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>
        </Form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </CardContent>

      <div className="my-6 text-center text-xs text-muted-foreground space-y-2">
        <p>
          By registering, you agree to our{" "}
          <a className="text-[#0E2A47] dark:text-[#5276bf] hover:underline font-semibold">
            Terms of Service
          </a>{" "}
          and{" "}
          <a className="text-[#0E2A47] dark:text-[#5276bf] hover:underline font-semibold">
            Privacy Policy
          </a>
        </p>
      </div>
    </Card>
  );
}
