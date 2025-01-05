import KanbanColumn from "./KanbanColumn"
import { useEffect, useState, useCallback } from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { getReorderDestinationIndex } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index"
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder"
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge"
import { Card, Column } from "@/context/KanbanContext";
import { useKanban } from "@/hooks/useKanbanContext";

// const BOARD_COLUMNS = {
//   backlog: {
//     columnId: "backlog",
//     title: "Backlog",
//     cards: [],
//   },
//   todo: {
//     columnId: "todo",
//     title: "To do",
//     cards: [
//       { id: 1, content: "Task 1" },
//       { id: 2, content: "Task 2" },
//       { id: 5, content: "Task 5" },
//       { id: 6, content: "Task 6" },
//     ],
//   },
//   "in-progress": {
//     columnId: "in-progress",
//     title: "In progress",
//     cards: [
//       { id: 3, content: "Task 3" },
//       { id: 7, content: "Task 7" },
//       { id: 8, content: "Task 8" },
//     ],
//   },
//   done: {
//     columnId: "done",
//     title: "Done",
//     cards: [
//       { id: 4, content: "Task 4" },
//       { id: 9, content: "Task 9" },
//       { id: 10, content: "Task 10" },
//     ],
//   },
// }

const KanbanBoard: React.FC = () => {
  const { cardsData, columnData, editCard } = useKanban()
  const [columnsData, setColumnsData] = useState<Record<string, { columnId: string; title: string; cards: { id: string; content: string; priority: 'low' | 'medium' | 'high' }[] }>>({})

  useEffect(() => {
    const BOARD_COLUMNS = columnData?.reduce<Record<string, { columnId: string; title: string; cards: { id: string; content: string; priority: 'low' | 'medium' | 'high' }[] }>>((acc, column) => {
      const columnId = column._id
      acc[columnId] = {
        columnId,
        title: column.name,
        cards: cardsData?.filter(card => card.list === column._id).map(card => ({
          id: card._id,
          content: card.title,
          column: card.list,
          board: card.board,
          priority: card.priority
        }))
      };
      return acc;
    }, {})
    setColumnsData(BOARD_COLUMNS)
    console.log('board columns:', BOARD_COLUMNS)
  }, [columnData, cardsData])
  
  // reorder cards in columns
  const reorderCard = useCallback(
    ({ columnId, startIndex, finishIndex }) => {
      // Get the source column data
      const sourceColumnData = columnsData[columnId];

      // Call the reorder function to get a new array
      // of cards with the moved card's new position
      const updatedItems = reorder({
        list: sourceColumnData.cards,
        startIndex,
        finishIndex,
      });

      // Create a new object for the source column 
      // with the updated list of cards
      const updatedSourceColumn = {
        ...sourceColumnData,
        cards: updatedItems,
      };

      // Update columns state
      setColumnsData({
        ...columnsData,
        [columnId]: updatedSourceColumn,
      });
    },
    [columnsData]
  );

  // moving cards between columns
  const moveCard = useCallback(
    ({
      movedCardIndexInSourceColumn,
      sourceColumnId,
      destinationColumnId,
      movedCardIndexInDestinationColumn,
    }) => {
      // Get data of the source column
      const sourceColumnData = columnsData[sourceColumnId];
  
      // Get data of the destination column
      const destinationColumnData = columnsData[destinationColumnId];
  
      // Identify the card to move
      const cardToMove = sourceColumnData.cards[movedCardIndexInSourceColumn];
  
      // Remove the moved card from the source column
      const newSourceColumnData = {
        ...sourceColumnData,
        cards: sourceColumnData.cards.filter(
          (card) => card.id !== cardToMove.id
        ),
      };
  
      // Create a copy of the destination column's cards array
      const newDestinationCards = Array.from(destinationColumnData.cards);
  
      // Determine the new index in the destination column
      const newIndexInDestination = movedCardIndexInDestinationColumn ?? 0;
  
      // Insert the moved card into the new index in the destination column
      newDestinationCards.splice(newIndexInDestination, 0, cardToMove);
  
      // Create new destination column data with the moved card
      const newFinishColumnData = {
        ...destinationColumnData,
        cards: newDestinationCards,
      };

      editCard(cardToMove, { list: destinationColumnId })
  
      // Update the state with the new columns data
      setColumnsData({
        ...columnsData,
        [sourceColumnId]: newSourceColumnData,
        [destinationColumnId]: newFinishColumnData,
      });
    },
    [columnsData]
  );

  // Function to handle drop events
  const handleDrop = useCallback(({ source, location }) => {
    // Early return if there are no drop targets in the current location
    const destination = location.current.dropTargets.length;
    if (!destination) {
      return;
    }
    // Check if the source of the drag is a card to handle card-specific logic
    if (source.data.type === "card") {
      // Retrieve the ID of the card being dragged
      const draggedCardId = source.data.cardId;
  
      // Get the source column from the initial drop targets
      const [, sourceColumnRecord] = location.initial.dropTargets;
  
      // Retrieve the ID of the source column
      const sourceColumnId = sourceColumnRecord.data.columnId;
  
      // Get the data of the source column
      const sourceColumnData = columnsData[sourceColumnId];
  
      // Get the index of the card being dragged in the source column
      const draggedCardIndex = sourceColumnData.cards.findIndex(
        (card) => card.id === draggedCardId
      );
  
      if (location.current.dropTargets.length === 1) {
        // console.log(
        //   "dropTargets1",
        //   location.current.dropTargets,
        //   location.current.dropTargets.length
        // );
      }
  
      // Check if the current location has exactly two drop targets
      if (location.current.dropTargets.length === 2) {
        // Destructure and extract the destination card and column data from the drop targets
        const [destinationCardRecord, destinationColumnRecord] =
          location.current.dropTargets;

        // Extract the destination column ID from the destination column data
        const destinationColumnId = destinationColumnRecord.data.columnId;

        // Retrieve the destination column data using the destination column ID
        const destinationColumn = columnsData[destinationColumnId];

        // Find the index of the target card within the destination column's cards
        const indexOfTarget = destinationColumn.cards.findIndex(
          (card) => card.id === destinationCardRecord.data.cardId
        );

        // Determine the closest edge of the target card: top or bottom
        const closestEdgeOfTarget = extractClosestEdge(
          destinationCardRecord.data
        );

        // Check if the source and destination columns are the same
        if (sourceColumnId === destinationColumnId) {
          // Calculate the destination index for the card to be reordered within the same column
          const destinationIndex = getReorderDestinationIndex({
            startIndex: draggedCardIndex,
            indexOfTarget,
            closestEdgeOfTarget,
            axis: "vertical",
          });

          // Perform the card reordering within the same column
          reorderCard({
            columnId: sourceColumnId,
            startIndex: draggedCardIndex,
            finishIndex: destinationIndex,
          });

          return;
        }

        // Check if the source and destination columns are the same
        if (sourceColumnId === destinationColumnId) {
          // rest of the code
        }
        // Determine the new index for the moved card in the destination column.
        const destinationIndex =
          closestEdgeOfTarget === "bottom"
            ? indexOfTarget + 1
            : indexOfTarget;

        moveCard({
          movedCardIndexInSourceColumn: draggedCardIndex,
          sourceColumnId,
          destinationColumnId,
          movedCardIndexInDestinationColumn: destinationIndex,
        });
      }

      if (location.current.dropTargets.length === 1) {
        // Get the destination column from the current drop targets
        const [destinationColumnRecord] = location.current.dropTargets;

        // Retrieve the ID of the destination column
        const destinationColumnId = destinationColumnRecord.data.columnId;

        // check if the source and destination columns are the same
        if (sourceColumnId === destinationColumnId) {
          // Calculate the destination index for the dragged card within the same column
          const destinationIndex = getReorderDestinationIndex({
            startIndex: draggedCardIndex,
            indexOfTarget: sourceColumnData.cards.length - 1,
            closestEdgeOfTarget: null,
            axis: "vertical",
          });

          // will implement this function
          reorderCard({
            columnId: sourceColumnData.columnId,
            startIndex: draggedCardIndex,
            finishIndex: destinationIndex,
          });
          return;
        }
        moveCard({
          movedCardIndexInSourceColumn: draggedCardIndex,
          sourceColumnId,
          destinationColumnId,
        });
        return;
      }
      
    }
  },[columnsData, moveCard, reorderCard])

  // setup the monitor
  useEffect(() => {
    return monitorForElements({
      onDrop: handleDrop,
    });
  }, [handleDrop]);

  useEffect(() => {
    console.log("Columns data updated:", columnsData);
  }, [columnsData]);
  
  return (
    <div className="board flex justify-around gap-5 size-full overflow-auto z-10">
      {Object.keys(columnsData).map((columnId) => (
        <KanbanColumn key={columnId} {...columnsData[columnId]} />
      ))}
    </div>
  );
};

export default KanbanBoard