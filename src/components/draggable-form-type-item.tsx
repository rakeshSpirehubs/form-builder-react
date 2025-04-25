import IFormBuilderField from "@/types/form-builder";
import { useDraggable } from "@dnd-kit/core";
import { Button } from "./ui/button";
import { GripVertical } from "lucide-react";

const DraggableFormTypeItem = ({ item }: { item: IFormBuilderField }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
    data: item,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="bg-gray-200 px-2 py-1 rounded-md flex justify-between items-center gap-2 cursor-move"
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
      }}
    >
      <div className="content flex items-center gap-1">
        {item.icon} <p>{item.label}</p>
      </div>
      <Button variant="ghost" size="icon">
        <GripVertical size={18} />
      </Button>
    </div>
  );
};

export default DraggableFormTypeItem;
