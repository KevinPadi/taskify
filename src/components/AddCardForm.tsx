"use client";

import { cn } from "@/lib/utils";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import { Label } from "./ui/label";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { addCardSchema } from "@/schemas/AddCardSchema";
import useManageCards from "@/hooks/useManageCards";
import React from "react";
import { useKanban } from "@/hooks/useKanbanContext";
import { useParams } from "react-router-dom";

type AddCardFormTypeProps = {
  className?: React.ComponentProps<"form">,
  columnId: string
}

function AddCardForm({ className, columnId }: AddCardFormTypeProps) {
  const { boardId } = useParams()
  const { createCard } = useKanban()

  const { createCardFormSchema } = useManageCards()

  const onSubmit = (values: z.infer<typeof addCardSchema>) => {
    createCard(values, columnId, boardId)
    console.log(values)
  };

  return (
    <Form {...createCardFormSchema}>
      <form
        onSubmit={createCardFormSchema.handleSubmit(onSubmit)}
        className={cn("grid items-start gap-4", className)}
      >
        <FormField
          control={createCardFormSchema.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="text" placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={createCardFormSchema.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-flow-col items-center justify-between gap-2">
                <Label className="text-black dark:text-white">Select priority:</Label>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue="low"
                  >
                    <SelectTrigger className="w-40 text-black dark:text-white">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Add card</Button>
      </form>
    </Form>
  );
}

export default AddCardForm;
