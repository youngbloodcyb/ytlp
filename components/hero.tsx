"use client";

import { useState } from "react";
import { Section, Container } from "@/components/craft";
import Placeholder from "@/public/placeholder.jpg";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import Balancer from "react-wrap-balancer";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import * as z from "zod";

// Component Imports
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export default function Hero() {
  const [loading, setLoading] = useState<boolean>(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const response = await fetch("/api/d", {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      toast.error("An error occurred");
    } else {
      toast.success("Success!");
    }
    setLoading(false);
  }

  return (
    <Section className="border-b">
      <Container>
        <div className="flex items-center flex-col text-center">
          <Button
            asChild
            className="w-fit not-prose flex mb-6"
            size="sm"
            variant="outline"
          >
            <Link href="https://9d8.dev">
              Lorem ipsum dolor sit amet <ArrowRight className="ml-2 w-4" />
            </Link>
          </Button>
          <h1 className="!mb-0">
            <Balancer>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Balancer>
          </h1>
          <h3 className="text-muted-foreground">
            <Balancer>
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Balancer>
          </h3>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 text-left"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="sr-only">Email</FormLabel>
                    <FormControl>
                      <Input
                        className="md:w-96"
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit" disabled={loading}>
                Submit
              </Button>
            </form>
          </Form>
          <div className="my-8 h-96 w-full overflow-hidden border rounded-lg md:rounded-xl md:h-[480px]">
            <Image
              className="h-full not-prose w-full object-cover object-bottom"
              src={Placeholder}
              width={1920}
              height={1080}
              alt="hero image"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
