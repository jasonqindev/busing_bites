import { FC } from "react";
import { useDraggable } from "@dnd-kit/core";

interface PropsType {
  id: string;
  children: JSX.Element;
}

const DragBox: FC<PropsType> = (props) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: props.id,
  });

  return (
    <div ref={setNodeRef} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
};

export default DragBox;
