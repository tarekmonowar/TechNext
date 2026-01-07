"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { updateUserZodSchema } from "@/src/Types/ZodSchema";
import { UserAPI } from "@/src/lib/api";
import z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ApiError } from "@/src/Types/apiTypes";

type FormData = z.infer<typeof updateUserZodSchema>;

export default function UserProfile() {
  const [loading, setLoading] = useState(true);

  const form = useForm<FormData>({
    resolver: zodResolver(updateUserZodSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await UserAPI.getProfile();
        if (res.success) {
          form.reset({
            fullName: res.data.fullName || "",
            email: res.data.email || "",
            phone: res.data.phone || "",
            address: res.data.address || "",
            password: "",
            confirmPassword: "",
          });
        }
      } catch (err) {
        const error = err as ApiError;
        toast.error(error?.message || "Failed to fetch profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [form]);

  const onSubmit = async (data: FormData) => {
    try {
      await UserAPI.updateProfile(data);
      toast.success("Profile updated successfully");
      form.reset({ ...data, password: "", confirmPassword: "" });
    } catch (err) {
      const error = err as ApiError;
      toast.error(error?.message || "Something went wrong");
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 border border-accent/50 rounded-sm mt-10 xl:mt-20 xl:px-10 xl:py-10">
      <h1 className="text-2xl font-bold mb-6">Update Profile :</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name :</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
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
                  <FormLabel>Email :</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@example.com"
                      {...field}
                      disabled
                      className="bg-muted/50 cursor-not-allowed"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password :</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password :</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone :</FormLabel>
                  <FormControl>
                    <Input placeholder="+8801234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address :</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Street, City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full mt-4 rounded text-black ">
            Update Profile
          </Button>
        </form>
      </Form>
    </div>
  );
}
