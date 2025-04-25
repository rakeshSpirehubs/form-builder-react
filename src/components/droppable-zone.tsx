import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";

export const DroppableZone = ({ children }: { children: React.ReactNode }) => {
  const { setNodeRef, isOver } = useDroppable({ id: "dropzone" });
  return (
    <div
      ref={setNodeRef}
      className={cn(
        "min-h-[200px] rounded-md space-y-2 border p-2",
        isOver ? "border-blue-400 bg-blue-50" : "border-gray-400"
      )}
    >
      {children}
    </div>
  );
};