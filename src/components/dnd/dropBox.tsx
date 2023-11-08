import { useDroppable } from "@dnd-kit/core";
import { FC } from "react";

interface PropsType {
  id: string;
  children: JSX.Element;
}

const DropBox: FC<PropsType> = (props) => {
  const { setNodeRef } = useDroppable({
    id: props.id,
  });

  return <div ref={setNodeRef}>{props.children}</div>;
};

export default DropBox;
