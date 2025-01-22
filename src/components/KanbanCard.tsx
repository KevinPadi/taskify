import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import invariant from "tiny-invariant";
import { draggable, dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { attachClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { Badge } from "./ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Edit, MoreHorizontal, Trash2, X } from "lucide-react";
import { useKanban } from "@/hooks/useKanbanContext";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const schema = z.object({
  title: z.string().min(1, "Task title is required"),
  priority: z.enum(["low", "medium", "high"], {
    errorMap: () => ({ message: "Priority is required" }),
  }),
});

type FormData = z.infer<typeof schema>;

interface KanbanCardPropsType {
  children: React.ReactNode;
  id: string;
  content: string
  priority: "low" | "medium" | "high";
  title?: string;
  board?: string
  column?: string
}

const KanbanCard = ({ children, priority, title, board, column, ...card }: KanbanCardPropsType) => {
  console.log(card)
  const { deleteCard } = useKanban();
  const [isEditing, setIsEditing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef(null);
  const [parent] = useAutoAnimate<HTMLDivElement>();
  const { editCard } = useKanban()

  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: title,
      priority,
    },
  });

  useEffect(() => {
    const cardEl = cardRef.current;
    invariant(cardEl);

    return combine(
      draggable({
        element: cardEl,
        getInitialData: () => ({ type: "card", cardId: card.id }),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      }),
      dropTargetForElements({
        element: cardEl,
        getData: ({ input, element }) => {
          const data = { type: "card", cardId: card.id };
          return attachClosestEdge(data, { input, element, allowedEdges: ["top", "bottom"] });
        },
        getIsSticky: () => true,
      })
    );
  }, [card.id]);

  const onSubmit = (data: FormData) => {
    editCard({...data, board, column, id: card.id}, data)
    setIsEditing(false)
    reset(data); // Update form state
  };

  return (
    <article
      className={`group relative flex flex-col gap-4 bg-neutral-100 dark:bg-neutral-950 hover:bg-neutral-200 dark:hover:bg-neutral-900 border border-white dark:border-neutral-700 text-black dark:text-white rounded-xl hover:cursor-grab p-2 transition-all ease-in-out duration-300 font-medium ${isDragging ? "opacity-40" : ""}`}
      ref={cardRef}
    >
      <div ref={parent} className="flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div>
            {isEditing ? (
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    defaultValue={card.content}
                    className="text-base bg-transparent focus:bg-neutral-200 hover:bg-neutral-300 dark:focus:bg-neutral-900/80 hover:dark:bg-neutral-800 dark:bg-transparent border-none p-0 m-0 top-0 h-fit select-all rounded-sm"
                    autoFocus
                  />
                )}
              />
            ) : (
              <h1>{children}</h1>
            )}
          </div>
          {!isEditing ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="size-7 flex items-center invisible group-hover:visible data-[state=open]:visible"
                >
                  <MoreHorizontal className="stroke-neutral-800 dark:stroke-neutral-200" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-lg">
                <DropdownMenuItem onClick={() => setIsEditing(true)}>
                  <Edit className="text-neutral-500 dark:text-neutral-400" />
                  <span>Edit Task</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => deleteCard({id: card.id, board, column})}>
                  <Trash2 className="text-neutral-500 dark:text-neutral-400" />
                  <span>Delete Task</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => setIsEditing(false)}
              variant={"ghost"}
              size={"icon"}
              className={`size-7 flex items-center invisible group-hover:visible ${isEditing && "visible"}`}
            >
              <X className="stroke-neutral-800 dark:stroke-neutral-200" />
              <span className="sr-only">Cancel edition</span>
            </Button>
          )}
        </div>
        {isEditing ? (
          <form className="flex items-start justify-between w-full gap-2" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="inline-flex items-center rounded-full border border-neutral-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none dark:border-neutral-800 dark:focus:ring-neutral-300 w-fit h-fit">
                    <SelectValue placeholder={priority} />
                  </SelectTrigger>
                  <SelectContent className="p-0 rounded-xl min-w-fit">
                    <SelectItem className="text-xs w-full rounded-lg" value="high">
                      High
                    </SelectItem>
                    <SelectItem className="text-xs w-full rounded-lg" value="medium">
                      Medium
                    </SelectItem>
                    <SelectItem className="text-xs w-full rounded-lg" value="low">
                      Low
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            <Button size={"sm"} type="submit" className="text-xs size-fit py-1 px-2">
              Save changes
            </Button>
          </form>
        ) : (
          <Badge variant={priority} className="w-fit">
            {priority}
          </Badge>
        )}
      </div>
    </article>
  );
};

export default KanbanCard;
