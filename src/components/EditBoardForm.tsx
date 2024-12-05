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

type EditBoardFormProps = {
  name: string
  imageUrl: string
  _id: string
  className?: string
}

const EditBoardForm = ({ name, imageUrl, _id, className }: EditBoardFormProps ) => {
  const { createBoardFormSchema } = useManageBoard({
    name: name,
    background: imageUrl
  })  
  const { editBoard } = useBoard()

  const onSubmit = (values: z.infer<typeof createBoardSchema>) => {
    editBoard({ values: { ...values, _id } })
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
                  selectedBackground={imageUrl}
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

export default EditBoardForm

