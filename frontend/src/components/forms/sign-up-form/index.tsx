"use client";

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
import { toast } from "@/components/ui/use-toast";
import { SignUpFormSchema, signUpFormSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type Props = {};

export function SignUpForm({}: Props) {
  const form = useForm<SignUpFormSchema>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignUpFormSchema) => {
    const response = await fetch(`/api/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      const error = await response.json();
      return toast({
        title: `Error - ${error.error}`,
        description: error.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex gap-4">
          <FormField
            name="firstName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="First Name"
                    autoComplete="given-name"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="lastName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Last Name"
                    autoComplete="family-name"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Username"
                  autoComplete="username"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-Mail</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="E-Mail"
                  type="email"
                  autoComplete="email"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="phoneNumber"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Phone Number"
                  autoComplete="tel"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Password"
                  type="password"
                  autoComplete="new-password"
                />
              </FormControl>
              {field.value.length > 0 ? (
                <FormMessage>
                  {!field.value.match(/(?=.*[a-z])/) ? (
                    <span>
                      Password must contain at least one lowercase letter.
                    </span>
                  ) : null}

                  {!field.value.match(/(?=.*[A-Z])/) ? (
                    <span>
                      Password must contain at least one uppercase letter.
                    </span>
                  ) : null}

                  {!field.value.match(/(?=.*\d)/) ? (
                    <span>Password must contain at least one number.</span>
                  ) : null}

                  {!field.value.match(/(?=.*[@$!%*?&])/) ? (
                    <span>
                      Password must contain at least one special character.
                    </span>
                  ) : null}

                  {!field.value.match(/^.{8,30}$/) ? (
                    <span>
                      Password must be between 8 and 30 characters long.
                    </span>
                  ) : null}
                </FormMessage>
              ) : null}
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          Sign Up
        </Button>
      </form>
    </Form>
  );
}
