import KanbanCard from "./KanbanCard";
import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import AddCardDialogDrawer from "./AddCardDialogDrawer";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface KanbanColumnTypes {
  columnId: string,
  title: string,
  cards: Array<{
    id: string,
    content: string,
    priority: 'low' | 'medium' | 'high'
    board: string
  }>
}

const KanbanColumn = ({ columnId, title, cards }: KanbanColumnTypes) => {
  const columnRef = useRef(null); // Create a ref for the column
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  // Initialize AutoAnimate
  const [parentRef] = useAutoAnimate();

  useEffect(() => {
    const columnEl = columnRef.current;
    invariant(columnEl); // Ensure the column element exists
    
    // Set up the drop target for the column element
    return dropTargetForElements({
      element: columnEl,
      onDragStart: () => setIsDraggedOver(true),
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
      getData: () => ({ columnId }),
      getIsSticky: () => true,
    });
  }, [columnId]);

  return (
    <div
      className={`column w-60 rounded-t-md p-2 space-y-2 transition-all ease-in-out duration-300 ${
        isDraggedOver ? "bg-neutral-300/50 dark:bg-neutral-800/50" : ""
      }`}
      ref={columnRef} // attach a columnRef to the column div
      style={{ height: "calc(100vh - 100px)", overflowY: "auto" }} // Set fixed height and enable vertical scroll
    >
      <div className="flex justify-between items-center">
        <h2 className="text-black dark:text-white font-medium text-2xl pb-2">
          {title}
        </h2>
        <AddCardDialogDrawer column={title} columnId={columnId} />
      </div>
      {/* Attach AutoAnimate ref here */}
      <div ref={parentRef} className="space-y-2">
        {cards &&
          cards
            .sort((a, b) => {
              const priorityOrder = { high: 3, medium: 2, low: 1 };
              return priorityOrder[b.priority] - priorityOrder[a.priority];
            })
            .map((card) => (
              <KanbanCard key={card.id} {...card}>
                {card.content}
              </KanbanCard>
            ))}
      </div>
    </div>

  );
}
export default KanbanColumn;
