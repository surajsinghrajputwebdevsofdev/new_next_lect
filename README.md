"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { signUpformSchemaStep2 } from "@/lib/schema";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/lib/utils";

type SignUpFormData2 = z.infer<typeof signUpformSchemaStep2>;

export default function SignUp() {
  const [emailVerification, setEmailVerification] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const resolver = !emailVerification
    ? signUpformSchemaStep2
    : signUpformSchemaStep2;

  const form = useForm<SignUpFormData2>({
    resolver: zodResolver(resolver),
    defaultValues: {
      email: "",
      phoneNumber: "",
      address: "",
      password: "",
      labName: "",
      timing: "",
      logo: "",
      openDays: "",
    },
  });

  const router = useRouter();

  function onSubmit(values: SignUpFormData2) {
    setIsLoading(true);
    const email = values.email;

    if (values && email) {
      localStorage.setItem("userEmail", email);

      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "logo" && values[key] instanceof FileList && values[key].length > 0) {
          formData.append(key, values[key][0]);
        } else {
          formData.append(key, values[key]);
        }
      });

      fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data.token) {
            setEmailVerification(true);
            router.push("/auth/otp-input");
          } else {
            alert(data.message || "Registration failed");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error during registration:", error);
          setIsLoading(false);
        });
    }
  }

  return (
    <div className="flex justify-between h-[calc(100vh-83px)] bg-primary dark:bg-secondary">
      <div className="w-[60%] bg-gray-200 border-radius-fancy">
        <div className="w-[50%] flex justify-center flex-col h-full m-auto space-y-2">
          <h1 className="font-semibold text-4xl text-left dark:text-black">
            Experience the <p className="text-primary">power of LabTrack</p>
          </h1>
          <p className="font-semibold text-primary">
            With your 7 day trial, you get
          </p>
          <ul className="list-disc marker:text-primary marker:text-lg ml-[20px] dark:text-black">
            <li>Prefilled sample data tailored for your laboratory</li>
            <li>
              Comprehensive laboratory management platform with 40+ specialized
              tools
            </li>
            <li>
              Templated experiment workflows, analytical reports, and visualized
              data dashboards
            </li>
            <li>
              Guided tours for lab administrators to maximize productivity
            </li>
          </ul>
        </div>
      </div>
      <div className="flex h-full max-h-[calc(100vh-84px)] justify-center w-full items-start p-1">
        <Card className="max-w-md w-auto min-h-[300px] shadow-md p-4 mt-12">
          <CardHeader>
            <CardTitle className="text-center text-3xl text-primary font-signika">
              Try LabTrack for 7 days
            </CardTitle>
            <CardDescription className="text-center text-md text-slate-600 dark:text-white">
              No credit card. No commitments.
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-2">
                <FormField
                  control={form.control}
                  name="labName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Laboratory Name*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter Laboratory Name"
                          className="py-3"
                        />
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
                      <FormLabel>Address*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter address"
                          className="py-3"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter Phone Number"
                          className="py-3"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="timing"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timing*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your timing "
                          className="py-3"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="openDays"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Days*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Available days"
                          className="py-3"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          {...field}
                          placeholder="Upload your logo"
                          className="py-3"
                        />
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
                      <FormLabel>Email*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your email"
                          className="py-3"
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
                      <FormLabel>Password*</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your password"
                          className="py-5"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  loading={isLoading}
                  className="p-3 w-32 ml-auto flex"
                  type="submit"
                  disabled={isLoading}
                  children="Get OTP"
                />
              </CardContent>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
}
