import * as React from "react";

interface RankingItem {
  id: string;
  value: string;
}

interface DragState {
  index: number;
  item: RankingItem;
  pointerId: number;
  x: number;
  y: number;
  width: number;
  offsetX: number;
  offsetY: number;
}

interface RankingSelectProps {
  items: string[];
  name: string;
  isInvalid: boolean;
  onRankingChange?: (value: string) => void;
}

export const RankingSelect: React.FC<RankingSelectProps> = ({
  items,
  name,
  isInvalid,
  onRankingChange
}) => {
  const [orderedItems, setOrderedItems] = React.useState<RankingItem[]>(() =>
    items.map((value, index) => ({ id: `${index}-${value}`, value }))
  );
  const [dragState, setDragState] = React.useState<DragState | null>(null);
  const [dropIndex, setDropIndex] = React.useState<number | null>(null);
  const dragStateRef = React.useRef<DragState | null>(null);
  const itemRefs = React.useRef<Array<HTMLLIElement | null>>([]);
  const itemsSignature = JSON.stringify(items);

  React.useEffect(() => {
    const nextItems = JSON.parse(itemsSignature) as string[];
    setOrderedItems(nextItems.map((value, index) => ({ id: `${index}-${value}`, value })));
  }, [itemsSignature]);

  React.useEffect(() => {
    if (!dragState) {
      return;
    }

    const previousCursor = document.body.style.cursor;
    document.body.style.cursor = "grabbing";

    return () => {
      document.body.style.cursor = previousCursor;
    };
  }, [dragState]);

  const rankingValue = orderedItems.map((item) => item.value).join(", ");

  const commitOrder = (nextItems: RankingItem[]) => {
    setOrderedItems(nextItems);
    onRankingChange?.(nextItems.map((item) => item.value).join(", "));
  };

  const moveItem = (fromIndex: number, insertionIndex: number) => {
    if (
      fromIndex < 0 ||
      fromIndex >= orderedItems.length ||
      insertionIndex < 0 ||
      insertionIndex > orderedItems.length ||
      fromIndex === insertionIndex ||
      fromIndex + 1 === insertionIndex
    ) {
      return;
    }

    const nextItems = [...orderedItems];
    const [movedItem] = nextItems.splice(fromIndex, 1);
    const adjustedInsertionIndex = fromIndex < insertionIndex ? insertionIndex - 1 : insertionIndex;
    nextItems.splice(adjustedInsertionIndex, 0, movedItem);
    commitOrder(nextItems);
  };

  const getDropIndex = (clientY: number) => {
    const nextDropIndex = itemRefs.current.findIndex((element) => {
      if (!element) {
        return false;
      }

      const { top, height } = element.getBoundingClientRect();
      return clientY < top + height / 2;
    });

    return nextDropIndex === -1 ? orderedItems.length : nextDropIndex;
  };

  const resetDragState = () => {
    dragStateRef.current = null;
    setDragState(null);
    setDropIndex(null);
  };

  const updateDragState = (nextDragState: DragState) => {
    dragStateRef.current = nextDragState;
    setDragState(nextDragState);
  };

  const startDrag = (event: React.PointerEvent<HTMLLIElement>, index: number) => {
    if (event.button > 0) {
      return;
    }

    const { left, top, width } = event.currentTarget.getBoundingClientRect();
    event.currentTarget.focus();
    event.currentTarget.setPointerCapture(event.pointerId);
    updateDragState({
      index,
      item: orderedItems[index],
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      width,
      offsetX: event.clientX - left,
      offsetY: event.clientY - top
    });
    setDropIndex(index);
  };

  const updateDrag = (event: React.PointerEvent<HTMLLIElement>) => {
    const currentDragState = dragStateRef.current;
    if (!currentDragState || event.pointerId !== currentDragState.pointerId) {
      return;
    }

    event.preventDefault();
    updateDragState({
      ...currentDragState,
      x: event.clientX,
      y: event.clientY
    });
    setDropIndex(getDropIndex(event.clientY));
  };

  const finishDrag = (event: React.PointerEvent<HTMLLIElement>) => {
    const currentDragState = dragStateRef.current;
    if (!currentDragState || event.pointerId !== currentDragState.pointerId) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    moveItem(currentDragState.index, getDropIndex(event.clientY));
    resetDragState();
  };

  return (
    <div className={`ranking-select ${isInvalid ? "is-invalid" : ""} ${dragState ? "is-pointer-dragging" : ""}`}>
      <input
        className="show-in-review"
        name={name}
        readOnly
        type="hidden"
        value={rankingValue}
      />
      <ol className="ranking-list">
        {orderedItems.map((item, index) => (
          <li
            className={[
              "ranking-item",
              dragState?.index === index ? "is-dragging" : "",
              dropIndex === index ? "drop-before" : "",
              dropIndex === index + 1 ? "drop-after" : ""
            ].filter(Boolean).join(" ")}
            key={item.id}
            onKeyDown={(event) => {
              if (event.key === "ArrowUp") {
                event.preventDefault();
                moveItem(index, index - 1);
              }
              if (event.key === "ArrowDown") {
                event.preventDefault();
                moveItem(index, index + 2);
              }
            }}
            onPointerCancel={resetDragState}
            onPointerDown={(event) => startDrag(event, index)}
            onPointerMove={updateDrag}
            onPointerUp={finishDrag}
            ref={(element) => {
              itemRefs.current[index] = element;
            }}
            tabIndex={0}
          >
            <span className="ranking-position">{index + 1}</span>
            <span className="ranking-value">{item.value}</span>
            <span className="ranking-handle" aria-hidden="true">::</span>
          </li>
        ))}
      </ol>
      {dragState && (
        <div
          className="ranking-drag-preview"
          style={{
            left: dragState.x - dragState.offsetX * 0.76,
            top: dragState.y - dragState.offsetY * 0.76,
            width: dragState.width * 0.76
          }}
        >
          <span className="ranking-position">{dragState.index + 1}</span>
          <span className="ranking-value">{dragState.item.value}</span>
          <span className="ranking-handle" aria-hidden="true">::</span>
        </div>
      )}
    </div>
  );
};
