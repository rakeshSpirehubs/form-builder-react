import FieldTypeInterface from "@/types/form-builder";
import DraggableFormTypeItem from "./draggable-form-type-item";
import { Card } from "./ui/card";
import { formFieldTypes } from "./form-field-types";

export const FieldPalette = () => {
  return (
    <Card className="w-full md:w-[50%] lg:w-[40%] overflow-x-hidden h-full shadow-none p-3 gap-4 overflow-y-scroll">
      <div>
        <p className="text-lg font-semibold">Choose Form Type</p>
        <p className="text-muted-foreground text-sm">
          Drag any type of form field in right container
        </p>
      </div>

      {/* All form field */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {formFieldTypes.map((item: FieldTypeInterface) => (
          <DraggableFormTypeItem key={item.id} item={item} />
        ))}
      </div>
    </Card>
  );
};
