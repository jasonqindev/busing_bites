import { DragOverlay } from "@dnd-kit/core";
import { FC } from "react";

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
