import { useState, useEffect, useRef } from "react";
import invariant from "tiny-invariant";
import { draggable, dropTargetForElements} from "@atlaskit/pragmatic-drag-and-drop/element/adapter"
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { attachClosestEdge, extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import KanbanDropIndicator from "./KanbanDropIndicator";
import { Badge } from "./ui/badge";

interface KanbanCardPropsType {
  children: React.ReactNode,
  id: string,
  priority: 'low' | 'medium' | 'high'
}

const KanbanCard = ({ children, priority, ...card }: KanbanCardPropsType) => {
  const [isDragging, setIsDragging] = useState(false); // create a state for dragging
  const [closestEdge, setClosestEdge] = useState(null) // State to track the closest edge during drag over

  const cardRef = useRef(null); // Create a ref for the card

  useEffect(() => {
    const cardEl = cardRef.current; 
    invariant(cardEl); // Ensure the card element exists

    return combine(
      draggable({
        element: cardEl,
        getInitialData: () => ({ type: "card", cardId: card.id }),
        onDragStart: () => setIsDragging(true),
        onDrop: () => setIsDragging(false),
      }),
      // Add dropTargetForElements to make the card a drop target
      dropTargetForElements({
        element: cardEl,
        getData: ({ input, element }) => {
          // To attach card data to a drop target
          const data = { type: "card", cardId: card.id };

          // Attaches the closest edge (top or bottom) to the data object
          // This data will be used to determine where to drop card relative
          // to the target card.
          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ["top", "bottom"],
          });
        },
        getIsSticky: () => true, // To make a drop target "sticky"
        onDragEnter: (args) => {
          // Update the closest edge when a draggable item enters the drop zone
          if (args.source.data.cardId !== card.id) {
            setClosestEdge(extractClosestEdge(args.self.data));
          }
        },
        onDrag: (args) => {
          // Continuously update the closest edge while dragging over the drop zone
          if (args.source.data.cardId !== card.id) {
            setClosestEdge(extractClosestEdge(args.self.data));
          }
        },
        onDragLeave: () => {
          // Reset the closest edge when the draggable item leaves the drop zone
          setClosestEdge(null);
        },
        onDrop: () => {
          // Reset the closest edge when the draggable item is dropped
          setClosestEdge(null);
        },

      })
    )
    // Update the dependency array
  }, [card.id])

  return (
    // attach a cardRef to the card div
    <div className={`relative flex flex-col gap-4 bg-neutral-100 dark:bg-neutral-950 hover:bg-neutral-200 dark:hover:bg-neutral-900 border border-white dark:border-neutral-700 text-black dark:text-white rounded-xl hover:cursor-grab p-2 transition-all ease-in-out duration-300 font-medium ${isDragging ? "opacity-40" : ""}`} ref={cardRef}>
      {children}
      <Badge variant={priority} className="w-fit">
        {priority}
      </Badge>
      {/* render the DropIndicator if there's a closest edge */}
      {closestEdge && <KanbanDropIndicator edge={closestEdge} gap="8px" />}
    </div>
  );
};

export default KanbanCard;