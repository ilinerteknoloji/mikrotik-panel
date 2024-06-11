"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CategoryFormSchema, categoryFormSchema } from "./schema";
import { getCategories, updateCategory } from "./actions";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

type Props = {
  ip: string;
};

type Categories = {
  id: number;
  title: string;
  description: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}[];

export function CategoryForm({ ip }: Props) {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Categories>([]);
  const form = useForm<CategoryFormSchema>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      category: "",
    },
  });

  const onChange = async (values: string) => {
    const response = await updateCategory(ip, values);
    toast({
      title: "Updated",
      description: response,
    });
  };

  useEffect(() => {
    const getCategoriesFromServer = async () => {
      const response = await getCategories();
      if (response.status) {
        setCategories(response.data);
      } else {
        toast({
          title: "Error",
          description: response.message,
        });
      }
    };
    getCategoriesFromServer();
  }, []);

  if (categories.length === 0) {
    return <LoaderCircle className="animate-spin" />;
  }

  return (
    <Form {...form}>
      <form className="w-40">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category, index) => (
                    <SelectItem key={index} value={category.title}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
