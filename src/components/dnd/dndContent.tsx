import { FC } from "react";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";

interface PropsType {
  children: JSX.Element | JSX.Element[];
  items?: Array<{ id: string; [key: string]: any }>;
  onDragEnd: (sourceId: string, areaId: string) => void;
  onDragStart: (id: string) => void;
}

const DndContent: FC<PropsType> = ({
  children,
  items,
  onDragEnd,
  onDragStart,
}) => {
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    const sourceId = active?.id ? String(active.id) : "";
    const areaId = over?.id ? String(over.id) : "";

    onDragEnd(sourceId, areaId);
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const id = active?.id ? String(active.id) : "";

    onDragStart(id);
  }

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      {children}
    </DndContext>
  );
};

export default DndContent;
