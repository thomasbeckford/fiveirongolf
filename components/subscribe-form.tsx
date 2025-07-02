"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  location: z.string().min(1, "Please select a location"),
});

type FormData = z.infer<typeof formSchema>;

export function SubscribeForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    // Handle form submission here
    alert("Thanks for subscribing! 🏌️‍♂️");
    form.reset();
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-3 max-w-5xl mx-auto">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="First Name"
                      className="bg-accent text-accent-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-primary-foreground/80" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Last Name"
                      className="bg-accent text-accent-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-primary-foreground/80" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-accent text-accent-foreground">
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="nyc-fidi">
                        NYC - Financial District
                      </SelectItem>
                      <SelectItem value="nyc-herald">
                        NYC - Herald Square
                      </SelectItem>
                      <SelectItem value="nyc-ues">
                        NYC - Upper East Side
                      </SelectItem>
                      <SelectItem value="chicago-rn">
                        Chicago - River North
                      </SelectItem>
                      <SelectItem value="chicago-lp">
                        Chicago - Lincoln Park
                      </SelectItem>
                      <SelectItem value="boston">Boston - Back Bay</SelectItem>
                      <SelectItem value="vegas">Las Vegas - AREA15</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      className="bg-accent text-accent-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-primary-foreground/80" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Phone"
                      className="bg-accent text-accent-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-primary-foreground/80" />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-bold uppercase tracking-wider"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "SUBMITTING..." : "SUBMIT"}
            </Button>
          </div>

          {/* Legal Text */}
          <div className="text-xs text-primary-foreground/80 leading-relaxed max-w-4xl mx-auto">
            <p>
              * I consent to receive email communication from Five Iron Golf and
              agree to the terms of their{" "}
              <span className="underline cursor-pointer">privacy policy</span>.
              You can opt out at any time by clicking the unsubscribe link in
              the email footer. By signing up via text, you agree to receive
              recurring automated promotional and personalized marketing text
              messages from Five Iron Golf. Consent is not a condition of any
              purchase. Reply HELP for help and STOP to cancel. Msg frequency
              varies. Msg & data rates may apply.{" "}
              <span className="underline cursor-pointer">SMS Terms</span> and{" "}
              <span className="underline cursor-pointer">Privacy</span>.
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}
