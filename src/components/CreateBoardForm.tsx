"use client"

import { cn } from "@/lib/utils"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import BackgroundSelector from "./SelectableCards"
import { createBoardSchema } from "@/schemas/CreateBoardSchema"
import useManageBoard from "@/hooks/useManageBoard"
import { useBoard } from "@/hooks/useBoardContext"

type CreateBoardFormProps = React.ComponentProps<"form"> & {
  className?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateBoardForm = ({ className, setOpen }: CreateBoardFormProps) => {
  const { createBoardFormSchema } = useManageBoard()
  const { createBoard } = useBoard()

  const onSubmit = (values: z.infer<typeof createBoardSchema>) => {
    createBoard({ values })
    setOpen(false)
  }

  return (
    <Form {...createBoardFormSchema}>
      <form onSubmit={createBoardFormSchema.handleSubmit(onSubmit)} className={cn("grid items-start gap-4", className)}>
        <FormField
          control={createBoardFormSchema.control}
          name="background"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold mb-3 text-neutral-900 dark:text-neutral-300">Select background</FormLabel>
              <FormControl>
                <BackgroundSelector
                  selectedBackground={field.value}
                  setSelectedBackground={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-2">
          <FormField
            control={createBoardFormSchema.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-neutral-700 dark:text-neutral-300">Board name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Finish</Button>
      </form>
    </Form>
  )
}

export default CreateBoardForm

