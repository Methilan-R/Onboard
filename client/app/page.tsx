"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl, 
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const schema = z.object({
  fullName: z.string().min(2).max(80).regex(/^[A-Za-z\s'-]+$/, "Invalid name"),
  email: z.string().email(),
  companyName: z.string().min(2).max(100),
  services: z.array(z.string()).min(1, "Select at least one"),
  budgetUsd: z
  .number()
  .int({ message: "Must be an integer" })
  .min(100, { message: "Budget must be at least 100" })
  .max(1000000, { message: "Budget too high" })
  .refine((val) => typeof val === "number" && !isNaN(val), {
    message: "Must be a number",
  }),


  projectStartDate: z.string().refine(
    (date) => {
      const today = new Date();
      return new Date(date) >= new Date(today.setHours(0, 0, 0, 0));
    },
    { message: "Date must be today or later" }
  ),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept terms",
  }),
});

type FormValues = z.infer<typeof schema>;

export default function Home() {
  const [successMsg, setSuccessMsg] = useState("");

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      companyName: "",
      services: [],
      budgetUsd: undefined,
      projectStartDate: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    setSuccessMsg("");
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_ONBOARD_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }); 

      if (!res.ok) throw new Error("Failed to submit");

      setSuccessMsg("Form submitted successfully!");
      form.reset({
        fullName: "",
        email: "",
        companyName: "",
        services: [],
        budgetUsd: undefined,
        projectStartDate: "",
        acceptTerms: false,
      });

      // Hide message after 5 seconds
      setTimeout(() => {
        setSuccessMsg(""); 
      }, 5000);
    } catch (err: unknown) {
  if (err instanceof Error) {
    alert(err.message);
  } else {
    alert(String(err));
  }
}

  };



  return (
    <div className=" mx-auto p-8 flex items-center justify-center min-h-screen bg-gray-800">
      <div className="w-full  max-w-lg border p-8 rounded-md bg-white shadow-2xl">
        <h1 className="text-2xl font-bold mb-4">Client Onboarding</h1>
        {successMsg && <div className="bg-green-100 p-2 mb-4">{successMsg}</div>}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 font-semibold">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 font-semibold">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Company Name */}
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 font-semibold">
                    Company Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your company name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Services */}
            <FormField
              control={form.control}
              name="services"
              render={() => (
                <FormItem>
                  <FormLabel className="text-gray-600 font-semibold">
                    Services
                  </FormLabel>
                  <div className="flex flex-col gap-2">
                    {["UI/UX", "Branding", "Web Dev", "Mobile App"].map(
                      (service) => (
                        <FormField
                          key={service}
                          control={form.control}
                          name="services"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(service)}
                                  onCheckedChange={(checked) =>
                                    checked
                                      ? field.onChange([...field.value, service])
                                      : field.onChange(
                                        field.value?.filter(
                                          (v: string) => v !== service
                                        )
                                      )
                                  }
                                />
                              </FormControl>
                              <FormLabel className="text-gray-600 font-semibold">
                                {service}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      )
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Budget */}
            <FormField
              control={form.control}
              name="budgetUsd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 font-semibold">
                    Budget (USD)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="1000"
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(e.target.value === "" ? "" : +e.target.value)
                      }

                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Project Start Date */}
            <FormField
              control={form.control}
              name="projectStartDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 font-semibold">
                    Project Start Date
                  </FormLabel>
                  <FormControl>
                    <Input type="date" value={field.value ?? ""} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Accept Terms */}
            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value ?? false}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-gray-600 font-semibold">
                    I accept terms
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
