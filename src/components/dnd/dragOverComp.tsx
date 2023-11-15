import { FC } from "react";
import { DragOverlay } from "@dnd-kit/core";

interface PropsType {
  children: JSX.Element;
  activeId: number | null;
}

const DragOverComp: FC<PropsType> = ({ children, activeId }) => {
  return (
    <DragOverlay dropAnimation={null}>{activeId ? children : null}</DragOverlay>
  );
};

export default DragOverComp;
